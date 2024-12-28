import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {!isOwnMessage && <span>{message.sender}</span>}
        </div>
        <p className="text-sm">{message.text}</p>
        <div className="text-xs mt-1 opacity-75">
          {formatDateTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}