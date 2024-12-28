import React from 'react';
import { ClipboardCheck, AlertTriangle } from 'lucide-react';
import { AuditRecord } from '../types/haccp';

interface AuditListProps {
  audits: AuditRecord[];
}

export function AuditList({ audits }: AuditListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getFindingSeverityColor = (category: string) => {
    switch (category) {
      case 'critical': return 'text-red-600';
      case 'major': return 'text-amber-600';
      case 'minor': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {audits.map((audit) => (
        <div key={audit.id} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                {audit.type === 'internal' ? 'Internes Audit' : 'Externes Audit'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Durchgeführt am {formatDate(audit.date)} von {audit.auditor}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              audit.status === 'open' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {audit.status === 'open' ? 'Offen' : 'Abgeschlossen'}
            </div>
          </div>

          <div className="space-y-4">
            {audit.findings.map((finding) => (
              <div key={finding.id} className="border-t dark:border-gray-600 pt-4">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getFindingSeverityColor(finding.category)}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getFindingSeverityColor(finding.category)}`}>
                        {finding.category === 'critical' ? 'Kritisch' :
                         finding.category === 'major' ? 'Schwerwiegend' : 'Geringfügig'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Frist: {formatDate(finding.deadline)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{finding.description}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <strong>Korrekturmaßnahme:</strong> {finding.correctionAction}
                    </p>
                    {finding.status === 'closed' && finding.closedAt && (
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Abgeschlossen am {formatDate(finding.closedAt)} von {finding.closedBy}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nächstes Audit geplant: {formatDate(audit.nextAuditDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}