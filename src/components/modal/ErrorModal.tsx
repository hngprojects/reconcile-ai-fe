import Image from "next/image";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import Link from "next/link";
import { ErrorModalProps } from "@/src/types/error-modal";
import { getErrorConfig } from "@/src/utils/errorConfig";
import { useAuth } from "@/src/components/context/AuthContext";

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onOpenChange,
  errorCode,
  defaultMessage,
}) => {
  const { signInWithGoogle } = useAuth();
  const config = getErrorConfig(errorCode, defaultMessage);

  const handleButtonClick = () => {
    if (config.buttonAction === "googleSignIn") {
      signInWithGoogle();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[535px] p-8">
        <div className="flex flex-col items-center justify-between gap-6">
          <Image
            src={config.imageSrc}
            width={100}
            height={100}
            alt="Error icon"
            className="object-cover"
          />
          <h2 className="font-bold text-3xl md:text-4xl text-center">
            {config.title}
          </h2>
          <p className="text-[#475569] text-center">{config.message}</p>
          {config.buttonAction === "googleSignIn" ? (
            <button
              onClick={handleButtonClick}
              className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex"
            >
              {config.buttonTitle}
            </button>
          ) : (
            <Link
              className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex"
              href={config.buttonHref}
            >
              {config.buttonTitle}
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
