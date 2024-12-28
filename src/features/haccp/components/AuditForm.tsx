import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AuditFinding } from '../types/haccp';

interface AuditFormProps {
  onSubmit: (data: {
    type: 'internal' | 'external';
    auditor: string;
    findings: Omit<AuditFinding, 'id'>[];
    nextAuditDate: Date;
  }) => Promise<void>;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [type, setType] = useState<'internal' | 'external'>('internal');
  const [auditor, setAuditor] = useState('');
  const [nextAuditDate, setNextAuditDate] = useState('');
  const [findings, setFindings] = useState<Omit<AuditFinding, 'id'>[]>([]);
  const [loading, setLoading] = useState(false);

  const addFinding = () => {
    setFindings([
      ...findings,
      {
        category: 'minor',
        description: '',
        correctionAction: '',
        deadline: new Date(),
        status: 'open'
      }
    ]);
  };

  const removeFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const updateFinding = (index: number, updates: Partial<AuditFinding>) => {
    setFindings(findings.map((finding, i) => 
      i === index ? { ...finding, ...updates } : finding
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditor || !nextAuditDate || findings.length === 0) return;

    try {
      setLoading(true);
      await onSubmit({
        type,
        auditor,
        findings,
        nextAuditDate: new Date(nextAuditDate)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Audit-Typ
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'internal' | 'external')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="internal">Internes Audit</option>
            <option value="external">Externes Audit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Auditor
          </label>
          <input
            type="text"
            value={auditor}
            onChange={(e) => setAuditor(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium dark:text-white">Feststellungen</h3>
          <button
            type="button"
            onClick={addFinding}
            className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Plus className="w-4 h-4" />
            <span>Feststellung hinzufügen</span>
          </button>
        </div>

        <div className="space-y-4">
          {findings.map((finding, index) => (
            <div key={index} className="border dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between mb-4">
                <select
                  value={finding.category}
                  onChange={(e) => updateFinding(index, { 
                    category: e.target.value as AuditFinding['category']
                  })}
                  className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="minor">Geringfügig</option>
                  <option value="major">Schwerwiegend</option>
                  <option value="critical">Kritisch</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeFinding(index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Beschreibung
                  </label>
                  <textarea
                    value={finding.description}
                    onChange={(e) => updateFinding(index, { description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Korrekturmaßnahme
                  </label>
                  <textarea
                    value={finding.correctionAction}
                    onChange={(e) => updateFinding(index, { correctionAction: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Frist
                  </label>
                  <input
                    type="date"
                    value={finding.deadline.toISOString().split('T')[0]}
                    onChange={(e) => updateFinding(index, { 
                      deadline: new Date(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nächstes Audit geplant für
        </label>
        <input
          type="date"
          value={nextAuditDate}
          onChange={(e) => setNextAuditDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Wird gespeichert...' : 'Audit speichern'}
      </button>
    </form>
  );
}