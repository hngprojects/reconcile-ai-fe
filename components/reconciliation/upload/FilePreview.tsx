import Image from "next/image";
import csvIcon from "@/public/csvIcon.svg";
import deleteIcon from "@/public/deleteIcon.svg";
import deleteCheckIcon from "@/public/deleteCheckIcon.svg";
import { FilePreviewProps } from "./types";
import { toast } from "sonner";

export function FilePreview({ fileName, onDelete }: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete();
    toast.success("File Deleted", {
      icon: <Image src={deleteCheckIcon} width={20} height={20} alt="Delete" />,
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
        className="absolute top-[90px] right-[65px] p-2 
                   hover:bg-gray-100 rounded-full transition-colors"
      >
        <Image src={deleteIcon} width={20} height={20} alt="Delete" />
      </button>
      <Image src={csvIcon} width={30} height={40} alt="File" />
      <span className="text-[16px] text-[#344054] font-medium truncate max-w-[300px]">
        {fileName}
      </span>
    </div>
  );
}
