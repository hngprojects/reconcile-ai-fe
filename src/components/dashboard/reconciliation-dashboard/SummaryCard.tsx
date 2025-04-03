interface SummaryCardProps {
  title: string
  value: string | number
  description: string
}

export default function SummaryCard({
  title,
  value,
  description,
}: SummaryCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-lg border border-black/15 bg-gray-100 p-6">
      <h2 className="font-inter text-xl font-medium text-gray-800">{title}</h2>
      <p className="font-inter text-3xl font-semibold text-gray-800">{value}</p>
      <p className="font-inter text-xs font-medium text-[#475467]">
        {description}
      </p>
    </div>
  )
}
