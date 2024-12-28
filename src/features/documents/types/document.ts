export interface Document {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  size: number;
  mimeType: string;
}

export interface DocumentMetadata {
  originalName: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: Date;
}