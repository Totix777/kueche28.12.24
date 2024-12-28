import { TodoItem } from './types';
import { Timestamp } from 'firebase/firestore';

export function transformTodoDoc(doc: any): TodoItem {
  const data = doc.data();
  return {
    id: doc.id,
    text: data.text,
    completed: data.completed,
    createdAt: (data.createdAt as Timestamp).toDate(),
    completedAt: data.completedAt ? (data.completedAt as Timestamp).toDate() : null,
    completedBy: data.completedBy
  };
}

export function isTodoRelevant(todo: TodoItem): boolean {
  if (!todo.completed) return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return todo.completedAt ? todo.completedAt >= today : false;
}