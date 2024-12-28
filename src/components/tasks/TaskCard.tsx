import React from 'react';
import { Clock, User, Calendar, AlertCircle } from 'lucide-react';
import { Task, TaskStatus } from '../../types/task';
import { useTaskActions } from '../../hooks/useTaskActions';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTaskStatus } = useTaskActions();

  const statusColors = {
    open: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-blue-600'
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTaskStatus(task.id, newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="font-medium dark:text-white">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
          {task.status === 'open' ? 'Offen' :
           task.status === 'in-progress' ? 'In Bearbeitung' : 'Erledigt'}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <AlertCircle className={`w-4 h-4 ${priorityColors[task.priority]}`} />
          <span className="text-gray-600 dark:text-gray-300">
            Priorität: {
              task.priority === 'high' ? 'Hoch' :
              task.priority === 'medium' ? 'Mittel' : 'Niedrig'
            }
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {task.assignedTo}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Fällig: {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Erstellt: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 pt-4">
        {task.status !== 'completed' && (
          <>
            {task.status === 'open' && (
              <button
                onClick={() => handleStatusChange('in-progress')}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                In Bearbeitung
              </button>
            )}
            {task.status === 'in-progress' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Abschließen
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}