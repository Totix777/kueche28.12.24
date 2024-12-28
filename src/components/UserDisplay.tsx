import React from 'react';
import { User } from 'lucide-react';

export function UserDisplay() {
  const username = localStorage.getItem('username');

  return (
    <div className="flex items-center space-x-2 text-sm">
      <User className="w-4 h-4" />
      <span>{username}</span>
    </div>
  );
}