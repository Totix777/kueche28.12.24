import { useState, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessage, getMessages } from '../services/chatService';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      setError('Fehler beim Laden der Nachrichten');
    } finally {
      setLoading(false);
    }
  };

  const sendNewMessage = async (text: string) => {
    const username = localStorage.getItem('username') || 'Unbekannt';
    try {
      await sendMessage(text, username);
      await loadMessages();
    } catch (err) {
      setError('Fehler beim Senden der Nachricht');
    }
  };

  return { messages, loading, error, sendMessage: sendNewMessage };
}