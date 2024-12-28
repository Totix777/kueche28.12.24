export type TaskStatus = 'open' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate: Date;
  assignedTo: string;
  completedAt?: Date;
  completedBy?: string;
}

export interface TaskFilter {
  status?: TaskStatus;
  assignedTo?: string;
  priority?: TaskPriority;
}