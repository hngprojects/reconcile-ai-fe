export interface UploadCardProps {
  title: string;
  fileUploaded: boolean;
  fileName?: string;
  onFileSelect: (file: File) => void;
  onFileDelete: () => void;
  error?: string;
  uploadProgress?: number;
  isUploading?: boolean;
  existingFiles?: string[];
}

export interface FileUploadLayoutProps {
  onReconcile: (file1: File, file2: File) => Promise<void>;
}

export interface FilePreviewProps {
  fileName: string;
  onDelete: () => void;
}

export interface ErrorMessageProps {
  message?: string;
}
