import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { sendHACCPTestEmail } from '../../../lib/email';

export function EmailTest() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSendTest = async () => {
    try {
      setSending(true);
      setStatus('idle');
      await sendHACCPTestEmail();
      setStatus('success');
    } catch (error) {
      console.error('Error sending test email:', error);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold dark:text-white">E-Mail Test</h2>
        </div>
        <button
          onClick={handleSendTest}
          disabled={sending}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {sending ? 'Sendet...' : 'Test-E-Mail senden'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-green-600 dark:text-green-400">
          Test-E-Mail wurde erfolgreich versendet!
        </p>
      )}
      
      {status === 'error' && (
        <p className="text-red-600 dark:text-red-400">
          Fehler beim Versenden der Test-E-Mail.
        </p>
      )}
    </div>
  );
}