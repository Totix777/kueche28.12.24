import React from 'react';
import { CheckSquare, Square, Clock } from 'lucide-react';
import { CleaningTask } from '../types';

interface TaskListProps {
  tasks: CleaningTask[];
  onTaskComplete: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskComplete }: TaskListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <button
              onClick={() => onTaskComplete(task.id)}
              className={`mt-1 text-gray-600 hover:text-red-600 transition-colors ${
                task.completed ? 'text-green-600' : ''
              }`}
            >
              {task.completed ? (
                <CheckSquare className="w-6 h-6 text-green-600" />
              ) : (
                <Square className="w-6 h-6" />
              )}
            </button>
            <div>
              <h3 className="font-medium">{task.task}</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  Häufigkeit: {task.frequency === 'daily' ? 'Täglich' : 
                              task.frequency === 'weekly' ? 'Wöchentlich' : 'Monatlich'}
                </p>
                {task.completedAt && (
                  <p className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      Zuletzt erledigt: {formatDate(task.completedAt)} von {task.completedBy}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}