import React, { useState, useEffect } from "react";
import { Folder, RefreshCw, FolderOpen, AlertTriangle, CheckCircle, Info, Database, HelpCircle } from "lucide-react";
import { Task } from "../types";
import { 
  saveDirectoryHandle, 
  getDirectoryHandle, 
  clearDirectoryHandle, 
  writeTasksToFolder, 
  readTasksFromFolder,
  convertTasksToCsv
} from "../lib/desktopSync";

interface DesktopSyncPanelProps {
  tasks: Task[];
  onTasksLoadedFromFolder: (tasks: Task[]) => void;
  onAddLog: (line: string) => void;
}

export default function DesktopSyncPanel({ tasks, onTasksLoadedFromFolder, onAddLog }: DesktopSyncPanelProps) {
  const [handle, setHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [folderName, setFolderName] = useState<string>("");
  const [syncStatus, setSyncStatus] = useState<"disconnected" | "permission_pending" | "connected" | "error">("disconnected");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  // Initialize and check for existing handle on mount
  useEffect(() => {
    setIsInIframe(window.self !== window.top);
    checkSavedHandle();
  }, []);

  // Write tasks whenever task data changes and sync is actively connected
  useEffect(() => {
    if (handle && syncStatus === "connected") {
      autoSaveTasks();
    }
  }, [tasks, handle, syncStatus]);

  async function checkSavedHandle() {
    try {
      const savedHandle = await getDirectoryHandle();
      if (savedHandle) {
        setHandle(savedHandle);
        setFolderName(savedHandle.name);
        
        // Check if we still have readwrite permissions to avoid security blockages
        const options = { mode: "readwrite" as const };
        const permission = await (savedHandle as any).queryPermission(options);
        
        if (permission === "granted") {
          setSyncStatus("connected");
          onAddLog(`[DESKTOP SYNC] Recovered directory handle for "${savedHandle.name}". Sync active.`);
          loadTasks(savedHandle);
        } else {
          setSyncStatus("permission_pending");
          onAddLog(`[DESKTOP SYNC] Directory handle recovered, but requires interactive user consent/permission.`);
        }
      }
    } catch (err: any) {
      console.error("Failed to recover directory handle:", err);
      setSyncStatus("disconnected");
    }
  }

  async function handleSelectFolder() {
    try {
      setErrorMessage("");
      // Prompt user to select directory on their local system (like C:/Drive)
      const dirHandle = await (window as any).showDirectoryPicker({
        id: "task_desktop_sync",
        mode: "readwrite"
      });

      if (dirHandle) {
        setHandle(dirHandle);
        setFolderName(dirHandle.name);
        await saveDirectoryHandle(dirHandle);
        setSyncStatus("connected");
        onAddLog(`[DESKTOP SYNC] Directory mapped successfully: C:/.../${dirHandle.name}`);
        
        // Read tasks or seed current list
        await loadTasks(dirHandle);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        onAddLog("[DESKTOP SYNC] Operation cancelled by user.");
        return;
      }
      console.error(err);
      setSyncStatus("error");
      
      const isIframeErr = String(err.message).toLowerCase().includes("frame") || 
                          String(err.message).toLowerCase().includes("origin") || 
                          isInIframe;
                          
      if (isIframeErr) {
        setErrorMessage("Browser Security Restriction: Standard folder selection is forbidden inside inline preview frames. Please click 'Open in New Tab' above to run fully featured!");
      } else {
        setErrorMessage(err.message || "Native directory picker is unsupported, or permissions were denied.");
      }
      onAddLog(`[DESKTOP SYNC] Error: ${err.message || err}`);
    }
  }

  async function handleGrantPermission() {
    if (!handle) return;
    try {
      setErrorMessage("");
      const options = { mode: "readwrite" as const };
      const permission = await (handle as any).requestPermission(options);
      
      if (permission === "granted") {
        setSyncStatus("connected");
        onAddLog(`[DESKTOP SYNC] Consented folder read-write handles. Active local task loading active.`);
        await loadTasks(handle);
      } else {
        onAddLog(`[DESKTOP SYNC] Writeback permission rejected by user.`);
      }
    } catch (err: any) {
      setSyncStatus("error");
      setErrorMessage(err.message || "Failed requesting interactive access permission.");
      onAddLog(`[DESKTOP SYNC] Permission solicitation failed: ${err.message}`);
    }
  }

  async function loadTasks(targetHandle: FileSystemDirectoryHandle) {
    try {
      const fileTasks = await readTasksFromFolder(targetHandle);
      if (fileTasks && fileTasks.length > 0) {
        onTasksLoadedFromFolder(fileTasks);
        setLastSyncTime(new Date().toLocaleTimeString());
        onAddLog(`[DESKTOP SYNC] Successfully loaded ${fileTasks.length} tasks from spreadsheet "tasks.csv" file.`);
      } else {
        // File does not exist or is empty. Seed file with current application state so they are not empty!
        onAddLog(`[DESKTOP SYNC] File "tasks.csv" not found. Initializing seed state tasks list inside "${targetHandle.name}".`);
        await writeTasksToFolder(targetHandle, tasks);
        setLastSyncTime(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      console.error(err);
      onAddLog(`[DESKTOP SYNC] Failed loading tasks.csv: ${err.message}`);
    }
  }

  async function autoSaveTasks() {
    if (!handle) return;
    try {
      await writeTasksToFolder(handle, tasks);
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.error("Auto sync save failed:", err);
      onAddLog(`[DESKTOP SYNC] [ERROR] Auto-save task write back crashed: ${err.message}`);
    }
  }

  async function handleForceSync() {
    if (!handle) return;
    if (syncStatus === "permission_pending") {
      await handleGrantPermission();
      return;
    }
    
    try {
      onAddLog(`[DESKTOP SYNC] Forcing manual synchronization read/write...`);
      await loadTasks(handle);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }

  async function handleDisconnect() {
    await clearDirectoryHandle();
    setHandle(null);
    setFolderName("");
    setSyncStatus("disconnected");
    onAddLog(`[DESKTOP SYNC] Unlinked and disconnected active directory handles.`);
  }

  // Generate a downloadable Backup CSV just in case they use unsupported environments
  const downloadBackupCsv = () => {
    const csvContent = convertTasksToCsv(tasks);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tasks_backup.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onAddLog("[DESKTOP SYNC] Downloaded local backup CSV file to Downloads folder.");
  };

  return (
    <div className="border border-[#2D3139] rounded-lg overflow-hidden bg-[#0A0D14]/80 text-left font-sans placeholder-opacity-55">
      {/* Header bar */}
      <div className="px-3 py-2 bg-[#161B22]/70 flex items-center justify-between border-b border-[#2D3139]">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
            C: Drive & Folder Sync Panel
          </span>
        </div>
        <button 
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-[#8B949E] hover:text-white p-0.5 rounded cursor-pointer transition-colors"
          title="What is this?"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* Explanation card */}
        {showExplanation && (
          <div className="p-2.5 bg-blue-600/5 border border-blue-500/25 rounded-md text-[10px] text-[#8B949E] leading-relaxed relative">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.1 font-mono">
              <Database className="w-3 h-3 text-[#3B82F6]" /> DIRECT DICTIONARY DIRECTORY ACCESS
            </h4>
            <p className="mb-1.5">
              Normally web apps are caged within the browser. Through the <b className="text-white">File System Access API</b>, desktop users can authorize a folder (e.g. inside your <b className="text-white">C:/ drive</b>) to act as your physical workspace container.
            </p>
            <p>
              When synchronized, the application saves your tasks directly into a file called <b className="text-[#3B82F6]">tasks.csv</b>. Any modifications sync instantly to your drive offline!
            </p>
          </div>
        )}

        {/* Current Connection Status indicators */}
        <div className="flex items-center justify-between text-xs bg-[#12161F] p-2.5 rounded-md border border-[#2D3139]/50">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#8B949E] uppercase">Sync Status:</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {syncStatus === "connected" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono font-black text-emerald-400 text-[11px] uppercase tracking-wide">CONNECTED</span>
                </>
              )}
              {syncStatus === "permission_pending" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono font-black text-amber-400 text-[11px] uppercase tracking-wide">WAITING CONSENT</span>
                </>
              )}
              {syncStatus === "disconnected" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  <span className="font-mono font-black text-[#8B949E] text-[11px] uppercase tracking-wide">NOT LINKED</span>
                </>
              )}
              {syncStatus === "error" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="font-mono font-black text-red-400 text-[11px] uppercase tracking-wide">ERROR</span>
                </>
              )}
            </div>
            
            {folderName && (
              <div className="text-[10px] font-mono text-white/95 mt-1 bg-[#090B0E]/60 px-1.5 py-0.5 rounded border border-[#2D3139]/40 inline-flex items-center gap-1 max-w-[210px] truncate">
                <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>C:/{folderName}</span>
              </div>
            )}
          </div>

          <div className="text-right text-[10px] font-mono">
            <span className="text-[#8B949E] block">LAST COALESCED:</span>
            <span className="text-white font-bold">{lastSyncTime || "N/A"}</span>
          </div>
        </div>

        {/* If inside sandboxed iframe workspace, provide friendly top-level launch advice */}
        {isInIframe && (
          <div className="p-2.5 bg-blue-950/25 border border-blue-500/25 rounded-md text-[10px] text-[#A5C2F3] leading-relaxed">
            <span className="font-bold text-white block mb-0.5">💻 Running in Sandbox Frame:</span>
            Browser security rules block direct directory selection inside embedded preview windows. Click the link below to load full C: drive desktop access!
            <a 
              href={window.location.href}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 py-1 px-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-mono font-bold uppercase rounded flex items-center justify-center gap-1 transition-colors"
            >
              Open Application in New Tab ↗
            </a>
          </div>
        )}

        {/* Action button bar */}
        <div className="flex flex-wrap gap-2">
          {syncStatus === "disconnected" && (
            <button
              type="button"
              id="select-c-drive-folder-btn"
              onClick={handleSelectFolder}
              className="flex-1 min-w-[140px] py-1.1 px-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold uppercase rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer shadow"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Link Desktop Directory</span>
            </button>
          )}

          {syncStatus === "permission_pending" && (
            <button
              type="button"
              id="grant-drive-permission-btn"
              onClick={handleGrantPermission}
              className="flex-1 min-w-[140px] py-1.1 px-2.5 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-mono font-bold uppercase rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer animate-pulse"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Authorize Workspace Link</span>
            </button>
          )}

          {syncStatus === "connected" && (
            <>
              <button
                type="button"
                id="force-sync-folder-btn"
                onClick={handleForceSync}
                className="flex-1 min-w-[100px] py-1 p-2 bg-[#21262D] hover:bg-[#30363D] border border-[#2D3139] text-[#E0E0E0] hover:text-white text-[10px] font-mono font-bold uppercase rounded-md flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Force Sync</span>
              </button>
              <button
                type="button"
                id="unlink-sync-folder-btn"
                onClick={handleDisconnect}
                className="py-1 px-2 border border-red-500/30 bg-red-950/15 text-red-400 hover:text-red-300 hover:bg-red-900/10 text-[10px] font-mono font-bold uppercase rounded-md transition-colors cursor-pointer"
                title="Unlink Folder"
              >
                Unlink
              </button>
            </>
          )}
        </div>

        {/* Error logging status if present */}
        {errorMessage && (
          <div className="p-2 rounded bg-red-950/20 border border-red-500/30 text-rose-400 font-mono text-[9px] flex gap-1.5 items-start leading-normal">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Fallback Backup button */}
        <div className="pt-2 border-t border-[#2D3139]/40 flex justify-between items-center">
          <span className="text-[9px] text-[#8B949E] font-mono">
            Syncing standard flat-file database (tasks.csv)
          </span>
          <button
            type="button"
            onClick={downloadBackupCsv}
            className="text-[9px] font-mono text-[#3B82F6] hover:underline hover:text-blue-400 cursor-pointer"
          >
            Download CSV Backup
          </button>
        </div>
      </div>
    </div>
  );
}
