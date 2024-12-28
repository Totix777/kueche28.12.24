async function exportTasks(startDate: Date, endDate: Date): Promise<string> {
  const tasksRef = collection(db, 'tasks');
  const q = query(
    tasksRef,
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  const data = snapshot.docs
    .map(doc => {
      const taskData = doc.data();
      const completedAt = taskData.completedAt?.toDate();
      // Only include tasks that were either completed in the date range or are not completed
      if (completedAt && (completedAt < startDate || completedAt > endDate)) {
        return null;
      }
      return {
        bereich: taskData.areaName || '-',
        aufgabe: taskData.task || '-',
        haeufigkeit: taskData.frequency === 'daily' ? 'Täglich' : 
                     taskData.frequency === 'weekly' ? 'Wöchentlich' : 'Monatlich',
        status: taskData.completed ? 'Erledigt' : 'Offen',
        erledigtVon: taskData.completedBy || '-',
        erledigtAm: taskData.completedAt ? formatDateTime(taskData.completedAt.toDate()) : '-'
      };
    })
    .filter(Boolean); // Remove null entries

  const headers = ['Bereich;Aufgabe;Häufigkeit;Status;Erledigt von;Erledigt am'];
  const rows = data.map(item => 
    [item.bereich, item.aufgabe, item.haeufigkeit, item.status, item.erledigtVon, item.erledigtAm].join(';')
  );

  return headers.concat(rows).join('\n');
}

async function exportTodos(startDate: Date, endDate: Date): Promise<string> {
  const todosRef = collection(db, 'todos');
  const q = query(
    todosRef,
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs
    .map(doc => {
      const data = doc.data();
      const completedAt = data.completedAt?.toDate();
      // Include todos created in the date range or completed in the date range
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
      };
    })
    .filter(Boolean); // Remove null entries

  const headers = ['Aufgabe;Status;Erledigt von;Erledigt am;Erstellt am'];
  const rows = data.map(item =>
    [item.aufgabe, item.status, item.erledigtVon, item.erledigtAm, item.erstelltAm].join(';')
  );

  return headers.concat(rows).join('\n');
}