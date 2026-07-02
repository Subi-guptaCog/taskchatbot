import { Task, TaskPriority, TaskStatus } from "../types";

// IndexedDB configuration to store the directory handles across sessions
const DB_NAME = "desktop-sync-db-v1";
const STORE_NAME = "handles";

export function saveDirectoryHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const putReq = store.put(handle, "folder_handle");
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    };
    request.onerror = () => reject(request.error);
  });
}

export function getDirectoryHandle(): Promise<FileSystemDirectoryHandle | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get("folder_handle");
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => reject(getReq.error);
    };
    request.onerror = () => resolve(null);
  });
}

export function clearDirectoryHandle(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const deleteReq = store.delete("folder_handle");
      deleteReq.onsuccess = () => resolve();
      deleteReq.onerror = () => reject(deleteReq.error);
    };
    request.onerror = () => reject(request.error);
  });
}

// Converts standard Task models database into single unified cell-wrapped .csv payload stream
export function convertTasksToCsv(tasks: Task[]): string {
  const headers = ["ID", "Title", "Description", "Priority", "Status", "Category", "DueDate", "CreatedAt"];
  const rows = tasks.map((task) => {
    return [
      task.id,
      task.title,
      task.description || "",
      task.priority,
      task.status,
      task.category || "",
      task.dueDate || "",
      task.createdAt || ""
    ].map((val) => {
      // Escape inner quotes by doubling them, wrap complete cell value with enclosing quotes to preserve commas
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(",");
  });
  return [headers.join(","), ...rows].join("\n");
}

// Highly reliable RFC-compliant CSV cellular stream parser supporting quote wrappers
export function parseCsvToTasks(csvText: string): Task[] {
  if (!csvText.trim()) return [];
  const lines: string[] = [];
  
  // Safe multi-line aware split which respects quotes containing actual carriage returns
  let currentLine = "";
  let inQuotes = false;
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  // Parse columns line parser with quotes escaping logic
  const parseCsvLine = (line: string): string[] => {
    const fields: string[] = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        // Look ahead for double quotes as nested escape representation
        if (inQuotes && line[i + 1] === '"') {
          field += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(field.trim());
        field = "";
      } else {
        field += char;
      }
    }
    fields.push(field.trim());
    return fields;
  };

  const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
  
  // Column schema resolution
  const idIndex = headers.indexOf("id");
  const titleIndex = headers.findIndex(h => h === "title" || h === "task" || h === "name" || h === "workitem");
  const descIndex = headers.findIndex(h => h === "description" || h === "desc" || h === "details" || h === "summary");
  const priorityIndex = headers.findIndex(h => h === "priority" || h === "lvl" || h === "rank");
  const statusIndex = headers.findIndex(h => h === "status" || h === "state" || h === "progress");
  const categoryIndex = headers.findIndex(h => h === "category" || h === "tag" || h === "type" || h === "project");
  const dueDateIndex = headers.findIndex(h => h === "duedate" || h === "due" || h === "date");
  const createdAtIndex = headers.findIndex(h => h === "createdat" || h === "created");

  const tasks: Task[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length === 0 || (values.length === 1 && !values[0])) continue;

    const title = titleIndex !== -1 && values[titleIndex] ? values[titleIndex] : "";
    if (!title) continue; // title is crucial 

    const rawId = idIndex !== -1 && values[idIndex] ? values[idIndex].trim() : "";
    const cleanId = rawId
      .replace(/^task-csv-/, "")
      .replace(/^task_csv_/, "")
      .replace(/^csv-/, "")
      .replace(/^csv_/, "")
      .replace(/^task-/, "")
      .replace(/^task_/, "")
      .trim();
    const id = cleanId 
      ? `task-${cleanId}` 
      : `task-${Date.now()}-${i}`;
    const description = descIndex !== -1 && values[descIndex] ? values[descIndex] : "Imported bulk task item.";
    
    let priorityStr = priorityIndex !== -1 && values[priorityIndex] ? values[priorityIndex] : "Medium";
    let priority: TaskPriority = TaskPriority.MEDIUM;
    const lowP = priorityStr.toLowerCase();
    if (lowP === "high" || lowP === "h") priority = TaskPriority.HIGH;
    if (lowP === "low" || lowP === "l") priority = TaskPriority.LOW;

    let statusStr = statusIndex !== -1 && values[statusIndex] ? values[statusIndex] : "New";
    let status: TaskStatus = TaskStatus.NEW;
    const lowS = statusStr.toLowerCase().replace(/\s+/g, "");
    if (lowS === "inprogress" || lowS === "progress" || lowS === "active") status = TaskStatus.IN_PROGRESS;
    if (lowS === "codecompleted") status = TaskStatus.CODE_COMPLETED;
    if (lowS === "waitingforqa" || lowS === "qa") status = TaskStatus.WAITING_FOR_QA;
    if (lowS === "ready") status = TaskStatus.READY;
    if (lowS === "done" || lowS === "completed" || lowS === "finish") status = TaskStatus.DONE;

    const category = categoryIndex !== -1 && values[categoryIndex] ? values[categoryIndex] : "Desktop Sync";
    const dueDate = dueDateIndex !== -1 && values[dueDateIndex] ? values[dueDateIndex] : undefined;
    const createdAt = createdAtIndex !== -1 && values[createdAtIndex] ? values[createdAtIndex] : new Date().toISOString();

    tasks.push({
      id,
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      createdAt
    });
  }

  return tasks;
}

// Writes all memory tasks to `tasks.csv` inside their physical local directory
export async function writeTasksToFolder(handle: FileSystemDirectoryHandle, tasks: Task[]): Promise<void> {
  let targetFolder = handle;
  try {
    // Check if folder exists or create it
    targetFolder = await handle.getDirectoryHandle("DesktopTasksWorkspace", { create: true });
  } catch (err: any) {
    console.warn("Could not get or create 'DesktopTasksWorkspace' subdirectory. Saving directly to root.", err);
  }

  const fileHandle = await targetFolder.getFileHandle("tasks.csv", { create: true });
  const writable = await fileHandle.createWritable();
  const csvContent = convertTasksToCsv(tasks);
  await writable.write(csvContent);
  await writable.close();
}

// Reads standard workspace spreadsheet database flatfile from chosen physical folder
export async function readTasksFromFolder(handle: FileSystemDirectoryHandle): Promise<Task[] | null> {
  let targetFolder = handle;
  try {
    // Attempt to open direct subfolder
    targetFolder = await handle.getDirectoryHandle("DesktopTasksWorkspace", { create: false });
  } catch (err: any) {
    // Fall back to checking root directory first
    try {
      const fileHandle = await handle.getFileHandle("tasks.csv", { create: false });
      const file = await fileHandle.getFile();
      const text = await file.text();
      return parseCsvToTasks(text);
    } catch {
      return null;
    }
  }

  try {
    const fileHandle = await targetFolder.getFileHandle("tasks.csv", { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseCsvToTasks(text);
  } catch (err: any) {
    // If file does not exist, return null so we can seed it with default elements instead
    return null;
  }
}
