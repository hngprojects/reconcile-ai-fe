import { CSVIcon, DeleteIcon } from '../../Icon/Icons'
import { FileItemProps } from './types'
import { formatFileSize } from '@/utils/fileUtils'

export function FileItem({ file, onDelete }: FileItemProps) {
  return (
    <div className="relative gap-4 rounded-xl border border-[#2A5743] p-4">
      <div className="flex gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-[28px] border-4 border-[#E4FFF7] bg-[#DDF1E9]">
          <CSVIcon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col">
            <span className="truncate text-sm font-medium text-gray-700">
              {file.name}
            </span>
            <span className="text-xs text-gray-500">
              {formatFileSize(file.size)}
            </span>
          </div>

          <button
            onClick={() => onDelete(file.name)}
            className="absolute top-2 right-2 cursor-pointer rounded-full p-1 hover:bg-red-50"
          >
            <DeleteIcon className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
