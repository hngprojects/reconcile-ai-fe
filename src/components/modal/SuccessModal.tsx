import Image from "next/image";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import Link from "next/link";

interface SuccessModalProps {
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

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onOpenChange,
  title = "Success!",
  message,
  imageSrc = "/check.png",
  imageAlt = "Success icon",
  imageWidth = 100,
  imageHeight = 100,
  buttonTitle = "Close",
  buttonHref = "#",
}) => {
  // Function to handle button click - closes modal and navigates if href provided
  const handleButtonClick = () => {
    // Close the modal if onOpenChange is provided
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

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
          <h2 className="font-bold text-3xl md:text-5xl text-center">
            {title}
          </h2>
          <p className="text-[#475569] text-center">{message}</p>

          {buttonHref ? (
            <Link
              href={buttonHref}
              onClick={handleButtonClick}
              className="bg-blue hover:bg-blue-600 bg-[#14AE5C] text-white px-4 py-2 rounded-md"
            >
              {buttonTitle}
            </Link>
          ) : (
            <button
              onClick={handleButtonClick}
              className="bg-blue hover:bg-blue-600  bg-[#14AE5C] text-white px-4 py-2 rounded-md"
            >
              {buttonTitle}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
