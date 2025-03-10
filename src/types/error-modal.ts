export interface ErrorModalConfig {
  title: string;
  message: string;
  imageSrc: string;
  buttonTitle: string;
  buttonHref: string;
}

export interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorCode?: number;
  defaultMessage?: string;
}

export interface ErrorUploadModalProps {
  onClose: () => void;
}
