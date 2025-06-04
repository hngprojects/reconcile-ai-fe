import { useReconcilationsById } from '@/app/queries'
import {
  CheckIcon,
  ClockIcon,
  MatchedIcon,
  ShineIcon,
  TransactionIcon,
  XIcon,
} from '@/components/Icon/Icons'
import { useParams } from 'next/navigation'
import SummaryCard from './SummaryCard'

export default function SummaryCards() {
  const params = useParams()
  const reconciliationId = params.id as string
  const { data } = useReconcilationsById(reconciliationId)

  const cards = [
    {
      title: 'Total Transactions',
      value: data?.summary.total || '0',
      icon: <TransactionIcon className="size-4 md:size-6" />,
    },
    {
      title: 'Matched Transactions',
      value: data?.summary.totalMatched || '0',
      icon: (
        <div className="flex size-4 items-center justify-center rounded-full bg-[#007A55] md:size-6">
          <CheckIcon className="size-4 text-white md:size-6" />
        </div>
      ),
    },
    {
      title: 'Unmatched Transactions',
      value: data?.summary.totalUnmatched || '0',
      icon: (
        <div className="flex size-4 items-center justify-center rounded-full bg-[#EC261F] md:size-6">
          <XIcon className="size-2 text-white md:size-3" />
        </div>
      ),
    },
    {
      title: 'Manually Matched',
      value: data?.summary.manual_matched || '0',
      icon: <MatchedIcon className="size-4 md:size-6" />,
    },
    {
      title: 'AI Matched',
      value: data?.summary.ai_matched || '0',
      icon: <ShineIcon className="size-5 md:size-7" />,
    },
    {
      title: 'Time to Complete',
      value: `${data?.summary.duration.split('.', 1)[0]} minutes` || '0 minute',
      icon: <ClockIcon className="size-4 md:size-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
