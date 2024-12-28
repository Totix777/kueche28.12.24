import React, { useState, useEffect } from 'react';
import { ClipboardCheck, FileText, AlertTriangle } from 'lucide-react';
import { CCPMonitoring } from './CCPMonitoring';
import { DocumentManagement } from './DocumentManagement';
import { AuditManagement } from './AuditManagement';
import { EmailTest } from './EmailTest';
import { HACCPExport } from './HACCPExport';
import { HACCPHistory } from './HACCPHistory';
import { useHACCP } from '../hooks/useHACCP';
import { getAuditRecords } from '../services/auditService';
import { AuditRecord } from '../types/haccp';

export function HACCPDashboard() {
  const { ccpRecords, loading, error } = useHACCP();
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [auditLoading, setAuditLoading] = useState(true);

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    try {
      setAuditLoading(true);
      // Load last 30 days of audits
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const records = await getAuditRecords(startDate, new Date());
      setAudits(records);
    } catch (err) {
      console.error('Error loading audits:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  if (loading || auditLoading) {
    return <div>Lädt...</div>;
  }

  if (error) {
    return <div>Fehler beim Laden der HACCP-Daten</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CCPMonitoring />
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold dark:text-white">Grenzwerte</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2 dark:text-white">Temperaturkontrolle</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Kritischer Grenzwert:</span>
                    <span className="font-medium text-red-600">{'<'} 3°C oder {'>'} 7°C</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Warngrenze:</span>
                    <span className="font-medium text-amber-600">{'<'} 4°C oder {'>'} 6°C</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2 dark:text-white">Kerntemperatur</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Mindesttemperatur:</span>
                    <span className="font-medium text-red-600">{'>='} 75°C</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <EmailTest />
        </div>
      </div>
      
      <DocumentManagement />
      <AuditManagement />
      <HACCPExport />
      <HACCPHistory 
        ccpRecords={ccpRecords} 
        audits={audits}
        onUpdate={loadAudits}
      />
    </div>
  );
}