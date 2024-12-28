export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | null;
  completedBy?: string;
}

export interface TodoUpdate {
  completed: boolean;
  completedBy: string;
  completedAt: Date | null;
}