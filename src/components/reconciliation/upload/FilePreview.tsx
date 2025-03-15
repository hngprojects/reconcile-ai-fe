import { FilePreviewProps } from "./types";
import { toast } from "sonner";
import { CheckIcon, CSVIcon, DeleteIcon } from "../../Icon/Icons";

export function FilePreview({ fileName, onDelete }: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
    toast.error("File Deleted", {
      icon: <CheckIcon className="w-5 h-5 text-[#C50700]" />,
      style: {
        background: "#fde3e7",
      },
      action: {
        label: <p className="bg-inherit">Close</p>,
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        onClick={handleDelete}
        className="absolute top-[70px] right-[40px] p-2
         hover:bg-destructive/10 rounded-full transition-colors cursor-pointer
         sm:right-[40px] sm:top-[90px] md:right-[60px] md:top-[110px]
         lg:right-[80px] lg:top-[90px]"
      >
        <DeleteIcon className="w-5 h-5" />
      </button>
      <CSVIcon className="w-10 h-10" />
      <span className="text-[16px] text-[#344054] font-medium truncate max-w-[300px]">
        {fileName}
      </span>
    </div>
  );
}
