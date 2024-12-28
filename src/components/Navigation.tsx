import React from 'react';
import { Home, ClipboardList, Thermometer, Apple, ShoppingCart, ShieldCheck, Book } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ExportButton } from './ExportButton';
import { LogoutButton } from './LogoutButton';
import { UserDisplay } from './UserDisplay';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Start', icon: Home },
    { id: 'tasks', label: 'Aufgaben', icon: ClipboardList },
    { id: 'coolers', label: 'Kühlhäuser', icon: Thermometer },
    { id: 'food', label: 'Speise', icon: Apple },
    { id: 'orders', label: 'Bestellung', icon: ShoppingCart },
    { id: 'haccp', label: 'HACCP', icon: ShieldCheck },
    { id: 'manual', label: 'Handbuch', icon: Book },
  ];

  return (
    <nav className="bg-red-700 dark:bg-red-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
                    currentSection === item.id
                      ? 'bg-red-800 dark:bg-red-950'
                      : 'hover:bg-red-600 dark:hover:bg-red-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center space-x-2">
            <UserDisplay />
            <ExportButton />
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}