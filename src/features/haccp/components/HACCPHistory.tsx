import React from 'react';
import { History } from 'lucide-react';
import { CCPRecord, AuditRecord } from '../types/haccp';
import { FindingStatusButton } from './FindingStatusButton';
import { updateFindingStatus } from '../services/auditService';

interface HACCPHistoryProps {
  ccpRecords: CCPRecord[];
  audits: AuditRecord[];
  onUpdate?: () => void;
}

export function HACCPHistory({ ccpRecords, audits, onUpdate }: HACCPHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleStatusUpdate = async (auditId: string, findingId: string, currentStatus: 'open' | 'in-progress' | 'closed') => {
    try {
      const username = localStorage.getItem('username') || 'Unbekannt';
      let newStatus: typeof currentStatus;

      switch (currentStatus) {
        case 'open':
          newStatus = 'in-progress';
          break;
        case 'in-progress':
          newStatus = 'closed';
          break;
        default:
          return; // Already closed
      }

      await updateFindingStatus(auditId, findingId, newStatus, username);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating finding status:', error);
      alert('Fehler beim Aktualisieren des Status');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <History className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold dark:text-white">HACCP Verlauf</h2>
      </div>

      <div className="space-y-6">
        {/* Audits Section */}
        <section>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Audits</h3>
          <div className="space-y-4">
            {audits.map((audit) => (
              <div key={audit.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium dark:text-white">
                    {audit.type === 'internal' ? 'Internes Audit' : 'Externes Audit'}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(audit.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Durchgeführt von: {audit.auditor}
                </p>
                <div className="space-y-4">
                  {audit.findings.map((finding) => (
                    <div key={finding.id} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium dark:text-white">{finding.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Korrekturmaßnahme: {finding.correctionAction}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Frist: {formatDate(finding.deadline)}
                          </p>
                        </div>
                        <FindingStatusButton
                          status={finding.status}
                          onClick={() => handleStatusUpdate(audit.id, finding.id, finding.status)}
                          disabled={finding.status === 'closed'}
                        />
                      </div>
                      {finding.closedAt && finding.closedBy && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          Abgeschlossen am {formatDate(finding.closedAt)} von {finding.closedBy}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {audits.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Keine Audit-Einträge vorhanden
              </p>
            )}
          </div>
        </section>

        {/* CCP Records Section */}
        <section>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">CCP Aufzeichnungen</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2">Datum</th>
                  <th className="text-left py-2">Typ</th>
                  <th className="text-right py-2">Wert</th>
                  <th className="text-left py-2">Standort</th>
                  <th className="text-left py-2">Geprüft von</th>
                </tr>
              </thead>
              <tbody>
                {ccpRecords.map((record) => (
                  <tr key={record.id} className="border-b dark:border-gray-700">
                    <td className="py-2">{formatDate(record.date)}</td>
                    <td className="py-2">{record.type}</td>
                    <td className="py-2 text-right">{record.value}°C</td>
                    <td className="py-2">{record.location}</td>
                    <td className="py-2">{record.checkedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}