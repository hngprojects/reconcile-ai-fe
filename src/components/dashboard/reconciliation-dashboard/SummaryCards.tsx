import SummaryCard from './SummaryCard'

export default function SummaryCards() {
  const cards = [
    {
      title: 'Reconciled Projects',
      value: '2/4',
      description: 'Reconciled projects reconciled this month',
    },
    {
      title: 'Total Transactions',
      value: '₦4.2M',
      description: 'Reconciled in March 2025',
    },
    {
      title: 'Pending Projects',
      value: '2',
      description: 'Unreconciled projects remaining',
    },
  ]

  return (
    // <div className="flex h-full flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
    <div className="grid gap-4 sm:grid-cols-2 sm:items-center lg:grid-cols-3">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
