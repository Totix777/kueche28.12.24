import { exportCCPRecords, exportDocuments, exportAudits } from './exportService';
import { addCCPRecord, getCCPRecords } from './ccpService';
import { addAuditRecord, getAuditRecords } from './auditService';
import { addHACCPDocument, getHACCPDocuments } from './documentService';

export {
  addCCPRecord,
  getCCPRecords,
  addAuditRecord,
  getAuditRecords,
  addHACCPDocument,
  getHACCPDocuments
};

export async function exportHACCPData(
  type: 'ccps' | 'documents' | 'audits',
  startDate: Date,
  endDate: Date
): Promise<string> {
  try {
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    switch (type) {
      case 'ccps':
        return await exportCCPRecords(startDate, adjustedEndDate);
      case 'documents':
        return await exportDocuments();
      case 'audits':
        return await exportAudits(startDate, adjustedEndDate);
      default:
        throw new Error('Ungültiger Export-Typ');
    }
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Fehler beim Exportieren der Daten');
  }
}