import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileDownloadIcon,
} from '@/components/Icon/Icons'
import SummaryCard from '../SummaryCard'

export default function ConfirmMatchSummaryCards() {
  const cards = [
    {
      title: 'Matched',
      value: '2',
      description: '0% of total',
      icon: <CheckCircleIcon className="size-7" />,
    },
    {
      title: 'Unmatched',
      value: '4',
      description: '100% of total',
      icon: <AlertCircleIcon className="size-7" />,
    },
    {
      title: 'New entries',
      value: '0',
      description: '',
      icon: <FileDownloadIcon className="size-7" />,
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
