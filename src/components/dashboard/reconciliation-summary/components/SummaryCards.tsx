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
      icon: <TransactionIcon className="size-6" />,
    },
    {
      title: 'Matched Transactions',
      value: data?.summary.totalMatched || '0',
      icon: (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#007A55]">
          <CheckIcon className="size-6 text-white" />
        </div>
      ),
    },
    {
      title: 'Unmatched Transactions',
      value: data?.summary.totalUnmatched || '0',
      icon: (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#EC261F]">
          <XIcon className="size-3 text-white" />
        </div>
      ),
    },
    {
      title: 'Manually Matched',
      value: data?.summary.manual_matched || '0',
      icon: <MatchedIcon className="size-6" />,
    },
    {
      title: 'AI Matched',
      value: data?.summary.ai_matched || '0',
      icon: <ShineIcon className="size-6" />,
    },
    {
      title: 'Time to Complete',
      value: `${data?.summary.duration.split('.', 1)[0]} minutes` || '0 minute',
      icon: <ClockIcon className="size-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
