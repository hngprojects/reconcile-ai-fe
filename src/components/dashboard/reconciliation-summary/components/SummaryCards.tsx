import {
  CheckIcon,
  ClockIcon,
  MatchedIcon,
  ShineIcon,
  TransactionIcon,
  XIcon,
} from '@/components/Icon/Icons'
import SummaryCard from './SummaryCard'

export default function SummaryCards() {
  const cards = [
    {
      title: 'Total Transactions',
      value: '5',
      icon: <TransactionIcon className="size-6" />,
    },
    {
      title: 'Matched Transactions',
      value: '3',
      icon: (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#007A55]">
          <CheckIcon className="size-6 text-white" />
        </div>
      ),
    },
    {
      title: 'Unmatched Transactions',
      value: '2',
      icon: (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#EC261F]">
          <XIcon className="size-3 text-white" />
        </div>
      ),
    },
    {
      title: 'Manually Matched',
      value: '1',
      icon: <MatchedIcon className="size-6" />,
    },
    {
      title: 'AI Matched',
      value: '1',
      icon: <ShineIcon className="size-6" />,
    },
    {
      title: 'Time to Complete',
      value: '10 minutes',
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
