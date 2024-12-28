import React from 'react';
import { TaskFilter as TaskFilterType, TaskStatus, TaskPriority } from '../../types/task';

interface TaskFilterProps {
  filters: TaskFilterType;
  onFilterChange: (filters: TaskFilterType) => void;
}

export function TaskFilter({ filters, onFilterChange }: TaskFilterProps) {
  const handleFilterChange = (key: keyof TaskFilterType, value: string | undefined) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Alle</option>
            <option value="open">Offen</option>
            <option value="in-progress">In Bearbeitung</option>
            <option value="completed">Erledigt</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priorität
          </label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value || undefined)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Alle</option>
            <option value="high">Hoch</option>
            <option value="medium">Mittel</option>
            <option value="low">Niedrig</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mitarbeiter
          </label>
          <select
            value={filters.assignedTo || ''}
            onChange={(e) => handleFilterChange('assignedTo', e.target.value || undefined)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Alle</option>
            {/* This would be populated with actual staff members */}
          </select>
        </div>
      </div>
    </div>
  );
}