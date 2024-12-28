import React from 'react';
import { FileText, Download } from 'lucide-react';
import { HACCPDocument } from '../types/haccp';

interface DocumentListProps {
  documents: HACCPDocument[];
  onDownload: (doc: HACCPDocument) => void;
}

export function DocumentList({ documents, onDownload }: DocumentListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-medium dark:text-white">{doc.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Version {doc.version} • Aktualisiert am {formatDate(doc.updatedAt)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDownload(doc)}
              className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-300"
              title="Herunterladen"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}