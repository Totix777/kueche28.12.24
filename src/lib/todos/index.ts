import { collection, addDoc, getDocs, query, orderBy, Timestamp, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { TodoItem, TodoUpdate } from './types';
import { transformTodoDoc, isTodoRelevant } from './todoTransforms';

const COLLECTION_NAME = 'todos';

export async function addTodo(text: string) {
  const todoData = {
    text,
    completed: false,
    createdAt: Timestamp.now(),
    completedAt: null,
    completedBy: null
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), todoData);
  return docRef.id;
}

export async function getTodos(): Promise<TodoItem[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(transformTodoDoc)
    .filter(isTodoRelevant);
}

export async function updateTodo(id: string, updates: TodoUpdate) {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, {
    completed: updates.completed,
    completedAt: updates.completed ? Timestamp.now() : null,
    completedBy: updates.completed ? updates.completedBy : null
  });
}

export async function deleteTodo(id: string) {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(todoRef);
}