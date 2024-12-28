import { Area } from '../../types';
import { TaskData } from './types';
import { isTaskCompleted } from './dateUtils';
import { Timestamp } from 'firebase/firestore';

export function transformToAreas(taskDocs: Array<{ id: string; data: () => TaskData }>): Area[] {
  const tasksByArea = new Map<string, Area>();
  const taskIds = new Set<string>();

  taskDocs.forEach(doc => {
    const data = doc.data();
    const areaId = data.areaId;
    const taskId = doc.id;
    
    const taskKey = `${areaId}-${data.task}`;
    if (taskIds.has(taskKey)) return;
    taskIds.add(taskKey);
    
    if (!tasksByArea.has(areaId)) {
      tasksByArea.set(areaId, {
        id: areaId,
        name: data.areaName,
        tasks: []
      });
    }
    
    const area = tasksByArea.get(areaId)!;
    const completedAt = data.completedAt instanceof Timestamp ? data.completedAt : null;
    const completed = isTaskCompleted(completedAt);

    area.tasks.push({
      id: taskId,
      area: data.areaName,
      task: data.task,
      frequency: data.frequency,
      completed,
      completedBy: completed ? data.completedBy : undefined,
      completedAt: completed && completedAt ? completedAt.toDate() : undefined
    });
  });
  
  return Array.from(tasksByArea.values());
}