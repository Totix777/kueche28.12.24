import React from 'react';
import { Task } from '../../types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by status (open first, then in-progress, then completed)
    const statusOrder = { open: 0, 'in-progress': 1, completed: 2 };
    if (a.status !== b.status) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Finally by due date
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sortedTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Keine Aufgaben gefunden
        </div>
      )}
    </div>
  );
}