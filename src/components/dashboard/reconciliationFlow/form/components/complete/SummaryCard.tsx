import { cn } from '@/lib/utils'

interface SummaryCardProps {
  title: string
  value: string | number
  color?: string
}

export default function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <div className="flex h-[118px] flex-1 items-center justify-center rounded-xl border border-black/15 bg-[#F9FAFB] px-5 py-6">
      <div className="flex w-full flex-col items-center justify-center gap-1 text-[#475467]">
        <p
          className={cn(
            `text-3xl font-semibold text-black`,
            color && `text-[${color}]`
          )}
        >
          {value}
        </p>
        <h5 className="">{title}</h5>
      </div>
    </div>
  )
}
