import Image from 'next/image';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from 'next/link';

interface ErrorModalProps {
  open: boolean; 
  onOpenChange?: (open: boolean) => void; 
  title: string; 
  message: string; 
  imageSrc?: string; 
  imageAlt?: string; 
  imageWidth?: number; 
  imageHeight?: number; 
  buttonTitle: string;
  buttonHref?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onOpenChange,
  title = "Oops",
  message,
  imageSrc = "/Sad.png",
  imageAlt = "Error icon",
  imageWidth = 100,
  imageHeight = 100,
  buttonTitle = "close",
  buttonHref = "#",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>      
      <DialogContent className="max-w-[535px] p-8">
        <div className="flex flex-col items-center justify-between gap-6">
          <Image
            src={imageSrc}
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt}
            className="object-cover"
          />
          <h2 className="font-bold text-3xl md:text-5xl text-center">{title}</h2>
          <p className="text-[#475569]">{message}</p>
          <Link
            className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex"
            href={buttonHref}
          >
            {buttonTitle}
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
