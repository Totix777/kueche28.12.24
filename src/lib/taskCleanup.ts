import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'tasks';

export async function cleanupDuplicateTasks() {
  try {
    console.log('Starting duplicate task cleanup...');
    
    // Get all tasks ordered by creation date (newest first)
    const tasksQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(tasksQuery);
    
    // Track unique tasks
    const uniqueTasks = new Map<string, string>(); // key -> docId
    const duplicates: string[] = [];
    
    // Find duplicates (keeping the newest version)
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const taskKey = `${data.areaId}-${data.task}`;
      
      if (!uniqueTasks.has(taskKey)) {
        // Keep the first (newest) occurrence
        uniqueTasks.set(taskKey, doc.id);
      } else {
        // Mark older versions as duplicates
        duplicates.push(doc.id);
      }
    });
    
    console.log(`Found ${duplicates.length} duplicate tasks`);
    
    // Delete duplicates
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