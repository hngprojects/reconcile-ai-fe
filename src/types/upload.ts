export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}
export interface UploadProgressProps {
  progress: number;
  fileName: string;
}
