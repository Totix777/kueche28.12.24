import { collection, addDoc, getDocs, query, orderBy, Timestamp, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CHAT_CONFIG } from '../../config/chat';
import { ChatMessage } from '../../types/chat';

export async function sendMessage(text: string, sender: string): Promise<string> {
  const docRef = await addDoc(collection(db, CHAT_CONFIG.COLLECTION_NAME), {
    text,
    sender,
    timestamp: Timestamp.now()
  });
  return docRef.id;
}

export async function getMessages(): Promise<ChatMessage[]> {
  const q = query(
    collection(db, CHAT_CONFIG.COLLECTION_NAME),
    orderBy('timestamp', 'desc'),
    limit(CHAT_CONFIG.MESSAGE_LIMIT)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: (doc.data().timestamp as Timestamp).toDate()
  })) as ChatMessage[];
}