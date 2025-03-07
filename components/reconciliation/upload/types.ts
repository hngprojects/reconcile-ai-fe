export interface UploadCardProps {
  title: string;
  fileUploaded: boolean;
  fileName?: string;
  onFileSelect: (file: File) => void;
  onFileDelete: () => void;
  error?: string;
  uploadProgress?: number;
  isUploading?: boolean;
}

export interface FileUploadLayoutProps {
  onReconcile: () => void;
}

export interface FilePreviewProps {
  fileName: string;
  onDelete: () => void;
}

export interface ErrorMessageProps {
  message?: string;
}
