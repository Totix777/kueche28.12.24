export interface CleaningTask {
  id: string;
  area: string;
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
  lastModified?: Date;
}

export interface Area {
  id: string; 
  name: string;
  tasks: CleaningTask[];
}