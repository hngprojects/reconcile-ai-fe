import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";
import Image from "next/image";
import starIcon from "@/public/assets/images/star-icon.png";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export function UploadModal({ isOpen, progress }: UploadModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="max-w-[400px] flex flex-col h-auto items-center justify-center"
        closeButton={false}
      >
        <div className="bg-white w-[90%] max-md:mx-auto md:w-[436px] h-[213px] rounded-[12px] flex flex-col items-center justify-between p-8">
          <Image
            src={starIcon}
            width={24}
            height={24}
            alt="star-icon"
            className="object-cover"
          />
          <h2 className="text-[#0F172A] font-semibold text-lg md:text-xl text-center">
            Processing Reconciliation
          </h2>
          <p className="text-sm text-[#475569] text-center">
            Please wait while AI does the magic
          </p>
          <p className="text-[#47556999] text-xs">
            Matching records, it will be with you shortly.
          </p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500">{progress}% Complete</p>
        </div>
      </DialogContent>
    </Dialog>

  );
}

export default UploadModal;
