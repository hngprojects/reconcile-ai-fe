'use client'
import SummaryCards from './SummaryCards'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CreateModal from './CreateModal'
import Header from './Header'
import ProjectTabs from './ProjectTabs'
import { ProjectData } from '@/types/recondashboard'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { useRouter } from 'next/navigation'

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { updateFormState } = useReconciliationStore();
  const router = useRouter()

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleCreate = (data: any) => {
    updateFormState({ title: data.title });
    console.log('Create project with data:', data)
    return router.push('/dashboard/reconcile');
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-inter text-foreground text-2xl font-semibold">
            Bank Reconciliation
          </h1>
          <p className="font-inter text-muted-foreground text-base font-light">
            Review past reconciliations or start a new one
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap"
        >
          <Plus className="size-5" /> Create New Reconciliation
        </button>
      </div>
      <SummaryCards />
      <Header />
      <ProjectTabs projects={projects} />

      <CreateModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreate}
      />
    </div>
  )
}
