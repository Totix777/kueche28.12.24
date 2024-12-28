import { collection, addDoc, getDocs, query, orderBy, Timestamp, limit, where, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChatMessage } from '../types/chat';

const COLLECTION_NAME = 'chat';
const MESSAGE_LIMIT = 50;
const MESSAGE_RETENTION_HOURS = 48;

export async function sendMessage(text: string, sender: string): Promise<string> {
  // Clean up old messages before adding new ones
  await cleanupOldMessages();
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    text,
    sender,
    timestamp: Timestamp.now()
  });
  return docRef.id;
}

export async function getMessages(): Promise<ChatMessage[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('timestamp', 'desc'),
    limit(MESSAGE_LIMIT)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: (doc.data().timestamp as Timestamp).toDate()
  })) as ChatMessage[];
}

async function cleanupOldMessages() {
  try {
    // Calculate timestamp for 48 hours ago
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - MESSAGE_RETENTION_HOURS);
    
    const q = query(
      collection(db, COLLECTION_NAME),
      where('timestamp', '<=', Timestamp.fromDate(cutoffTime))
    );
    
    const snapshot = await getDocs(q);
    
    // Delete old messages
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log(`Cleaned up ${snapshot.docs.length} old messages`);
  } catch (error) {
    console.error('Error cleaning up old messages:', error);
  }
}