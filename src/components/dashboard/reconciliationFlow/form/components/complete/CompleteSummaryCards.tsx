import SummaryCard from './SummaryCard'

export default function CompleteSummaryCards() {
  const cards = [
    {
      title: 'Transactions Matched',
      value: '2',
      color: '#4CAF50',
    },
    {
      title: 'Transactions Unmatched',
      value: '4',
      color: '#E63946',
    },
    {
      title: 'New Entries Added',
      value: '0',
    },
  ]

  return (
    <div className="flex w-full items-stretch gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
