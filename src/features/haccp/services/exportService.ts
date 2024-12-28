import { getCCPRecords } from './ccpService';
import { getHACCPDocuments } from './documentService';
import { getAuditRecords } from './auditService';

export async function exportCCPRecords(startDate: Date, endDate: Date): Promise<string> {
  const records = await getCCPRecords(startDate, endDate);
  
  const headers = ['Datum;Typ;Wert;Grenzwert;Standort;Geprüft von;Anmerkungen'];
  const rows = records.map(record => [
    formatDate(record.date),
    record.type,
    `${record.value}°C`,
    `${record.limit.warning}°C`,
    record.location,
    record.checkedBy,
    record.notes || ''
  ].join(';'));

  return headers.concat(rows).join('\n');
}

export async function exportDocuments(): Promise<string> {
  const documents = await getHACCPDocuments();
  
  const headers = ['Titel;Typ;Version;Erstellt am;Aktualisiert am;Genehmigt von'];
  const rows = documents.map(doc => [
    doc.title,
    doc.type,
    doc.version,
    formatDate(doc.createdAt),
    formatDate(doc.updatedAt),
    doc.approvedBy || ''
  ].join(';'));

  return headers.concat(rows).join('\n');
}

export async function exportAudits(startDate: Date, endDate: Date): Promise<string> {
  try {
    const audits = await getAuditRecords(startDate, endDate);

    const headers = [
      'Datum',
      'Typ',
      'Auditor',
      'Status',
      'Nächstes Audit',
      'Feststellung',
      'Kategorie',
      'Korrekturmaßnahme',
      'Frist',
      'Status der Maßnahme'
    ].join(';');

    const rows = audits.flatMap(audit => 
      audit.findings.map(finding => [
        formatDate(audit.date),
        audit.type === 'internal' ? 'Intern' : 'Extern',
        audit.auditor,
        audit.status === 'open' ? 'Offen' : 'Abgeschlossen',
        formatDate(audit.nextAuditDate),
        finding.description,
        finding.category === 'critical' ? 'Kritisch' : 
        finding.category === 'major' ? 'Schwerwiegend' : 'Geringfügig',
        finding.correctionAction,
        formatDate(finding.deadline),
        finding.status === 'open' ? 'Offen' :
        finding.status === 'in-progress' ? 'In Bearbeitung' : 'Abgeschlossen'
      ].join(';'))
    );

    if (rows.length === 0) {
      return headers + '\nKeine Audit-Einträge im ausgewählten Zeitraum';
    }

    return [headers, ...rows].join('\n');
  } catch (error) {
    console.error('Error exporting audits:', error);
    throw new Error('Fehler beim Exportieren der Audit-Daten');
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}