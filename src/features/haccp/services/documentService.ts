import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { HACCPDocument } from '../types/haccp';
import { sendHACCPReport } from '../../../lib/email';

const COLLECTION_NAME = 'haccpDocuments';

export async function addHACCPDocument(doc: Omit<HACCPDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...doc,
      createdAt: now,
      updatedAt: now
    });

    // Send notification for new document
    await sendHACCPReport('Dokument', {
      title: doc.title,
      type: doc.type,
      version: doc.version,
      approvedBy: doc.approvedBy
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding HACCP document:', error);
    throw error;
  }
}

export async function getHACCPDocuments(): Promise<HACCPDocument[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('updatedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    })) as HACCPDocument[];
  } catch (error) {
    console.error('Error getting HACCP documents:', error);
    throw error;
  }
}