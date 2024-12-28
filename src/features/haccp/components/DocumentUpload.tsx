import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (title: string, content: string, version: string) => Promise<void>;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [version, setVersion] = useState('1.0');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !version) return;

    try {
      setLoading(true);
      await onUpload(title, content, version);
      setTitle('');
      setContent('');
      setVersion('1.0');
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Dokumenttitel
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Version
        </label>
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Inhalt
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={6}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        <Upload className="w-5 h-5" />
        <span>{loading ? 'Wird hochgeladen...' : 'Dokument hochladen'}</span>
      </button>
    </form>
  );
}