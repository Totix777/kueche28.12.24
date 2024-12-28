import { Timestamp } from 'firebase/firestore';

export function getDateBoundaries() {
  const now = new Date();
  // Set to start of current day (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  // Set to end of current day (23:59:59.999)
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);
  
  return { startOfDay, endOfDay };
}

export function isTaskCompleted(completedAt: Date | null | Timestamp): boolean {
  if (!completedAt) return false;
  
  const { startOfDay, endOfDay } = getDateBoundaries();
  const completionDate = completedAt instanceof Timestamp ? completedAt.toDate() : completedAt;
  
  // Check if completion is within current day
  return completionDate >= startOfDay && completionDate <= endOfDay;
}

export function shouldResetTask(lastModified: Timestamp | null): boolean {
  if (!lastModified) return false;
  
  const { startOfDay } = getDateBoundaries();
  const modifiedDate = lastModified.toDate();
  
  // Return true if last modification was before today
  return modifiedDate < startOfDay;
}