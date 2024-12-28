import { Area, CleaningTask } from '../../types';

export interface TaskData {
  areaId: string;
  areaName: string;
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  completedAt: Date | null;
  completedBy?: string;
  createdAt: Date;
  lastModified?: Date;
}

export interface TaskUpdate {
  completed: boolean;
  completedBy: string;
}

export type { Area, CleaningTask };