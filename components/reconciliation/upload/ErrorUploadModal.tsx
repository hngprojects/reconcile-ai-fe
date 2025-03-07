import Image from 'next/image';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ErrorUploadModalProps {
  onClose: () => void;
}

const ErrorUploadModal = ({ onClose }: ErrorUploadModalProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[535px] p-8">
        <div className="flex flex-col items-center justify-between gap-6">
          <h2 className="font-bold text-3xl md:text-5xl">Oops!</h2>
          <Image
            src="/Sad.png"
            width={100}
            height={100}
            alt="Error icon"
            className="object-cover"
          />
          <p className="text-[#475569]">Something went wrong</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorUploadModal;