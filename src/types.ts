export enum TaskStatus {
  NEW = "New",
  PENDING_BUSINESS = "Pending Business",
  PENDING_DEV = "Pending Dev",
  IN_PROGRESS = "In Progress",
  WAITING_FOR_QA = "Waiting for QA",
  READY = "Ready",
  DONE = "Done",
  DUPLICATE = "Duplicate",

  // Backward compatibility mappings
  TODO = "New",
  COMPLETED = "Done",
  CODE_COMPLETED = "Pending Dev"
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  category?: string;
  createdAt: string;
}

export interface ChatAction {
  type: "ADD_TASK" | "UPDATE_TASK" | "DELETE_TASK" | "COMPLETE_TASK" | "NONE";
  payload?: any;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
}

export interface UserProfile {
  name: string;
  emailOrPhone: string;
  provider: "google" | "apple" | "facebook" | "gmail" | "phone";
  avatarUrl?: string;
  phoneCountryCode?: string;
}
