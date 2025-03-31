import { UploadProgressProps } from '@/types/upload'
import { CSVIcon } from '../../Icon/Icons'

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4 py-[58px] md:px-[16px]">
      <CSVIcon className="h-10 w-10" />
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <span className="max-w-[150px] truncate text-[14px] text-[#344054] md:max-w-none">
            {fileName}
          </span>
          <span className="text-[14px] text-[#344054]">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-[4px] bg-[#E9ECEF]">
          <div
            className="h-full rounded-[4px] bg-[#2E604A] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
