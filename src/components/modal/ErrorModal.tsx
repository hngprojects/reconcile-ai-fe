import Image from "next/image";
import { Dialog, DialogContent, DialogClose } from "@/src/components/ui/dialog";
import { X } from "lucide-react"; // Import X icon from lucide-react
import { ErrorModalProps } from "@/src/types/error-modal";
import { getErrorConfig } from "@/src/utils/errorConfig";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onOpenChange,
  errorCode,
  defaultMessage,
}) => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const config = getErrorConfig(errorCode, defaultMessage);

  const clearUploadData = () => {
    localStorage.removeItem("bankStatement");
    localStorage.removeItem("companyLedger");
    localStorage.removeItem("reconciliation");
  };

  const handleButtonClick = () => {
    if (config.buttonAction === "googleSignIn") {
      signInWithGoogle();
    } else {
      onOpenChange(false);
      clearUploadData();

      // Navigate and force reload
      router.push(config.buttonHref);
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="max-w-[535px] p-8"
        aria-describedby="error-modal"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()} 
      >
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
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
          <button
            onClick={handleButtonClick}
            className="bg-[#EAEFED] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex cursor-pointer"
          >
            {config.buttonTitle}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
