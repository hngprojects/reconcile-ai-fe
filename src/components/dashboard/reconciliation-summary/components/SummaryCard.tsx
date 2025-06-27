import { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  value: string | number
  icon: ReactNode
}

export default function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-xl border border-black/15 bg-[#F9FAFB] px-5 py-6">
      <div className="flex h-full shrink-0 items-start justify-center">
        {icon}
      </div>
      <div className="flex w-full flex-col gap-0.5 text-[#333]">
        <h5 className="font-medium md:text-lg">{title}</h5>
        <p className="text-lg font-semibold md:text-xl">{value}</p>
      </div>
    </div>
  )
}
