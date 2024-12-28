import { collection, getDocs, query, where, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CHAT_CONFIG } from '../../config/chat';

export async function cleanupOldMessages() {
  try {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - CHAT_CONFIG.MESSAGE_RETENTION_HOURS);
    
    const q = query(
      collection(db, CHAT_CONFIG.COLLECTION_NAME),
      where('timestamp', '<=', Timestamp.fromDate(cutoffTime))
    );
    
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log(`Cleaned up ${snapshot.docs.length} old messages`);
  } catch (error) {
    console.error('Error cleaning up old messages:', error);
  }
}