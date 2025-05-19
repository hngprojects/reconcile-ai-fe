'use client'

import SummaryCards from './SummaryCards'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import CreateModal, { CreateProjectSchema } from './CreateModal'
import Header from './Header'
import ProjectTabs from './ProjectTabs'
import { GeneralSummary, ProjectData } from '@/types/recondashboard'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { getReconciliationsProjects } from '@/lib/api'
import { get_reconcilation_results_by_id } from '@/actions/reconcilation-server'

export default function ReconDashboard() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [summary, setSummary] = useState<GeneralSummary>({
    total: 0,
    completed: 0,
    pending: 0,
    totalTransactions: 0,
  } as GeneralSummary);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { updateFormState, clearStore } = useReconciliationStore()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReconciliationsProjects()
        console.log('API result:', result.data)
        if (typeof result === 'object' && result?.status === 'success' && result?.data) {
          const transformed = transformData(result.data.reconciliations)
          setProjects(transformed)
          setSummary({
            ...result.data.summary,
            totalTransactions: result.data.summary.total_transactions
          })
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

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleCreate = (data: z.infer<typeof CreateProjectSchema>) => {
    clearStore();
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
        status: String(project.status) as 'completed' | 'in-progress' | 'draft' | 'pending' | 'failed',
        progress: Math.ceil((+(project.step as string) / 6) * 100),
        steps: +(project.step as string),
        totalSteps: 6,
        unreconciled: +(project.unmatched as string),
        reconciled: +(project.matches as string),
        lastUpdated: new Date(project.updated_at as string),
      }));
  }

  const handleContinueReconciliation = async (project: ProjectData) => {
    // Update the form state with the project data
    let results = null;
    if (project.steps > 3) {
      results = await get_reconcilation_results_by_id(project.id);
    }
    updateFormState({
      reconciliation_id: project.id,
      title: project.title,
      currentStep: project.steps,
      processingComplete: true,
      results: {
        matches: results?.data?.matches,
        unmatched_ledgers: results?.data?.unmatched_ledgers,
        unmatched_statements: results?.data?.unmatched_statements
      },
      summary: results?.data?.summary
    });

    // Map project steps to navigation steps
    let targetStep = project.steps;

    if (project.steps == 1) {
      targetStep = 2;
    } else if (project.steps == 2 || project.steps == 3) {
      targetStep = 3;
    } else if (project.steps == 4 || project.steps == 7) {
      targetStep = 4;
    } else if (project.steps == 5) {
      targetStep = 5;
    }

    router.push(`/dashboard/reconcile?step=${targetStep}`);
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

        {projects && projects.length > 0 && (projects[0]['status'] != 'failed' as string || projects[0]['status'] != 'completed' as string) ?
          <button
            onClick={() => handleContinueReconciliation(projects[0])}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap"
          >
            Continue Reconciliation
          </button>
          :
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap"
          >
            <Plus className="size-5" /> Create New Reconciliation
          </button>
        }
      </div>

      <SummaryCards
        summary={summary as GeneralSummary}
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