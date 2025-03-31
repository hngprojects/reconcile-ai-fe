import { cn } from '@/lib/utils'
import { StatusBadgeProps } from '@/types/status-badge'
import { CheckIcon, XIcon } from '../Icon/Icons'

export function StatusBadge({
  matched,
  className,
  matchScore,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-1 text-sm font-semibold',
        matched
          ? 'bg-[#F3FEFA] text-[#007A55] group-hover:bg-[#CEFFED]'
          : 'bg-[#FFF4F0] text-[#C50700]',
        className
      )}
    >
      {matchScore ? `${matchScore}%` : matchScore}{' '}
      {matched ? 'Matched' : 'Unmatched'}
      <div
        className={cn(
          'ml-2 flex h-4 w-4 items-center justify-center rounded-full',
          matched ? 'bg-[#007A55]' : 'bg-[#C50700]'
        )}
      >
        {matched ? (
          <>
            <CheckIcon className="h-4 w-4 text-white max-md:group-hover:hidden" />
            <XIcon className="hidden h-2.5 w-2.5 text-white max-md:group-hover:block" />
          </>
        ) : (
          <XIcon className="h-2.5 w-2.5 text-white" />
        )}
      </div>
    </div>
  )
}
