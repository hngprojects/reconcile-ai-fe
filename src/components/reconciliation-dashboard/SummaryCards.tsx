import SummaryCard from './SummaryCard'

export default function SummaryCards() {
  const cards = [
    {
      title: 'Reconciled Banks',
      value: '2/5',
      description: 'Bank accounts reconciled this month',
    },
    {
      title: 'Total Transactions',
      value: '₦4.2M',
      description: 'Reconciled in March 2025',
    },
    {
      title: 'Pending Matches',
      value: '2',
      description: 'Unmatched transactions remaining',
    },
  ]

  return (
    <div className="flex items-center gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
