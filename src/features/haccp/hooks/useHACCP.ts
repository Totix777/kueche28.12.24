import { useState, useEffect } from 'react';
import { CCPRecord, HACCPDocument, AuditRecord } from '../types/haccp';
import { 
  getCCPRecords, 
  getHACCPDocuments,
  addCCPRecord,
  addHACCPDocument,
  addAuditRecord
} from '../services/haccpService';

export function useHACCP() {
  const [ccpRecords, setCCPRecords] = useState<CCPRecord[]>([]);
  const [documents, setDocuments] = useState<HACCPDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Last 30 days
      
      const [ccps, docs] = await Promise.all([
        getCCPRecords(startDate, new Date()),
        getHACCPDocuments()
      ]);

      setCCPRecords(ccps);
      setDocuments(docs);
    } catch (err) {
      setError('Fehler beim Laden der HACCP-Daten');
      console.error('Error loading HACCP data:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCCP = async (record: Omit<CCPRecord, 'id' | 'date'>) => {
    try {
      await addCCPRecord(record);
      await loadData(); // Reload data after adding new record
    } catch (err) {
      throw new Error('Fehler beim Speichern des CCP-Datensatzes');
    }
  };

  const addDocument = async (doc: Omit<HACCPDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addHACCPDocument(doc);
      await loadData();
    } catch (err) {
      throw new Error('Fehler beim Speichern des Dokuments');
    }
  };

  const addAudit = async (audit: Omit<AuditRecord, 'id'>) => {
    try {
      await addAuditRecord(audit);
      await loadData();
    } catch (err) {
      throw new Error('Fehler beim Speichern des Audits');
    }
  };

  return {
    ccpRecords,
    documents,
    loading,
    error,
    addCCP,
    addDocument,
    addAudit,
    refresh: loadData
  };
}