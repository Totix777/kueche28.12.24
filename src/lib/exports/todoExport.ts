import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ExportOptions, ExportedTodo } from './types';
import { formatDateTime } from './formatters';

export async function exportTodos({ startDate, endDate }: ExportOptions): Promise<string> {
  const todosRef = collection(db, 'todos');
  const q = query(todosRef, orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  const data = snapshot.docs
    .map(doc => {
      const data = doc.data();
      const completedAt = data.completedAt?.toDate();
      const createdAt = data.createdAt.toDate();
      
      if (createdAt < startDate || createdAt > endDate) {
        if (!completedAt || completedAt < startDate || completedAt > endDate) {
          return null;
        }
      }

      return {
        aufgabe: data.text,
        status: data.completed ? 'Erledigt' : 'Offen',
        erledigtVon: data.completedBy || '-',
        erledigtAm: data.completedAt ? formatDateTime(data.completedAt.toDate()) : '-',
        erstelltAm: formatDateTime(createdAt)
      } as ExportedTodo;
    })
    .filter(Boolean);

  const headers = ['Aufgabe;Status;Erledigt von;Erledigt am;Erstellt am'];
  const rows = data.map(item =>
    [item.aufgabe, item.status, item.erledigtVon, item.erledigtAm, item.erstelltAm].join(';')
  );

  return headers.concat(rows).join('\n');
}