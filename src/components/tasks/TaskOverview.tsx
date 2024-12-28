import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { TaskList } from './TaskList';
import { TaskFilter } from './TaskFilter';
import { TaskFilter as TaskFilterType } from '../../types/task';
import { useTasks } from '../../hooks/useTasks';

export function TaskOverview() {
  const { tasks, loading } = useTasks();
  const [filters, setFilters] = useState<TaskFilterType>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.assignedTo && task.assignedTo !== filters.assignedTo) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">Aufgabenübersicht</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <Filter className="w-4 h-4" />
          <span>Filter {showFilters ? 'ausblenden' : 'anzeigen'}</span>
        </button>
      </div>

      {showFilters && (
        <TaskFilter filters={filters} onFilterChange={setFilters} />
      )}

      {loading ? (
        <div className="text-center py-4">Lädt Aufgaben...</div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </div>
  );
}