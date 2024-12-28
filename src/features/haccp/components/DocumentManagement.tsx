import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { DocumentList } from './DocumentList';
import { DocumentUpload } from './DocumentUpload';
import { HACCPDocument } from '../types/haccp';
import { addHACCPDocument, getHACCPDocuments } from '../services/haccpService';

export function DocumentManagement() {
  const [documents, setDocuments] = useState<HACCPDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getHACCPDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (title: string, content: string, version: string) => {
    await addHACCPDocument({
      type: 'procedure',
      title,
      content,
      version
    });
    await loadDocuments();
    setShowUpload(false);
  };

  const handleDownload = (doc: HACCPDocument) => {
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}_v${doc.version}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold dark:text-white">HACCP Dokumente</h2>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {showUpload ? 'Abbrechen' : 'Neues Dokument'}
        </button>
      </div>

      {showUpload ? (
        <DocumentUpload onUpload={handleUpload} />
      ) : loading ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Lädt Dokumente...
        </div>
      ) : (
        <DocumentList documents={documents} onDownload={handleDownload} />
      )}
    </div>
  );
}