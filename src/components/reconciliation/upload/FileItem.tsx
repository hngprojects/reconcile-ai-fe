import { CSVIcon, DeleteIcon } from "../../Icon/Icons";
import { FileItemProps } from "./types";
import { formatFileSize } from "@/src/utils/fileUtils";

export function FileItem({ file, onDelete }: FileItemProps) {
  return (
    <div className="gap-4 rounded-xl border border-[#2A5743] p-4 relative">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-[28px] bg-[#DDF1E9] border-4 border-[#E4FFF7] flex items-center justify-center">
          <CSVIcon className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 truncate">
              {file.name}
            </span>
            <span className="text-xs text-gray-500">
              {formatFileSize(file.size)}
            </span>
          </div>

          <button
            onClick={() => onDelete(file.name)}
            className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded-full cursor-pointer"
          >
            <DeleteIcon className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
