'use client'
import SummaryCards from './SummaryCards'
import { Plus } from 'lucide-react'

import Link from 'next/link'
import Header from './Header'
import ProjectTabs from './ProjectTabs'
import { ProjectData } from '@/types/recondashboard'
import { useState } from 'react'

export default function ReconDashboard() {
  const [projects] = useState<ProjectData[]>([
    {
      id: '1',
      title: 'Annual Audit Prep',
      status: 'completed',
      progress: 100,
      steps: 6,
      totalSteps: 6,
      unreconciled: 22,
      reconciled: 12,
      lastUpdated: '3 days ago',
    },
    {
      id: '2',
      title: 'Annual Audit Prep',
      status: 'in-progress',
      progress: 65,
      steps: 4,
      totalSteps: 6,
      unreconciled: 22,
      reconciled: 12,
      lastUpdated: '3 days ago',
    },
    {
      id: '3',
      title: 'Annual Audit Prep',
      status: 'in-progress',
      progress: 50,
      steps: 3,
      totalSteps: 6,
      unreconciled: 22,
      reconciled: 12,
      lastUpdated: '3 days ago',
    },
    {
      id: '4',
      title: 'Annual Audit Prep',
      status: 'completed',
      progress: 100,
      steps: 6,
      totalSteps: 6,
      unreconciled: 22,
      reconciled: 12,
      lastUpdated: '3 days ago',
    },
  ])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-inter text-2xl font-semibold text-black">
            Bank Reconciliation
          </h1>
          <p className="font-inter text-base font-light text-black">
            Review past reconciliations or start a new one
          </p>
        </div>

        <Link
          href="/dashboard/reconciliation-flow"
          className="bg-primary hover:bg-primary/90 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium whitespace-nowrap text-white"
        >
          <Plus className="!size-5" /> Start New Reconciliation
        </Link>
      </div>
      <SummaryCards />
      <Header />
      <ProjectTabs projects={projects} />
    </div>
  )
}
