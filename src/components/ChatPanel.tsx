import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Task, ChatAction } from "../types";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, Calendar, CheckSquare, Plus, Trash2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isPending: boolean;
  onUploadCsvFile: (text: string, fileName?: string) => void;
  apiError?: string | null;
}

const suggestions = [
  { text: "🪄 Suggest 3 tasks for building a React Landing Page", label: "Suggest Tasks" },
  { text: "📊 Analyze my current pending work items and suggest priorities", label: "Analyze Waitlist" },
  { text: "💡 Break down my highest priority task into smaller subtasks", label: "Breakdown Task" },
  { text: "📅 Organize my tasks based on upcoming due dates", label: "Sort Schedule" },
];

export default function ChatPanel({ messages, onSendMessage, isPending, onUploadCsvFile, apiError }: ChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isPending) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleSuggestionClick = (text: string) => {
    if (isPending) return;
    onSendMessage(text);
  };

  const renderActionBadge = (action: ChatAction, idx: number) => {
    switch (action.type) {
      case "ADD_TASK":
        return (
          <div key={idx} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-green-200 mt-2 shadow-xs">
            <Plus className="w-3.5 h-3.5 text-green-600 font-bold" />
            <span>AI Action: Added task &ldquo;{action.payload?.title}&rdquo;</span>
          </div>
        );
      case "COMPLETE_TASK":
        return (
          <div key={idx} className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-indigo-200 mt-2 shadow-xs">
            <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Action: Completed task via system</span>
          </div>
        );
      case "UPDATE_TASK":
        return (
          <div key={idx} className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-amber-200 mt-2 shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Action: Updated task details</span>
          </div>
        );
      case "DELETE_TASK":
        return (
          <div key={idx} className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-rose-200 mt-2 shadow-xs">
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>AI Action: Removed task from workspace</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="ai-chat-panel" className="bg-[#161B22] flex flex-col h-full rounded-xl border border-[#2D3139] overflow-hidden shadow-md">
      {/* Panel Greeting Header */}
      <div className="px-5 py-3.5 bg-[#090B0E] text-[#E0E0E0] flex items-center justify-between border-b border-[#2D3139]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#3B82F6]/10 rounded-lg border border-[#3B82F6]/25">
            <Bot className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              AI Task Assistant
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
              <span className="text-[10px] text-[#8B949E] font-mono">Gemini 3.5 Core Engine Active</span>
            </div>
          </div>
        </div>
        <div className="p-1 px-2.5 rounded-md text-[9px] uppercase font-mono tracking-wider font-bold bg-[#161B22] text-[#8B949E] border border-[#2D3139]">
          Agent Proxy
        </div>
      </div>

      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-rose-500/10 border-b border-rose-500/20 p-3 px-4 flex items-start gap-2.5 text-xs text-rose-400 font-sans overflow-hidden"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <span className="font-bold uppercase tracking-wider block text-[10px] text-rose-300">Google Gemini API Warning</span>
              <p className="leading-relaxed text-rose-200/90 text-[11px]">{apiError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Scroll Sandbox */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#090B0E]/30">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              id={`chat-msg-${msg.id}`}
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg border flex-shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#2D3139] border-[#2D3139] text-[#E0E0E0]"
                    : "bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]"
                }`}
              >
                {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-xl text-sm leading-relaxed border ${
                    msg.sender === "user"
                      ? "bg-[#3B82F6] text-white border-[#3B82F6] rounded-tr-none"
                      : "bg-[#2D3139] text-[#E0E0E0] border-[#2D3139] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line text-xs md:text-sm font-sans">{msg.text}</p>

                  {/* Actions log inside assistant response */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1.5 items-start">
                      {msg.actions.map((action, actionIdx) => (
                        <div key={actionIdx}>
                          {action.type === "ADD_TASK" && (
                            <div className="inline-flex items-center gap-1.5 bg-[#4ADE80]/15 text-[#4ADE80] text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#4ADE80]/35 shadow-xs">
                              <Plus className="w-3 h-3 text-[#4ADE80] font-bold" />
                              <span>[ADDED] Task: &ldquo;{action.payload?.title}&rdquo;</span>
                            </div>
                          )}
                          {action.type === "COMPLETE_TASK" && (
                            <div className="inline-flex items-center gap-1.5 bg-[#3B82F6]/15 text-[#3B82F6] text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#3B82F6]/35 shadow-xs">
                              <CheckSquare className="w-3 h-3 text-[#3B82F6]" />
                              <span>[COMPLETED] Task ID: {action.payload?.id?.slice(0,6) || "Done"}</span>
                            </div>
                          )}
                          {action.type === "UPDATE_TASK" && (
                            <div className="inline-flex items-center gap-1.5 bg-[#FACC15]/15 text-[#FACC15] text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#FACC15]/35 shadow-xs">
                              <RefreshCw className="w-3 h-3 text-[#FACC15]" />
                              <span>[UPDATED] Task Info</span>
                            </div>
                          )}
                          {action.type === "DELETE_TASK" && (
                            <div className="inline-flex items-center gap-1.5 bg-rose-500/15 text-rose-400 text-[10px] font-mono px-2 py-0.5 rounded-md border border-rose-500/35 shadow-xs">
                              <Trash2 className="w-3 h-3 text-rose-400" />
                              <span>[DELETED] Task ID: {action.payload?.id?.slice(0,6) || "Removed"}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className={`text-[10px] text-[#8B949E] mt-1 font-mono ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}

          {isPending && (
            <motion.div
              id="chat-typing-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 max-w-[80%] mr-auto"
            >
              <div className="p-1.5 rounded-lg border flex-shrink-0 bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#2D3139] border border-[#2D3139] p-3 rounded-xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chat chips logic */}
      <div className="px-4 pt-2.5 pb-2 border-t border-[#2D3139] bg-[#161B22]">
        <label className="text-[9px] text-[#8B949E] uppercase font-bold tracking-widest block mb-1.5 font-mono">
          Assistant Suggestions
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
          {suggestions.map((item, idx) => (
            <button
              id={`chat-suggestion-${idx}`}
              key={idx}
              type="button"
              disabled={isPending}
              onClick={() => handleSuggestionClick(item.text)}
              className="px-2 py-1 text-[11px] border border-[#2D3139] hover:border-[#3B82F6] hover:text-[#3B82F6] bg-[#090B0E] hover:bg-[#3B82F6]/5 text-[#8B949E] rounded-md transition-all text-left flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#3B82F6] shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Chat input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#2D3139] bg-[#161B22] flex items-center gap-2">
        <label 
          id="chat-csv-upload-label"
          className={`p-2 bg-[#21262D] hover:bg-[#30363D] border border-[#2D3139] text-[#E0E0E0] hover:text-[#4ADE80] rounded-lg transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-xs h-[38px] w-[38px] ${isPending ? "opacity-40 pointer-events-none" : ""}`}
          title="Upload & Sync CSV Spreadsheet Tasks"
        >
          <Upload className="w-4 h-4 text-emerald-400" />
          <input
            type="file"
            accept=".csv"
            disabled={isPending}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                const text = event.target?.result as string;
                onUploadCsvFile(text, file.name);
              };
              reader.readAsText(file);
              e.target.value = ""; // reset
            }}
          />
        </label>

        <input
          id="chat-message-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isPending ? "Gemini is replying..." : "Type dynamic prompt (e.g. Add write documentation to todo)..."}
          disabled={isPending}
          className="flex-1 bg-[#090B0E] border border-[#2D3139] rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:bg-[#090B0E] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]"
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={!inputText.trim() || isPending}
          className="p-2.5 bg-[#3B82F6] text-white hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-[#3B82F6] rounded-lg transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-xs h-[38px] w-[38px]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
