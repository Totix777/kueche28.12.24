import React from 'react';
import { CCPRecord } from '../types/haccp';

interface CCPChartProps {
  records: CCPRecord[];
  limits: {
    critical: { min?: number; max?: number };
    warning: { min?: number; max?: number };
  };
}

export function CCPChart({ records, limits }: CCPChartProps) {
  const sortedRecords = [...records].sort((a, b) => a.date.getTime() - b.date.getTime());

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getValueColor = (value: number) => {
    if (limits.critical.min && value < limits.critical.min) return 'text-red-600';
    if (limits.critical.max && value > limits.critical.max) return 'text-red-600';
    if (limits.warning.min && value < limits.warning.min) return 'text-amber-600';
    if (limits.warning.max && value > limits.warning.max) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Zeit
              </th>
              <th className="text-right py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Wert
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Kontrollpunkt
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Geprüft von
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record) => (
              <tr key={record.id} className="border-b dark:border-gray-700">
                <td className="py-2 text-sm text-gray-900 dark:text-gray-300">
                  {formatTime(record.date)}
                </td>
                <td className={`py-2 text-sm text-right font-medium ${getValueColor(record.value)}`}>
                  {record.value}°C
                </td>
                <td className="py-2 text-sm text-gray-900 dark:text-gray-300">
                  {record.location}
                </td>
                <td className="py-2 text-sm text-gray-900 dark:text-gray-300">
                  {record.checkedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}