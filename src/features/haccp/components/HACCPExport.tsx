import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportHACCPData } from '../services/haccpService';

export function HACCPExport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<'ccps' | 'documents' | 'audits'>('ccps');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      setError('Bitte wählen Sie Start- und Enddatum aus');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const csv = await exportHACCPData(
        type,
        new Date(startDate),
        new Date(endDate)
      );

      // Download als CSV-Datei
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `haccp_${type}_${startDate}_bis_${endDate}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      setError('Fehler beim Exportieren der Daten');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Download className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold dark:text-white">HACCP Export</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Datentyp
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'ccps' | 'documents' | 'audits')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="ccps">CCP Aufzeichnungen</option>
            <option value="documents">Dokumente</option>
            <option value="audits">Audits</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Startdatum
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enddatum
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={handleExport}
          disabled={loading || !startDate || !endDate}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Exportiere...' : 'Als CSV exportieren'}
        </button>
      </div>
    </div>
  );
}