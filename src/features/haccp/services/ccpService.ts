import { collection, addDoc, getDocs, query, orderBy, Timestamp, where } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { CCPRecord } from '../types/haccp';

const COLLECTION_NAME = 'ccpRecords';

export async function addCCPRecord(record: Omit<CCPRecord, 'id' | 'date'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...record,
      date: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding CCP record:', error);
    throw error;
  }
}

export async function getCCPRecords(startDate: Date, endDate: Date): Promise<CCPRecord[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: (doc.data().date as Timestamp).toDate()
    })) as CCPRecord[];
  } catch (error) {
    console.error('Error getting CCP records:', error);
    throw error;
  }
}