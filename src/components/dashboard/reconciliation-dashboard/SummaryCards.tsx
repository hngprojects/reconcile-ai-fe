import React from 'react';
import SummaryCard from './SummaryCard';

interface SummaryCardsProps {
  summary: {
    total: number;
    completed: number;
    pending: number;
    totalTransactions: number;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Reconciled Projects',
      value: `${summary.completed}/${summary.total}`,
      description: 'Reconciled projects reconciled this month',
    },
    {
      title: 'Total Transactions',
      value: `₦${summary.totalTransactions}`,
      description: 'Reconciled in May 2025',
    },
    {
      title: 'Pending Projects',
      value: `${summary.pending}`,
      description: 'Unreconciled projects remaining',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:items-center lg:grid-cols-3">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;
