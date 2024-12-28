import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ExportOptions, ExportedTask } from './types';
import { formatDateTime } from './formatters';

export async function exportTasks({ startDate, endDate }: ExportOptions): Promise<string> {
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, orderBy('createdAt', 'desc'));
  
  const snapshot = await getDocs(q);
  const data = snapshot.docs
    .map(doc => {
      const taskData = doc.data();
      const completedAt = taskData.completedAt?.toDate();
      
      return {
        bereich: taskData.areaName || '-',
        aufgabe: taskData.task || '-',
        haeufigkeit: taskData.frequency === 'daily' ? 'Täglich' : 
                     taskData.frequency === 'weekly' ? 'Wöchentlich' : 'Monatlich',
        status: taskData.completed ? 'Erledigt' : 'Offen',
        erledigtVon: taskData.completedBy || '-',
        erledigtAm: completedAt ? formatDateTime(completedAt) : '-',
        letztesUpdate: taskData.lastModified ? formatDateTime(taskData.lastModified.toDate()) : '-'
      } as ExportedTask;
    });

  const headers = ['Bereich;Aufgabe;Häufigkeit;Status;Erledigt von;Erledigt am;Letztes Update'];
  const rows = data.map(item => 
    [item.bereich, item.aufgabe, item.haeufigkeit, item.status, item.erledigtVon, item.erledigtAm, item.letztesUpdate].join(';')
  );

  return headers.concat(rows).join('\n');
}