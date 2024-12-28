import React from 'react';
import { LogOut } from 'lucide-react';
import { logout } from '../lib/auth';

export function LogoutButton() {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-1 p-2 hover:bg-red-600 rounded-md transition-colors"
      title="Abmelden"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}