import { ExportType, ExportOptions } from './types';
import { exportTasks } from './taskExport';
import { exportTodos } from './todoExport';

export async function exportData(type: ExportType, startDate: Date, endDate: Date): Promise<string> {
  const options: ExportOptions = {
    startDate,
    endDate: new Date(endDate.setHours(23, 59, 59, 999))
  };

  switch (type) {
    case 'tasks':
      return exportTasks(options);
    case 'todos':
      return exportTodos(options);
    case 'coolers':
    case 'food':
      throw new Error('Export type not implemented yet');
    default:
      throw new Error('Invalid export type');
  }
}