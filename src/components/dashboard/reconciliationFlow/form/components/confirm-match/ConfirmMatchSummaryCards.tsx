import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileDownloadIcon,
} from '@/components/Icon/Icons'
import SummaryCard from '../SummaryCard'
import React, { useEffect, useState } from 'react'
import { useReconciliationStore } from '@/store/reconciliation-store';

export interface SummaryCardData {
  title: string,
  value: number,
  description: string,
  icon: React.ReactElement
}

export default function ConfirmMatchSummaryCards() {
  const [cards, setCards] = useState<SummaryCardData[]>([]);
  const { formState } = useReconciliationStore();

  useEffect(() => {
    const cardsData: SummaryCardData[] = [
      {
        title: 'Total Transactions',
        value: formState.summary?.total as number,
        description: '',
        icon: <FileDownloadIcon className="size-7" />
      },
      {
        title: 'Auto-Matched',
        value: formState.summary?.ai_matched as number,
        description: `${((formState.summary?.ai_matched as number) / (formState.summary?.total as number)) * 100}% of total`,
        icon: <CheckCircleIcon className="size-7" />
      },
      {
        title: 'Needs Review',
        value: formState.summary?.totalUnmatched as number,
        description: `${((formState.summary?.totalUnmatched as number) / (formState.summary?.total as number)) * 100}% of total`,
        icon: <AlertCircleIcon className="size-7" />
      }
    ];

    setCards(cardsData);
  }, [formState.summary?.ai_matched, formState.summary?.totalUnmatched, formState.summary?.total])

  return (
    <div className="flex items-stretch gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}
