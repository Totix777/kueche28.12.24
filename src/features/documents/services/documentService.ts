import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_MIME_TYPES = ['application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePDF(file: File): ValidationResult {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Ungültiges Dateiformat. Nur PDF-Dateien sind erlaubt.'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `Datei ist zu groß. Maximale Größe: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  return { isValid: true };
}

export async function uploadPDF(file: File): Promise<string> {
  const validation = validatePDF(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    // Generate a unique filename
    const filename = `${uuidv4()}.pdf`;
    const storageRef = ref(storage, `documents/${filename}`);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw new Error('Fehler beim Hochladen der Datei');
  }
}