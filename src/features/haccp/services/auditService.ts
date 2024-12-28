import { collection, addDoc, getDocs, query, orderBy, Timestamp, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { AuditRecord } from '../types/haccp';
import { sendHACCPReport } from '../../../lib/email';

const COLLECTION_NAME = 'haccpAudits';

export async function addAuditRecord(audit: Omit<AuditRecord, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...audit,
      date: Timestamp.fromDate(audit.date),
      nextAuditDate: Timestamp.fromDate(audit.nextAuditDate),
      findings: audit.findings.map(finding => ({
        ...finding,
        deadline: Timestamp.fromDate(finding.deadline),
        closedAt: finding.closedAt ? Timestamp.fromDate(finding.closedAt) : null
      }))
    });

    // Send notification for new audit
    await sendHACCPReport('Audit', {
      type: audit.type,
      auditor: audit.auditor,
      date: audit.date,
      findings: audit.findings,
      status: audit.status
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding audit record:', error);
    throw error;
  }
}

export async function getAuditRecords(startDate: Date, endDate: Date): Promise<AuditRecord[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: (data.date as Timestamp).toDate(),
        nextAuditDate: (data.nextAuditDate as Timestamp).toDate(),
        findings: data.findings.map((finding: any) => ({
          ...finding,
          deadline: (finding.deadline as Timestamp).toDate(),
          closedAt: finding.closedAt ? (finding.closedAt as Timestamp).toDate() : null
        }))
      };
    }) as AuditRecord[];
  } catch (error) {
    console.error('Error getting audit records:', error);
    throw error;
  }
}

export async function updateFindingStatus(
  auditId: string,
  findingId: string,
  status: 'open' | 'in-progress' | 'closed',
  closedBy?: string
): Promise<void> {
  try {
    const auditRef = doc(db, COLLECTION_NAME, auditId);
    const audit = (await getAuditRecords(new Date(0), new Date()))
      .find(a => a.id === auditId);

    if (!audit) throw new Error('Audit nicht gefunden');

    const updatedFindings = audit.findings.map(finding => {
      if (finding.id === findingId) {
        return {
          ...finding,
          status,
          closedAt: status === 'closed' ? Timestamp.now() : null,
          closedBy: status === 'closed' ? closedBy : null
        };
      }
      return finding;
    });

    await updateDoc(auditRef, { findings: updatedFindings });
  } catch (error) {
    console.error('Error updating finding status:', error);
    throw error;
  }
}