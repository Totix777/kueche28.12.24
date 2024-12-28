import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface FindingStatusButtonProps {
  status: 'open' | 'in-progress' | 'closed';
  onClick: () => void;
  disabled?: boolean;
}

export function FindingStatusButton({ status, onClick, disabled }: FindingStatusButtonProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'open':
        return {
          icon: AlertCircle,
          text: 'Offen',
          className: 'bg-red-100 text-red-700 hover:bg-red-200'
        };
      case 'in-progress':
        return {
          icon: Clock,
          text: 'In Bearbeitung',
          className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        };
      case 'closed':
        return {
          icon: CheckCircle,
          text: 'Abgeschlossen',
          className: 'bg-green-100 text-green-700 hover:bg-green-200'
        };
    }
  };

  const { icon: Icon, text, className } = getStatusInfo();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </button>
  );
}