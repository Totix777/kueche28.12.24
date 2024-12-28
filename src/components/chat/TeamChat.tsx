import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from './ChatMessage';

export function TeamChat() {
  const { messages, loading, error, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem('username');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold dark:text-white">Team Chat</h2>
      </div>

      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Lädt Nachrichten...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Noch keine Nachrichten
          </div>
        ) : (
          messages
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
            .map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.sender === username}
              />
            ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}