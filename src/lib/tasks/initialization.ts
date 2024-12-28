import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Area } from '../../types';

const COLLECTION_NAME = 'tasks';

export async function initializeAreasIfNeeded(initialAreas: Area[]) {
  try {
    // Check if tasks already exist
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (snapshot.size > 0) {
      console.log('Tasks already initialized, skipping...');
      return;
    }
    
    console.log('Initializing tasks...');
    const batch = [];
    
    for (const area of initialAreas) {
      for (const task of area.tasks) {
        batch.push(addDoc(collection(db, COLLECTION_NAME), {
          areaId: area.id,
          areaName: area.name,
          task: task.task,
          frequency: task.frequency,
          completed: false,
          createdAt: Timestamp.now()
        }));
      }
    }
    
    await Promise.all(batch);
    console.log('Tasks initialized successfully');
  } catch (error) {
    console.error('Error initializing tasks:', error);
    throw error;
  }
}