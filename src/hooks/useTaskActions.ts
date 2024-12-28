import { useState } from 'react';
import { TaskStatus } from '../types/task';
import { updateTask } from '../lib/tasks';
import { sendTaskNotification } from '../lib/email';

export function useTaskActions() {
  const [updating, setUpdating] = useState(false);

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      setUpdating(true);
      const username = localStorage.getItem('username') || 'Unknown';
      
      await updateTask(taskId, {
        status: newStatus,
        completedBy: newStatus === 'completed' ? username : undefined,
        completedAt: newStatus === 'completed' ? new Date() : undefined
      });

      // Send notification for status change
      await sendTaskNotification(taskId, newStatus, username);
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateTaskStatus,
    updating
  };
}