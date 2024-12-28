import { Timestamp } from 'firebase/firestore';

export interface CCPRecord {
  id: string;
  date: Date;
  type: 'temperature' | 'time' | 'visual';
  value: number;
  limit: {
    critical: number;
    warning: number;
  };
  location: string;
  checkedBy: string;
  notes?: string;
  correctionAction?: string;
}

export interface HACCPDocument {
  id: string;
  type: 'procedure' | 'record' | 'checklist';
  title: string;
  content: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
}

export interface AuditRecord {
  id: string;
  date: Date;
  type: 'internal' | 'external';
  auditor: string;
  findings: AuditFinding[];
  status: 'open' | 'closed';
  nextAuditDate: Date;
}

export interface AuditFinding {
  id: string;
  category: 'critical' | 'major' | 'minor';
  description: string;
  correctionAction: string;
  deadline: Date;
  status: 'open' | 'in-progress' | 'closed';
  closedAt?: Date;
  closedBy?: string;
}