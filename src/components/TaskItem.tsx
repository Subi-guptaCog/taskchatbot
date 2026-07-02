import React from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import { Calendar, AlertCircle, Trash2, Edit3, CheckCircle, Circle, Tag } from "lucide-react";
import { motion } from "motion/react";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  key?: string;
}

export default function TaskItem({ task, onToggleStatus, onDelete, onEdit }: TaskItemProps) {
  const isCompleted = String(task.status).toLowerCase() === "done" || String(task.status).toLowerCase() === "completed";

  const priorityColors = {
    [TaskPriority.HIGH]: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    [TaskPriority.MEDIUM]: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    [TaskPriority.LOW]: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  const statusColors = {
    [TaskStatus.NEW]: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    [TaskStatus.PENDING_BUSINESS]: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    [TaskStatus.PENDING_DEV]: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    [TaskStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    [TaskStatus.WAITING_FOR_QA]: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    [TaskStatus.READY]: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    [TaskStatus.DONE]: "bg-[#10B981]/10 text-[#34D399] border-[#10B981]/25",
    [TaskStatus.DUPLICATE]: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <motion.div
      id={`task-item-${task.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className={`p-3 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
        isCompleted
          ? "bg-[#090B0E]/60 border-[#2D3139] opacity-60"
          : "bg-[#161B22] border-[#2D3139] hover:border-[#3B82F6]/50 shadow-xs"
      }`}
    >
      {/* Task Content / Left Block */}
      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        <button
          id={`task-toggle-${task.id}`}
          onClick={() => onToggleStatus(task.id)}
          className="mt-0.5 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#3B82F6] rounded-full cursor-pointer"
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]/10" />
          ) : (
            <Circle className="w-5 h-5 text-[#8B949E] hover:text-[#3B82F6] transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3
              className={`text-xs md:text-sm font-semibold text-[#E0E0E0] truncate leading-snug ${
                isCompleted ? "line-through text-[#8B949E]" : ""
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md border ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>

          <p
            className={`mt-1 text-xs text-[#8B949E] line-clamp-2 ${
              isCompleted ? "text-[#8B949E]/70" : ""
            }`}
          >
            {task.description || (
              <span className="italic text-[#8B949E]/55">No description provided.</span>
            )}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#8B949E]/80 font-mono">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-[#FACC15]/80">
                <Calendar className="w-3 h-3" />
                <span>Due: {task.dueDate}</span>
              </div>
            )}
            {task.category && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#3B82F6]/80" />
                <span>{task.category}</span>
              </div>
            )}
            <div className="text-[9px] text-[#8B949E]/40">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Task Actions / Right Block */}
      <div className="flex items-center justify-end gap-1 border-t border-[#2D3139]/50 pt-2 md:pt-0 md:border-0">
        <button
          id={`task-edit-${task.id}`}
          onClick={() => onEdit(task)}
          className="p-1 rounded-md text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#2D3139] transition-colors cursor-pointer"
          title="Edit Task"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button
          id={`task-delete-${task.id}`}
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-md text-[#8B949E] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Delete Task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
