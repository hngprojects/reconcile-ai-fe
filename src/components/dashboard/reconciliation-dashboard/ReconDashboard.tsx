'use client'

import SummaryCards from './SummaryCards'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import CreateModal, { CreateProjectSchema } from './CreateModal'
import Header from './Header'
import ProjectTabs from './ProjectTabs'
import { ProjectData } from '@/types/recondashboard'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { getReconciliationsProjects } from '@/lib/api'

export default function ReconDashboard() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { updateFormState } = useReconciliationStore()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReconciliationsProjects()
        console.log('API result:', result.data)
        if (typeof result === 'object' && result?.status === 'success' && result?.data) {
          const transformed = transformData(result.data.projects)
          setProjects(transformed)
        } else {
          setError(result.message || 'Failed to load reconciliations')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'An unexpected error occurred')
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // USE THIS TO TEST THE UI WITHOUT BACKEND

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Simulate network delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // Dummy data that matches the backend response structure
  //       const dummyResult = {
  //         status: 'success',
  //         data: {
  //           reconciliations: [
  //             {
  //               id: '1',
  //               title: 'March Bank Reconciliation',
  //               status: 'completed',
  //               progress: 100,
  //               steps: 10,
  //               totalSteps: 10,
  //               unreconciled: 0,
  //               reconciled: 10,
  //               lastUpdated: '2025-05-01',
  //             },
  //             {
  //               id: '2',
  //               title: 'April Bank Reconciliation',
  //               status: 'in-progress',
  //               progress: 30,
  //               steps: 3,
  //               totalSteps: 10,
  //               unreconciled: 7,
  //               reconciled: 3,
  //               lastUpdated: '2025-05-02',
  //             },
  //           ],
  //           summary: {
  //             total: 2,
  //             completed: 1,
  //             pending: 1,
  //             total_transactions: 20,
  //           },
  //         },
  //       }

  //       const transformed = transformData(dummyResult.data.reconciliations)
  //       setProjects(transformed)
  //     } catch (err: any) {
  //       setError(err.message || 'An unexpected error occurred')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleCreate = (data: z.infer<typeof CreateProjectSchema>) => {
    updateFormState({ title: data.title })
    return router.push('/dashboard/reconcile')
  }

  // Fixed the transformData function to properly filter out null values before returning
  const transformData = (rawProjects: unknown[] | undefined): ProjectData[] => {
    if (!rawProjects) return []
    
    // First filter out invalid projects, then map the valid ones to ProjectData
    return rawProjects
      .filter((project): project is Record<string, unknown> => 
        typeof project === 'object' && 
        project !== null && 
        'id' in project && 
        'title' in project && 
        'status' in project
      )
      .map((project) => ({
        id: String(project.id),
        title: String(project.title),
        status: String(project.status) as 'completed' | 'in-progress',
        progress: typeof project.progress === 'number' ? project.progress : 0,
        steps: typeof project.steps === 'number' ? project.steps : 0,
        totalSteps: typeof project.totalSteps === 'number' ? project.totalSteps : 0,
        unreconciled: typeof project.unreconciled === 'number' ? project.unreconciled : 0,
        reconciled: typeof project.reconciled === 'number' ? project.reconciled : 0,
        lastUpdated: typeof project.lastUpdated === 'string' ? project.lastUpdated : 'N/A',
      }));
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

      <SummaryCards
        summary={{
          total: projects.length,
          completed: projects.filter((p) => p.status === 'completed').length,
          pending: projects.filter((p) => p.status === 'in-progress').length,
          totalTransactions: projects.reduce((sum, p) => sum + p.totalSteps, 0),
        }}
      />

      <Header />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          <p className="text-muted-foreground text-sm">
            Loading, please wait...
          </p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
          {/* <img src="/empty-reconciliation-icon.svg" alt="No reconciliations" className="w-32 h-32" /> */}
          <h2 className="text-muted-foreground text-lg font-semibold">
            No reconciliations found
          </h2>
          <p className="text-muted-foreground text-center text-sm">
          Start a new project below to begin managing your financial data.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium"
          >
            <Plus className="size-5" /> Create New Reconciliation
          </button>
        </div>
      ) : (
        <ProjectTabs projects={projects} isLoading={isLoading} error={error} />
      )}

      <CreateModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreate}
      />
    </div>
  )
}