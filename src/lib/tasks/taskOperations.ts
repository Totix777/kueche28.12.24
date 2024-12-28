import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { TaskUpdate } from './types';

const COLLECTION_NAME = 'tasks';

export async function updateTask(taskId: string, updates: TaskUpdate) {
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