import React, { useState } from 'react';
import { AlertOctagon } from 'lucide-react';

interface CorrectiveActionFormProps {
  ccpId: string;
  onSubmit: (data: {
    action: string;
    responsible: string;
    verification: string;
  }) => Promise<void>;
}

export function CorrectiveActionForm({ ccpId, onSubmit }: CorrectiveActionFormProps) {
  const [action, setAction] = useState('');
  const [responsible, setResponsible] = useState('');
  const [verification, setVerification] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action || !responsible || !verification) return;

    try {
      setLoading(true);
      await onSubmit({
        action,
        responsible,
        verification
      });
      
      // Reset form
      setAction('');
      setResponsible('');
      setVerification('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertOctagon className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-medium text-red-900 dark:text-red-200">
          Korrekturmaßnahme erforderlich
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Korrekturmaßnahme
          </label>
          <textarea
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={3}
            required
            placeholder="Beschreiben Sie die durchgeführte Korrekturmaßnahme..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Verantwortliche Person
          </label>
          <input
            type="text"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Verifizierung
          </label>
          <textarea
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={2}
            required
            placeholder="Wie wurde die Wirksamkeit der Maßnahme überprüft?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Wird gespeichert...' : 'Korrekturmaßnahme dokumentieren'}
        </button>
      </form>
    </div>
  );
}