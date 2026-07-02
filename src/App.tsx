import React, { useState, useEffect, useRef } from "react";
import { Task, TaskPriority, TaskStatus, ChatMessage, ChatAction, UserProfile } from "./types";
import { INITIAL_TASKS } from "./initial_tasks";
import ChatPanel from "./components/ChatPanel";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import AuthScreen from "./components/AuthScreen";
import DesktopSyncPanel from "./components/DesktopSyncPanel";
import { Sparkles, Terminal, Shield, RefreshCw, Layers, Plus, Search, Filter, Trash, Play, RefreshCcw, LogOut, Upload, FileSpreadsheet, ChevronDown, ChevronUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-msg",
    sender: "assistant",
    text: "Hello! I'm AICHATBOTOLI. I am ready to help you manage your work items today. How can I help you?",
    timestamp: new Date().toISOString()
  }
];

const INITIAL_LOGS = [
  `[${new Date().toLocaleTimeString()}] info: Microsoft.Hosting.Lifetime[0] Application started. Press Ctrl+C to shut down.`,
  `[${new Date().toLocaleTimeString()}] info: Microsoft.Hosting.Lifetime[0] Hosting environment: Production`,
  `[${new Date().toLocaleTimeString()}] info: Microsoft.Hosting.Lifetime[0] Content root path: /app/workspace`,
  `$ docker build -t aichatbotoli .`,
  `Step 1/11 : FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build ... DONE`,
  `Step 2/11 : WORKDIR /src ... OK`,
  `Step 11/11 : ENTRYPOINT ["dotnet", "aichatbotoli.dll"] ... EXPOSED (PORT 3000)`,
  `$ [SYSTEM] Querying local SQLite database... OK`,
  `> AICHATBOTOLI is up and listening for dynamic instructions.`
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("high_density_tasks");
    if (saved) {
      try {
        const parsedRaw = JSON.parse(saved) as Task[];
        const parsed = parsedRaw.map(t => {
          let newId = t.id;
          if (t.id.startsWith("task-csv-")) {
            newId = t.id.replace(/^task-csv-/, "task-");
          }
          return { ...t, id: newId };
        });

        // Deduplicate in case any IDs overlapped
        const uniqueTasksMap = new Map<string, Task>();
        parsed.forEach(t => {
          uniqueTasksMap.set(t.id, t);
        });
        const cleanedParsed = Array.from(uniqueTasksMap.values());

        const existingIds = new Set(cleanedParsed.map(t => t.id));
        const missingTasks = INITIAL_TASKS.filter(t => !existingIds.has(t.id));
        if (missingTasks.length > 0) {
          return [...cleanedParsed, ...missingTasks];
        }
        return cleanedParsed;
      } catch (e) {
        console.error("Failed to parse saved tasks, falling back to initial seed:", e);
      }
    }
    return INITIAL_TASKS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("high_density_messages");
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [terminalLogs, setTerminalLogs] = useState<string[]>(INITIAL_LOGS);
  const [activeSidebar, setActiveSidebar] = useState<"chat" | "tasks" | "settings" | "docker">("chat");
  const [isPending, setIsPending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data.hasApiKey) {
          setApiError("GEMINI_API_KEY is not configured or is a placeholder. Please open the Settings menu in Google AI Studio, locate the workspace secrets configuration, and enter a valid Gemini API Key starting with 'AIzaSy' to unlock online AI planning and automated task scheduling.");
        }
      })
      .catch((err) => {
        console.error("Health check failed on initialization:", err);
      });
  }, []);

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("high_density_user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("high_density_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("high_density_user");
    }
  }, [user]);
  
  // Tasks filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  // CSV Bulk Import states
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [csvMode, setCsvMode] = useState<"upload" | "paste">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [csvPasteText, setCsvPasteText] = useState("");
  const [csvMessage, setCsvMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // CSV File reader triggering
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processCsvContent(text);
    };
    reader.onerror = () => {
      setCsvMessage({ text: "Failed to read CSV. Access denied or corrupted file.", type: "error" });
    };
    reader.readAsText(file);
  };

  // Safe client-side CSV processor parser supporting cell quote wrapping
  const processCsvContent = (rawText: string, fileName?: string) => {
    if (!rawText.trim()) {
      setCsvMessage({ text: "CSV payload content is fully empty.", type: "error" });
      return;
    }

    try {
      const lines = rawText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
      if (lines.length < 2) {
        setCsvMessage({ text: "Spreadsheet must contain a header row and at least one task row.", type: "error" });
        return;
      }

      // Detect delimiter: count commas vs semicolons vs tabs in the header row
      let delimiter = ",";
      const commaCount = (lines[0].match(/,/g) || []).length;
      const semiCount = (lines[0].match(/;/g) || []).length;
      const tabCount = (lines[0].match(/\t/g) || []).length;
      if (semiCount > commaCount && semiCount > tabCount) {
        delimiter = ";";
      } else if (tabCount > commaCount && tabCount > semiCount) {
        delimiter = "\t";
      }

      const parseCsvLine = (line: string, delim: string = ",") => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' || char === "'") {
            inQuotes = !inQuotes;
          } else if (char === delim && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const headers = parseCsvLine(lines[0], delimiter).map(h => h.trim());
      
      const cleanHeader = (h: string) => {
        return h.replace(/^\ufeff/, "").replace(/[\s_-]/g, "").toLowerCase();
      };

      const titleIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "title" || c === "task" || c === "name" || c === "workitem" || c === "subject" || c === "workitemtitle";
      });
      const descIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "description" || c === "desc" || c === "details" || c === "summary";
      });
      const priorityIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "priority" || c === "lvl" || c === "rank" || c === "severity" || c === "importance";
      });
      const statusIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "status" || c === "state" || c === "progress" || c === "stage";
      });
      const categoryIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "category" || c === "project";
      });
      const dueDateIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "duedate" || c === "due" || c === "date" || c === "targetdate";
      });

      // Custom agile tracking headers
      const idIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "id" || c === "taskid" || c === "itemid" || c === "workitemid" || c === "key";
      });
      const workTypeIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "workitemtype" || c === "type" || c === "kind";
      });
      const assignedToIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "assignedto" || c === "assignee" || c === "owner";
      });
      const tagsIndex = headers.findIndex(h => {
        const c = cleanHeader(h);
        return c === "tags" || c === "tag" || c === "labels" || c === "label";
      });

      const parsedTasks: Task[] = [];
      let skippedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i], delimiter);
        if (values.length === 0 || (values.length === 1 && !values[0])) continue;

        let idVal = "";
        if (idIndex !== -1 && values[idIndex]) {
          const rawId = values[idIndex].replace(/^["']|["']$/g, "").trim();
          idVal = rawId
            .replace(/^task-csv-/, "")
            .replace(/^task_csv_/, "")
            .replace(/^csv-/, "")
            .replace(/^csv_/, "")
            .replace(/^task-/, "")
            .replace(/^task_/, "")
            .trim();
        }

        let workTypeVal = "";
        if (workTypeIndex !== -1 && values[workTypeIndex]) {
          workTypeVal = values[workTypeIndex].replace(/^["']|["']$/g, "").trim();
        }

        let assignedToVal = "";
        if (assignedToIndex !== -1 && values[assignedToIndex]) {
          assignedToVal = values[assignedToIndex].replace(/^["']|["']$/g, "").trim();
        }

        let tagsVal = "";
        if (tagsIndex !== -1 && values[tagsIndex]) {
          tagsVal = values[tagsIndex].replace(/^["']|["']$/g, "").trim();
        }

        let title = "";
        if (titleIndex !== -1 && values[titleIndex]) {
          title = values[titleIndex];
        } else if (values[0]) {
          title = values[0];
        } else {
          skippedCount++;
          continue;
        }

        title = title.replace(/^["']|["']$/g, "").trim();
        if (!title) {
          skippedCount++;
          continue;
        }

        // Prepend ID tag to title if it exists to match standard tracking layouts
        if (idVal && !title.startsWith("#") && !title.includes(idVal)) {
          title = `#${idVal}: ${title}`;
        }

        let descriptionParts: string[] = [];
        if (workTypeVal) descriptionParts.push(`Work Item Type: ${workTypeVal}`);
        if (assignedToVal) descriptionParts.push(`Assigned to: ${assignedToVal}`);
        if (tagsVal) descriptionParts.push(`Tags: ${tagsVal}`);

        let descVal = "Imported bulk task item.";
        if (descIndex !== -1 && values[descIndex]) {
          descVal = values[descIndex].replace(/^["']|["']$/g, "").trim();
        }
        if (descVal) {
          descriptionParts.push(descVal);
        }

        const description = descriptionParts.join(". ");

        let priorityStr = "Medium";
        if (priorityIndex !== -1 && values[priorityIndex]) {
          priorityStr = values[priorityIndex].replace(/^["']|["']$/g, "").trim();
        }
        
        let priority: TaskPriority = TaskPriority.MEDIUM;
        const lowP = priorityStr.toLowerCase();
        if (lowP === "high" || lowP === "h") priority = TaskPriority.HIGH;
        if (lowP === "low" || lowP === "l") priority = TaskPriority.LOW;

        let statusStr = "New";
        if (statusIndex !== -1 && values[statusIndex]) {
          statusStr = values[statusIndex].replace(/^["']|["']$/g, "").trim();
        }
        
        let status: TaskStatus = TaskStatus.NEW;
        const lowS = statusStr.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (lowS === "inprogress" || lowS === "progress" || lowS === "active") {
          status = TaskStatus.IN_PROGRESS;
        } else if (lowS === "pendingbusiness" || lowS === "business") {
          status = TaskStatus.PENDING_BUSINESS;
        } else if (lowS === "pendingdev" || lowS === "dev" || lowS === "codecompleted") {
          status = TaskStatus.PENDING_DEV;
        } else if (lowS === "waitingforqa" || lowS === "qa") {
          status = TaskStatus.WAITING_FOR_QA;
        } else if (lowS === "ready") {
          status = TaskStatus.READY;
        } else if (lowS === "done" || lowS === "completed" || lowS === "finish") {
          status = TaskStatus.DONE;
        } else if (lowS === "duplicate") {
          status = TaskStatus.DUPLICATE;
        } else if (lowS === "new") {
          status = TaskStatus.NEW;
        }

        let category = "CSV Import";
        if (categoryIndex !== -1 && values[categoryIndex]) {
          category = values[categoryIndex].replace(/^["']|["']$/g, "").trim();
        } else if (workTypeVal) {
          category = workTypeVal;
        } else if (tagsVal) {
          category = tagsVal.split(/[,;\s]+/)[0].trim() || "CSV Import";
        }

        let dueDate = undefined;
        if (dueDateIndex !== -1 && values[dueDateIndex]) {
          const rawDue = values[dueDateIndex].replace(/^["']|["']$/g, "").trim();
          dueDate = rawDue || undefined;
        }

        const finalId = idVal 
          ? `task-${idVal}` 
          : `task-${Date.now()}-${i}`;

        parsedTasks.push({
          id: finalId,
          title,
          description,
          status,
          priority,
          category,
          dueDate,
          createdAt: new Date().toISOString()
        });
      }

      if (parsedTasks.length === 0) {
        setCsvMessage({ text: "Parsed records are empty or columns are unsupported.", type: "error" });
        return;
      }

      setTasks((prev) => [...parsedTasks, ...prev]);
      addLog(`[CSV IMPORT] Successfully ingested ${parsedTasks.length} tasks from spreadsheet stream. Skipped: ${skippedCount}.`);
      setCsvMessage({ 
        text: `Successfully imported ${parsedTasks.length} tasks!`, 
        type: "success" 
      });
      setCsvPasteText("");

      // Direct file server-side replication
      const safeName = fileName || "tasks.csv";
      fetch("/api/upload-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent: rawText, fileName: safeName })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          addLog(`[SERVER SYNC] CSV file replication succeeded: ${data.message}`);
        } else {
          addLog(`[SERVER SYNC] Warning during file upload: ${data.error}`);
        }
      })
      .catch(err => {
        addLog(`[SERVER SYNC] Server-side folder write fallback error: ${err.message || err}`);
      });

    } catch (err: any) {
      setCsvMessage({ text: `Failed parsing CSV matrix schema: ${err.message || err}`, type: "error" });
    }
  };

  // Form Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("high_density_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("high_density_messages", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll console terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const addLog = (line: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [...prev, `[${timestamp}] ${line}`]);
  };

  // Chat message submission
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    addLog(`$ task-chatbot query --prompt "${text}"`);
    setIsPending(true);

    try {
      // Prune history and tasks to keep payload tight and avoid 413 Payload Too Large errors
      const prunedHistory = updatedMessages.slice(-8).map(m => ({
        sender: m.sender,
        text: m.text ? (m.text.length > 1000 ? m.text.substring(0, 1000) + "..." : m.text) : ""
      }));

      const prunedTasks = tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description ? (t.description.length > 200 ? t.description.substring(0, 200) + "..." : t.description) : "",
        status: t.status,
        priority: t.priority,
        category: t.category,
        dueDate: t.dueDate
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: prunedHistory,
          currentTasks: prunedTasks
        })
      });

      if (!response.ok) {
        let errMsg = `API returned code ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = `${errData.error} (Status: ${response.status})`;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        sender: "assistant",
        text: data.reply || "I processed your prompt successfully.",
        timestamp: new Date().toISOString(),
        actions: data.actions || []
      };

      setMessages((prev) => [...prev, assistantMsg]);
      addLog(`[GEMINI] Assistant reply received. Status: 200 OK`);

      if (data.reply && data.reply.includes("[⚠️ Gemini API Offline]")) {
        const parts = data.reply.split("[⚠️ Gemini API Offline]");
        const errDetail = parts[1]?.split(".")[0]?.trim() || "Gemini API experienced a configuration or key expiration issue.";
        setApiError(`Gemini is offline: ${errDetail}`);
      } else {
        setApiError(null);
      }

      // Handle server-directed task modifications
      if (data.actions && Array.isArray(data.actions)) {
        data.actions.forEach((action: ChatAction) => {
          handleAIAction(action);
        });
      }

    } catch (err: any) {
      console.error(err);
      const errString = err.message || JSON.stringify(err);
      addLog(`[ALERT] Failed server proxy response: ${errString}`);
      setApiError(`Failed server response: ${errString}`);
      
      const assistantErrorMsg: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        sender: "assistant",
        text: "I met an issue reaching the server-side proxy. Please ensure the GEMINI_API_KEY secret is verified in your settings block, or try again.",
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, assistantErrorMsg]);
    } finally {
      setIsPending(false);
    }
  };

  // Client Side UI task manipulation
  const handleToggleTaskStatus = (id: string) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id === id) {
          const isTaskDone = task.status === TaskStatus.DONE || task.status === TaskStatus.COMPLETED || task.status.toLowerCase() === "done" || task.status.toLowerCase() === "completed";
          const nextStatus = isTaskDone ? TaskStatus.NEW : TaskStatus.DONE;
          
          addLog(`[STATUS UPDATE] Task "${task.title.slice(0, 24)}" updated status to: ${nextStatus}.`);
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    const target = tasks.find(t => t.id === id);
    setTasks((current) => current.filter((task) => task.id !== id));
    addLog(`[DELETE] Object ID ${id} removed successfully from local context database.`);
  };

  const handleOpenCreateForm = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => {
    if (taskData.id) {
      // Edit
      setTasks((current) =>
        current.map((t) =>
          t.id === taskData.id
            ? {
                ...t,
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                category: taskData.category
              }
            : t
        )
      );
      addLog(`[DATABASE UPDATE] Task ID ${taskData.id} manually edited successfully.`);
    } else {
      // Create new
      const newTask: Task = {
        id: "task-" + Date.now(),
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        category: taskData.category,
        createdAt: new Date().toISOString()
      };
      setTasks((current) => [newTask, ...current]);
      addLog(`[RECORD CREATED] Task "${taskData.title.slice(0, 24)}" generated under ID ${newTask.id}.`);
    }
    setIsFormOpen(false);
  };

  // Dynamically execute actions generated by standard LLM outputs
  const handleAIAction = (action: ChatAction) => {
    if (!action || !action.type) return;

    switch (action.type) {
      case "ADD_TASK": {
        const payload = action.payload || {};
        if (!payload.title) return;
        const newTask: Task = {
          id: "task-" + Date.now() + Math.floor(Math.random() * 100),
          title: payload.title,
          description: payload.description || "",
          status: (payload.status as TaskStatus) || TaskStatus.NEW,
          priority: (payload.priority as TaskPriority) || TaskPriority.MEDIUM,
          dueDate: payload.dueDate || undefined,
          category: payload.category || "AI Assistant",
          createdAt: new Date().toISOString()
        };
        setTasks((prev) => [newTask, ...prev]);
        addLog(`[AI SCHEDULER] Automatically generated task "${newTask.title.slice(0, 28)}" in database.`);
        break;
      }
      case "COMPLETE_TASK": {
        const targetId = action.payload?.id;
        if (!targetId) return;
        setTasks((prev) =>
          prev.map((t) =>
            t.id === targetId || t.title.toLowerCase().includes(targetId)
              ? { ...t, status: TaskStatus.DONE }
              : t
          )
        );
        addLog(`[AI SCHEDULER] Marked matching task ID or tag "${targetId}" as DONE.`);
        break;
      }
      case "UPDATE_TASK": {
        const payload = action.payload || {};
        if (!payload.id) return;
        setTasks((prev) =>
          prev.map((t) =>
            t.id === payload.id
              ? {
                  ...t,
                  title: payload.title || t.title,
                  description: payload.description || t.description,
                  status: (payload.status as TaskStatus) || t.status,
                  priority: (payload.priority as TaskPriority) || t.priority,
                  dueDate: payload.dueDate || t.dueDate,
                  category: payload.category || t.category
                }
              : t
          )
        );
        addLog(`[AI SCHEDULER] Restructured details for task ID ${payload.id}.`);
        break;
      }
      case "DELETE_TASK": {
        const targetId = action.payload?.id;
        if (!targetId) return;
        setTasks((prev) => prev.filter((t) => t.id !== targetId));
        addLog(`[AI SCHEDULER] Automatic purging executed for task ID: ${targetId}.`);
        break;
      }
      default:
        break;
    }
  };

  const handleTasksLoadedFromFolder = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  // Restart logging/system action simulation
  const handleResetWorkspace = () => {
    localStorage.removeItem("high_density_tasks");
    localStorage.removeItem("high_density_messages");
    setTasks(INITIAL_TASKS);
    setMessages(INITIAL_MESSAGES);
    setTerminalLogs([
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Reboot requested. Hard clean.`,
      `[${new Date().toLocaleTimeString()}] Reseeding default SQLite structures...`,
      `[${new Date().toLocaleTimeString()}] Database reconnected successfully. Active connections: 2`
    ]);
  };

  // Filtering Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalItemCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === TaskStatus.DONE || t.status === TaskStatus.COMPLETED || t.status.toLowerCase() === "done" || t.status.toLowerCase() === "completed").length;
  const pendingCount = totalItemCount - completedCount;

  if (!user) {
    return (
      <AuthScreen 
        onLoginSuccess={(authorizedUser) => {
          setUser(authorizedUser);
          setTerminalLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] [AUTH] Successfully authenticated as "${authorizedUser.name}" via ${authorizedUser.provider.toUpperCase()}.`
          ]);
        }} 
      />
    );
  }

  return (
    <div id="workspace-root" className="h-screen w-full bg-[#0F1115] text-[#E0E0E0] font-sans flex flex-col overflow-hidden select-none">
      
      {/* Top Header Section */}
      <header className="height-[56px] min-h-[56px] bg-[#161B22] border-b border-[#2D3139] display-flex flex items-center justify-between px-5 py-2.5 z-10">
        <div className="flex items-center gap-3">
          {/* Logo icon representation */}
          <div className="w-8 h-8 bg-[#3B82F6] rounded-md flex items-center justify-center font-black text-white text-base tracking-wider select-none shadow-sm shadow-blue-500/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#F8FAFC] tracking-tight text-sm md:text-base">AICHATBOTOLI</span>
              <span className="text-[10px] bg-[#2D3139] text-[#8B949E] px-1.5 py-0.5 rounded-md font-mono border border-[#2D3139]">v2.1.0</span>
            </div>
          </div>
        </div>

        {/* Development & Server Docker runtime metrics */}
        <div className="flex items-center gap-2 md:gap-4 font-mono">
          {user && (
            <div className="flex items-center gap-2 bg-[#090B0E] border border-[#2D3139] rounded-lg p-1 px-2.5 shrink-0 select-none">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#2D3139]" 
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-blue-600/25 border border-blue-500/35 text-blue-400 font-bold flex items-center justify-center text-[10px] uppercase font-sans">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left justify-center min-w-0 font-sans">
                <span className="text-[11px] font-semibold text-white leading-none tracking-tight truncate max-w-[80px]">
                  {user.name}
                </span>
                <span className="text-[8px] text-blue-400 uppercase font-mono tracking-wider font-bold leading-none mt-0.5">
                  {user.provider}
                </span>
              </div>
              <button
                id="header-logout-btn"
                onClick={() => {
                  setUser(null);
                  setTerminalLogs((prev) => [
                    ...prev,
                    `[${new Date().toLocaleTimeString()}] [AUTH] Terminated session for "${user.name}" (sign-off).`
                  ]);
                }}
                className="ml-1.5 p-1 rounded-md text-[#8B949E] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="hidden md:flex items-center gap-2 text-xs bg-[#161B22] border border-[#2D3139] rounded-lg px-2.5 py-1 text-[#3B82F6]">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-ping"></span>
            <span>Docker: Running</span>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#161B22] border border-[#2D3139] rounded-lg px-2.5 py-1 text-[#4ADE80]">
            <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full"></span>
            <span>Local: 3000</span>
          </div>
          <button 
            id="workspace-reset-btn"
            onClick={handleResetWorkspace}
            title="Clean Database & Reset Chats"
            className="p-1 px-2 rounded-md bg-[#252A33] border border-[#2D3139] hover:border-rose-400/50 hover:bg-rose-500/10 text-[#8B949E] hover:text-rose-400 text-xs flex items-center gap-1 cursor-pointer transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar Sidebar */}
        <aside className="w-16 bg-[#090B0E] border-r border-[#2D3139] flex flex-col items-center justify-between py-4 select-none">
          <div className="flex flex-col gap-4 w-full px-2">
            <button
              id="sidebar-chat-tab"
              onClick={() => {
                setActiveSidebar("chat");
                addLog(`[UI FOCUS] Shifted primary focus context viewport to: CHAT-ASSISTANT`);
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer relative ${
                activeSidebar === "chat"
                  ? "bg-[#3B82F6]/15 border border-[#3B82F6] text-[#3B82F6]"
                  : "text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#161B22] border border-transparent"
              }`}
              title="Chat Assistant"
            >
              <span className="text-xl">💬</span>
              {activeSidebar === "chat" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#3B82F6] rounded-l-md" />
              )}
            </button>

            <button
              id="sidebar-tasks-tab"
              onClick={() => {
                setActiveSidebar("tasks");
                addLog(`[UI FOCUS] Shifted primary focus context viewport to: WORKITEMS-DB`);
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer relative ${
                activeSidebar === "tasks"
                  ? "bg-[#3B82F6]/15 border border-[#3B82F6] text-[#3B82F6]"
                  : "text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#161B22] border border-transparent"
              }`}
              title="Interactive Work Items"
            >
              <span className="text-xl">📋</span>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingCount}
              </div>
              {activeSidebar === "tasks" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#3B82F6] rounded-l-md" />
              )}
            </button>

            <button
              id="sidebar-logs-tab"
              onClick={() => {
                setActiveSidebar("settings");
                addLog(`[UI EVENT] Triggered diagnostic details readout callback.`);
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer relative ${
                activeSidebar === "settings"
                  ? "bg-[#3B82F6]/15 border border-[#3B82F6] text-[#3B82F6]"
                  : "text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#161B22] border border-transparent"
              }`}
              title="System Metadata"
            >
              <span className="text-xl">⚙️</span>
              {activeSidebar === "settings" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#3B82F6] rounded-l-md" />
              )}
            </button>

            <button
              id="sidebar-docker-tab"
              onClick={() => {
                setActiveSidebar("docker");
                addLog(`[SYSTEM] Initiating local image telemetry query state... SUCCESS`);
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer relative ${
                activeSidebar === "docker"
                  ? "bg-[#3B82F6]/15 border border-[#3B82F6] text-[#3B82F6]"
                  : "text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#161B22] border border-transparent"
              }`}
              title="Docker Platform Node"
            >
              <span className="text-xl">🐳</span>
              {activeSidebar === "docker" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#3B82F6] rounded-l-md" />
              )}
            </button>
          </div>

          <div className="flex flex-col gap-1 items-center select-none text-[10px] text-[#8B949E]/50 font-mono">
            <span>SYS</span>
            <span className="text-emerald-500 font-bold">OK</span>
          </div>
        </aside>

        {/* Dashboard workspace core view */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#090B0E]">
          
          {/* Middle view: Chat area (occupies left on wide displays, or full when tabbed) */}
          <div className={`flex-1 flex flex-col p-4 overflow-hidden h-full ${
            activeSidebar !== "chat" ? "hidden md:flex" : "flex"
          }`}>
            <ChatPanel 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isPending={isPending} 
              onUploadCsvFile={processCsvContent}
              apiError={apiError}
            />
          </div>

          {/* Right/Second Workspace Panel: Database Work Items */}
          <div className={`w-full md:w-[480px] lg:w-[560px] border-l border-[#2D3139] bg-[#090B0E] flex flex-col h-full overflow-hidden ${
            activeSidebar === "chat" ? "hidden md:flex" : "flex"
          }`}>
            
            {/* Database header block */}
            <div className="px-5 py-4 border-b border-[#2D3139] bg-[#161B22] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <span>📋 Local WorkItems DB</span>
                  <span className="text-xs text-[#3B82F6]">({filteredTasks.length})</span>
                </h2>
                <span className="text-[10px] text-[#8B949E] block mt-0.5 font-mono">
                  Persisted SQLite Engine proxy loaded online
                </span>
              </div>
              
              <button
                id="create-task-form-btn"
                onClick={handleOpenCreateForm}
                className="px-3 py-1.5 bg-[#3B82F6] hover:bg-blue-600 font-bold text-xs text-white rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Quick dashboard interactive metrics */}
            <div className="grid grid-cols-3 divide-x divide-[#2D3139] border-b border-[#2D3139] bg-[#161B22]/30 text-xs text-center">
              <div className="py-2.5">
                <span className="block text-[10px] text-[#8B949E] font-bold uppercase font-mono mb-0.5">Total count</span>
                <span className="text-sm font-bold text-white">{totalItemCount}</span>
              </div>
              <div className="py-2.5">
                <span className="block text-[10px] text-[#8B949E] font-bold uppercase font-mono mb-0.5">Pending</span>
                <span className="text-sm font-bold text-[#3B82F6]">{pendingCount}</span>
              </div>
              <div className="py-2.5">
                <span className="block text-[10px] text-[#8B949E] font-bold uppercase font-mono mb-0.5">Completed</span>
                <span className="text-sm font-bold text-emerald-400">{completedCount}</span>
              </div>
            </div>

            {/* Database Query & Filtering Controls */}
            <div className="p-3 bg-[#161B22]/50 border-b border-[#2D3139] space-y-2">
              <div className="flex items-center gap-2 bg-[#090B0E] border border-[#2D3139] rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
                <input
                  id="task-search-input"
                  type="text"
                  placeholder="Query tasks, description, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white placeholder-[#8B949E] outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[#8B949E] hover:text-white text-xs font-mono cursor-pointer">
                    Clear
                  </button>
                )}
              </div>

              <div className="flex gap-2 text-[10px] font-mono">
                <div className="flex-1 flex items-center gap-1 bg-[#090B0E] border border-[#2D3139] rounded-md px-2 py-1">
                  <span className="text-[#8B949E]">Status:</span>
                  <select
                    id="status-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 bg-transparent text-white border-none outline-none cursor-pointer font-sans"
                  >
                    <option value="ALL" className="bg-[#090B0E]">ALL</option>
                    <option value={TaskStatus.NEW} className="bg-[#090B0E]">New</option>
                    <option value={TaskStatus.PENDING_BUSINESS} className="bg-[#090B0E]">Pending Business</option>
                    <option value={TaskStatus.PENDING_DEV} className="bg-[#090B0E]">Pending Dev</option>
                    <option value={TaskStatus.IN_PROGRESS} className="bg-[#090B0E]">In Progress</option>
                    <option value={TaskStatus.WAITING_FOR_QA} className="bg-[#090B0E]">Waiting for QA</option>
                    <option value={TaskStatus.READY} className="bg-[#090B0E]">Ready</option>
                    <option value={TaskStatus.DONE} className="bg-[#090B0E]">Done</option>
                    <option value={TaskStatus.DUPLICATE} className="bg-[#090B0E]">Duplicate</option>
                  </select>
                </div>

                <div className="flex-1 flex items-center gap-1 bg-[#090B0E] border border-[#2D3139] rounded-md px-2 py-1">
                  <span className="text-[#8B949E]">Priority:</span>
                  <select
                    id="priority-filter-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="flex-1 bg-transparent text-white border-none outline-none cursor-pointer font-sans"
                  >
                    <option value="ALL" className="bg-[#090B0E]">ALL</option>
                    <option value={TaskPriority.LOW} className="bg-[#090B0E]">Low</option>
                    <option value={TaskPriority.MEDIUM} className="bg-[#090B0E]">Medium</option>
                    <option value={TaskPriority.HIGH} className="bg-[#090B0E]">High</option>
                  </select>
                </div>
              </div>

              {/* Desktop C: Drive CSV Folder Synchronous Mapper */}
              <DesktopSyncPanel 
                tasks={tasks}
                onTasksLoadedFromFolder={handleTasksLoadedFromFolder}
                onAddLog={addLog}
              />

              {/* Collapsible Bulk CSV Uploader Accordion */}
              <div className="border border-[#2D3139]/80 rounded-lg overflow-hidden bg-[#090B0E]/50">
                <button
                  type="button"
                  id="toggle-csv-import-btn"
                  onClick={() => setIsCsvImportOpen(!isCsvImportOpen)}
                  className="w-full px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-semibold text-[#8B949E] hover:text-white transition-colors cursor-pointer select-none bg-[#161B22]/30"
                >
                  <div className="flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>BULK CSV DATABASE IMPORT</span>
                  </div>
                  {isCsvImportOpen ? (
                    <ChevronUp className="w-3 h-3 text-[#8B949E]" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-[#8B949E]" />
                  )}
                </button>

                {isCsvImportOpen && (
                  <div className="p-3 border-t border-[#2D3139]/60 space-y-3 text-left">
                    <div>
                      <p className="text-[10px] text-[#8B949E] leading-normal font-sans">
                        Import tasks from spreadsheets. Ensure columns include <b className="text-white">Title</b>. Optional columns: <b className="text-[#8B949E]/90">Description, Priority, Status, Category, DueDate</b>.
                      </p>
                    </div>

                    <div className="flex gap-1.5 border-b border-[#2D3139]/30 pb-1.5">
                      <button
                        type="button"
                        onClick={() => setCsvMode("upload")}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                          csvMode === "upload"
                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/30"
                            : "text-[#8B949E] hover:text-white"
                        }`}
                      >
                        File Drag & Drop
                      </button>
                      <button
                        type="button"
                        onClick={() => setCsvMode("paste")}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                          csvMode === "paste"
                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/30"
                            : "text-[#8B949E] hover:text-white"
                        }`}
                      >
                        Copy-Paste Raw CSV
                      </button>
                    </div>

                    {csvMode === "upload" ? (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const text = event.target?.result as string;
                              processCsvContent(text);
                            };
                            reader.readAsText(file);
                          }
                        }}
                        className={`border border-dashed p-3 rounded-lg text-center transition-all relative cursor-pointer ${
                          isDragging 
                            ? "border-blue-500 bg-blue-600/5 text-white" 
                            : "border-[#2D3139] hover:border-[#8B949E]/50 text-[#8B949E]"
                        }`}
                      >
                        <input
                          type="file"
                          id="csv-file-selector"
                          accept=".csv"
                          onChange={handleCsvFileUpload}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
                        />
                        <Upload className="w-5 h-5 mx-auto text-[#8B949E]/60 mb-1" />
                        <p className="text-[10px] font-mono font-bold uppercase text-[#E0E0E0]">
                          Drag & Drop CSV File
                        </p>
                        <p className="text-[9px] text-[#8B949E] mt-0.5">
                          Or click here to browse system files (.csv)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <textarea
                          placeholder="Title,Description,Priority,Status,Category&#10;Write user guides,Explain persistent SSO models,High,In progress,Security&#10;Audit telemetry,Check SQLite docker outputs,Low,New,Database"
                          value={csvPasteText}
                          onChange={(e) => setCsvPasteText(e.target.value)}
                          className="w-full h-20 bg-[#090B0E] border border-[#2D3139] rounded-lg p-2 font-mono text-[9px] text-emerald-400 focus:border-[#3B82F6] outline-none placeholder-[#8B949E]/30 leading-normal"
                        />
                        <button
                          type="button"
                          onClick={() => processCsvContent(csvPasteText)}
                          className="w-full py-1 bg-[#21262D] hover:bg-[#30363D] border border-[#2D3139] text-[#E0E0E0] hover:text-white text-[9px] font-mono font-bold uppercase rounded-md tracking-wider transition-colors cursor-pointer"
                        >
                          Process Copied Matrix
                        </button>
                      </div>
                    )}

                    <AnimatePresence>
                      {csvMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`p-2 rounded-lg text-[9px] flex gap-1.5 items-start ${
                            csvMessage.type === "success"
                              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                              : csvMessage.type === "error"
                              ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                              : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                          }`}
                        >
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span>{csvMessage.text}</span>
                            {csvMessage.type === "success" && (
                              <button 
                                onClick={() => setCsvMessage(null)} 
                                className="ml-2 font-mono font-black hover:underline"
                              >
                                [Dismiss]
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Task list container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={handleToggleTaskStatus}
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEditForm}
                  />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-[#2D3139] rounded-xl bg-[#161B22]/10">
                  <Layers className="w-8 h-8 text-[#8B949E]/40 mb-2.5" />
                  <p className="text-xs text-white font-semibold">No Matching WorkItems</p>
                  <p className="text-[11px] text-[#8B949E] mt-1 max-w-[240px]">
                    Your SQLite filters returned empty. Ask Gemini to schedule new tasks or click &quot;Add Item&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* Platform & Server debug readout module */}
            <div className="p-3 bg-[#161B22] border-t border-[#2D3139] text-[11px] font-mono text-[#8B949E]">
              <div className="flex justify-between py-0.5">
                <span>Platform:</span>
                <span className="text-white">Docker Desktop OS</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Base Image:</span>
                <span className="text-white">mcr.microsoft.com/aspnet:8.0</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Build hash:</span>
                <span className="text-[#3B82F6]">8f2c3a91-aistudio</span>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Bottom Footer Terminal - Height 120px with Scrolling Server output */}
      <footer className="h-[120px] min-h-[120px] bg-[#050608] border-t border-[#2D3139] p-3 text-xs font-mono overflow-y-auto relative select-text z-10 selection:bg-[#3B82F6]/30">
        <div className="absolute right-3.5 top-2 px-2 py-0.5 rounded-md bg-[#161B22] border border-[#2D3139] text-[9px] text-[#8B949E] font-bold uppercase select-none tracking-widest flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-[#3B82F6]" />
          <span>Interactive Shell Console</span>
        </div>
        
        <div className="space-y-1 pr-32">
          {terminalLogs.map((log, idx) => (
            <div 
              key={idx} 
              className={`leading-relaxed tracking-wide ${
                log.startsWith("$") 
                  ? "text-[#FCD34D]" 
                  : log.includes("[ALERT]") 
                  ? "text-rose-400 font-semibold" 
                  : log.includes("[AI SCHEDULER]") 
                  ? "text-[#3B82F6]" 
                  : "text-[#4ADE80]"
              }`}
            >
              {log}
            </div>
          ))}
          <div className="text-[#3B82F6] flex items-center gap-1.5 animate-pulse mt-1 select-none">
            <span>&gt; Waiting for user input...</span>
            <span className="w-1.5 h-3 bg-[#3B82F6]"></span>
          </div>
          <div ref={terminalEndRef} />
        </div>
      </footer>

      {/* Modal Task Edit/Create element */}
      {isFormOpen && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
}
