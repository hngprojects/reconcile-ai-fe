export interface UploadCardProps {
  title: string;
  type: "bank" | "ledger";
  files: File[];
  onFilesSelect: (files: File[]) => void;
  onFileDelete: (fileName: string) => void;
  existingFiles?: string[];
}

export interface FileUploadLayoutProps {
  onReconcile: (bankFiles: File[], ledgerFiles: File[]) => Promise<void>;
}

export interface FileItemProps {
  file: File;
  onDelete: (fileName: string) => void;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ErrorMessageProps {
  message?: string;
}
