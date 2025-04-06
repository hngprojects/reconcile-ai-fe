import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileChartIcon,
} from '@/components/Icon/Icons'
import SummaryCard from './SummaryCard'

export default function SummaryCards() {
  const cards = [
    {
      title: 'Total Transactions',
      value: '6',
      description: '',
      icon: <FileChartIcon className="size-7" />,
    },
    {
      title: 'Auto-Matched',
      value: '0',
      description: '0% of total',
      icon: <CheckCircleIcon className="size-7" />,
    },
    {
      title: 'Needs Review',
      value: '6',
      description: '100% of total',
      icon: <AlertCircleIcon className="size-7" />,
    },
  ]

  return (
    <div className="flex items-stretch gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
