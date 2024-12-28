import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'tasks';

export async function cleanupDuplicateTasks() {
  try {
    console.log('Starting duplicate task cleanup...');
    
    const tasksQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(tasksQuery);
    
    const uniqueTasks = new Map<string, string>();
    const duplicates: string[] = [];
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const taskKey = `${data.areaId}-${data.task}`;
      
      if (!uniqueTasks.has(taskKey)) {
        uniqueTasks.set(taskKey, doc.id);
      } else {
        duplicates.push(doc.id);
      }
    });
    
    console.log(`Found ${duplicates.length} duplicate tasks`);
    
    for (const docId of duplicates) {
      await deleteDoc(doc(db, COLLECTION_NAME, docId));
    }
    
    console.log('Cleanup completed successfully');
    return duplicates.length;
  } catch (error) {
    console.error('Error cleaning up duplicate tasks:', error);
    throw error;
  }
}