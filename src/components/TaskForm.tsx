import React, { useState, useEffect } from "react";
import { Task, TaskPriority, TaskStatus } from "../types";
import { X, Check } from "lucide-react";

interface TaskFormProps {
  taskToEdit?: Task | null;
  onSubmit: (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => void;
  onCancel: () => void;
}

export default function TaskForm({ taskToEdit, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.NEW);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate || "");
      setCategory(taskToEdit.category || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.NEW);
      setPriority(TaskPriority.MEDIUM);
      setDueDate("");
      setCategory("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id: taskToEdit?.id,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || undefined,
      category: category.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div 
        id="task-form-container"
        className="bg-[#161B22] rounded-xl shadow-2xl w-full max-w-lg border border-[#2D3139] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#090B0E] border-b border-[#2D3139] flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#E0E0E0] uppercase tracking-wide">
            {taskToEdit ? "Edit Task Item" : "Create Task Item"}
          </h2>
          <button
            id="close-form-btn"
            onClick={onCancel}
            className="p-1 rounded-md text-[#8B949E] hover:text-white hover:bg-[#2D3139] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="form-title-input"
              type="text"
              required
              placeholder="e.g. Design App Landing page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/70"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
              Description
            </label>
            <textarea
              id="form-desc-input"
              rows={3}
              placeholder="Describe what needs to be solved..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/50 resize-none font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
                Priority
              </label>
              <select
                id="form-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-[#E0E0E0] focus:border-[#3B82F6] outline-none transition-all"
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
                Status
              </label>
              <select
                id="form-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-[#E0E0E0] focus:border-[#3B82F6] outline-none transition-all"
              >
                <option value={TaskStatus.NEW}>New</option>
                <option value={TaskStatus.PENDING_BUSINESS}>Pending Business</option>
                <option value={TaskStatus.PENDING_DEV}>Pending Dev</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.WAITING_FOR_QA}>Waiting for QA</option>
                <option value={TaskStatus.READY}>Ready</option>
                <option value={TaskStatus.DONE}>Done</option>
                <option value={TaskStatus.DUPLICATE}>Duplicate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
                Due Date
              </label>
              <input
                id="form-duedate-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-[#E0E0E0] focus:border-[#3B82F6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8B949E] uppercase tracking-wider mb-1 font-mono">
                Category
              </label>
              <input
                id="form-category-input"
                type="text"
                placeholder="e.g. Design, Frontend"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-[#2D3139] text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/70"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#2D3139]/50">
            <button
              id="form-cancel-btn"
              type="button"
              onClick={onCancel}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#8B949E] hover:text-[#E0E0E0] hover:bg-[#2D3139] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="form-submit-btn"
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-[#3B82F6] rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{taskToEdit ? "Save Work Item" : "Create Item"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
