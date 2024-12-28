import { collection, doc, getDocs, updateDoc, addDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Area } from '../types';
import { isToday } from './utils/dateUtils';

const COLLECTION_NAME = 'tasks';

export async function fetchTasks(): Promise<Area[]> {
  try {
    const tasksQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(tasksQuery);
    
    const tasksByArea = new Map<string, Area>();
    const taskIds = new Set<string>();

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const areaId = data.areaId;
      const taskId = doc.id;
      
      // Skip duplicates
      const taskKey = `${areaId}-${data.task}`;
      if (taskIds.has(taskKey)) return;
      taskIds.add(taskKey);
      
      if (!tasksByArea.has(areaId)) {
        tasksByArea.set(areaId, {
          id: areaId,
          name: data.areaName,
          tasks: []
        });
      }
      
      const area = tasksByArea.get(areaId)!;
      const completedAt = data.completedAt?.toDate();

      // Task is only considered completed if it was completed today
      const isCompleted = completedAt && isToday(completedAt);

      area.tasks.push({
        id: taskId,
        area: data.areaName,
        task: data.task,
        frequency: data.frequency,
        completed: isCompleted,
        completedBy: isCompleted ? data.completedBy : undefined,
        completedAt: isCompleted ? completedAt : undefined,
        lastModified: data.lastModified?.toDate()
      });
    });
    
    return Array.from(tasksByArea.values());
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function updateTask(areaId: string, taskId: string, updates: { completed: boolean; completedBy: string }) {
  try {
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await updateDoc(taskRef, {
      completed: updates.completed,
      completedBy: updates.completed ? updates.completedBy : null,
      completedAt: updates.completed ? Timestamp.now() : null,
      lastModified: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Rest of the file remains the same...