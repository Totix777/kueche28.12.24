import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'tasks';

export async function deleteSpecificTask(areaId: string, taskName: string) {
  try {
    // Query for tasks matching the area and task name
    const q = query(
      collection(db, COLLECTION_NAME),
      where('areaId', '==', 'main-kitchen'),
      where('task', '==', 'Bodenreinigung')
    );
    
    const snapshot = await getDocs(q);
    
    // Delete all matching tasks except the newest one
    const docs = snapshot.docs.sort((a, b) => 
      b.data().createdAt.toMillis() - a.data().createdAt.toMillis()
    );
    
    // Keep the first (newest) document, delete the rest
    for (let i = 1; i < docs.length; i++) {
      await deleteDoc(docs[i].ref);
    }
    
    return docs.length - 1; // Number of deleted duplicates
  } catch (error) {
    console.error('Error deleting specific task:', error);
    throw error;
  }
}