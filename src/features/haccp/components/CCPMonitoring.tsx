import React, { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { CCPRecord } from '../types/haccp';
import { addCCPRecord } from '../services/haccpService';

export function CCPMonitoring() {
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !location) return;

    try {
      setLoading(true);
      const numericValue = parseFloat(value);
      const username = localStorage.getItem('username') || 'Unbekannt';

      await addCCPRecord({
        type: 'temperature',
        value: numericValue,
        limit: {
          critical: 3,
          warning: 5
        },
        location,
        checkedBy: username,
        notes
      });

      setValue('');
      setLocation('');
      setNotes('');
    } catch (error) {
      console.error('Error adding CCP record:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">CCP Überwachung</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Temperatur (°C)
          </label>
          <input
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Kontrollpunkt
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Bitte wählen...</option>
            <option value="wareneingang">Wareneingang</option>
            <option value="kuehllager">Kühllager</option>
            <option value="zubereitung">Zubereitung</option>
            <option value="ausgabe">Ausgabe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Anmerkungen
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Wird gespeichert...' : 'Aufzeichnung speichern'}
        </button>
      </form>
    </div>
  );
}