import React, { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { AuditList } from './AuditList';
import { AuditForm } from './AuditForm';
import { AuditRecord } from '../types/haccp';
import { addAuditRecord } from '../services/haccpService';

export function AuditManagement() {
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // For now, we'll just set loading to false since we haven't implemented audit loading yet
    setLoading(false);
  }, []);

  const handleSubmit = async (data: {
    type: 'internal' | 'external';
    auditor: string;
    findings: Array<{
      category: 'critical' | 'major' | 'minor';
      description: string;
      correctionAction: string;
      deadline: Date;
      status: 'open' | 'in-progress' | 'closed';
    }>;
    nextAuditDate: Date;
  }) => {
    try {
      const auditData: Omit<AuditRecord, 'id'> = {
        date: new Date(), // Current date for the audit
        type: data.type,
        auditor: data.auditor,
        findings: data.findings.map(finding => ({
          id: Date.now().toString(), // Generate a temporary ID
          ...finding
        })),
        status: 'open',
        nextAuditDate: data.nextAuditDate
      };

      await addAuditRecord(auditData);
      setShowForm(false);
      // TODO: Implement reloading audits when the Firebase integration is complete
    } catch (error) {
      console.error('Error adding audit record:', error);
      throw error;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ClipboardCheck className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold dark:text-white">HACCP Audits</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {showForm ? 'Abbrechen' : 'Neues Audit'}
        </button>
      </div>

      {showForm ? (
        <AuditForm onSubmit={handleSubmit} />
      ) : loading ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Lädt Audits...
        </div>
      ) : (
        <AuditList audits={audits} />
      )}
    </div>
  );
}