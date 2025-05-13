import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileChartIcon,
} from '@/components/Icon/Icons'
import SummaryCard from '../SummaryCard'
import React, { useEffect, useState } from 'react'
import { useReconciliationStore } from '@/store/reconciliation-store';
import { SummaryCardData } from '../confirm-match/ConfirmMatchSummaryCards';

export default function MatchTransactionSummaryCards() {
  const [cards, setCards] = useState<SummaryCardData[]>([]);
  const { formState } = useReconciliationStore();

  useEffect(() => {
    const cardsData: SummaryCardData[] = [
      {
        title: 'Total Transactions',
        value: formState.summary?.total as number,
        description: '',
        icon: <FileChartIcon className="size-7" />
      },
      {
        title: 'Auto-Matched',
        value: formState.summary?.ai_matched as number,
        description: `${Math.ceil((formState.summary?.ai_matched as number) / (formState.summary?.total as number) || 0) * 100}% of total`,
        icon: <CheckCircleIcon className="size-7" />
      },
      {
        title: 'Needs Review',
        value: formState.summary?.totalUnmatched as number,
        description: `${Math.ceil((formState.summary?.totalUnmatched as number) / (formState.summary?.total as number) || 0) * 100}% of total`,
        icon: <AlertCircleIcon className="size-7" />
      }
    ];

    setCards(cardsData);
  }, [])

  return (
    <div className="flex items-stretch gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
