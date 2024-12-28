import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, FileCheck } from 'lucide-react';
import { uploadPDF } from '../services/documentService';

interface PDFUploadProps {
  onUploadComplete: (url: string) => void;
  maxFileSize?: number; // in bytes, default 10MB
}

export function PDFUpload({ onUploadComplete, maxFileSize = 10 * 1024 * 1024 }: PDFUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.includes('pdf')) {
      return 'Nur PDF-Dateien sind erlaubt';
    }
    if (file.size > maxFileSize) {
      return `Datei ist zu groß. Maximale Größe: ${maxFileSize / 1024 / 1024}MB`;
    }
    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      const url = await uploadPDF(file);
      onUploadComplete(url);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Fehler beim Hochladen der Datei');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <label className="block">
              <span className="sr-only">PDF auswählen</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </label>
            <p className="mt-1 text-sm text-gray-500">PDF bis zu {maxFileSize / 1024 / 1024}MB</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {file && !error && (
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Lädt...' : 'Hochladen'}
          </button>
        </div>
      )}
    </div>
  );
}