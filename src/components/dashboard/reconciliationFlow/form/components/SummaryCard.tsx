import { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  value: string | number
  description: string
  icon: ReactNode
}

export default function SummaryCard({
  title,
  value,
  description,
  icon,
}: SummaryCardProps) {
  return (
    <div className="flex h-[135px] flex-1 items-start justify-between gap-5 rounded-xl border border-black/15 bg-[#F9FAFB] px-5 py-6">
      <div className="flex w-full flex-col gap-1 text-[#475467]">
        <h5 className="mb-1 font-medium">{title}</h5>
        <p className="text-3xl font-medium text-black">{value}</p>
        {description && <p className="text-xs">{description}</p>}
      </div>
      <div className="flex h-full shrink-0 items-center justify-center">
        {icon}
      </div>
    </div>
  )
}
