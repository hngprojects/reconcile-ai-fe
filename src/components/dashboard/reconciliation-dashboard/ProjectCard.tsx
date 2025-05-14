'use client'

import { useState, useRef, useEffect } from 'react'
import {
  MoreVertical,
  Eye,
  FileBarChart,
  Trash2,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { ProjectData } from '@/types/recondashboard'
import { useRouter } from 'next/navigation'
import { get_reconcilation_results_by_id, delete_reconcilation } from '@/actions/reconcilation-server'
import { matchedItem, Transaction, Summary } from '@/types/reconciliation'

interface ProjectCardProps {
  project: ProjectData
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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


  const {
    status,
    progress,
    steps,
    totalSteps,
    unreconciled,
    reconciled,
    lastUpdated,
    title,
  } = project

  return (
    <Card className="relative p-6">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex items-center rounded-[16px] px-3 py-1 ${status === 'completed' ? 'bg-[#E4FFF7]' : 'bg-[#FBF4EC]'}`}
        >
          <div
            className={`mr-2 h-2 w-2 rounded-full ${status === 'completed' ? 'bg-[#2e604a]' : 'bg-[#d28e3d]'}`}
          />
          <span
            className={`text-sm ${status === 'completed' ? 'text-[#2e604a]' : 'text-[#d28e3d]'}`}
          >
            {status.replace(status[0], status[0].toUpperCase())}
          </span>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="hover:bg-muted rounded-full p-1"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical className="text-muted-foreground h-5 w-5" />
          </button>
          {showDropdown && (
            <div className="bg-background absolute top-8 right-0 z-10 w-[200px] rounded-md border shadow-lg">
              <div className="py-1">
                <button className="text-foreground hover:bg-muted flex w-full items-center px-4 py-2 text-left text-sm">
                  <Eye className="text-muted-foreground mr-2 h-4 w-4" />
                  View details
                </button>
                {status === 'completed' ? (
                  <button className="text-foreground hover:bg-muted flex w-full items-center px-4 py-2 text-left text-sm">
                    <FileBarChart className="text-muted-foreground mr-2 h-4 w-4" />
                    View summary
                  </button>
                ) : (
                  <button className="text-foreground hover:bg-muted flex w-full items-center px-4 py-2 text-left text-sm" onClick={() => handleContinueReconciliation(project)}>
                    <ArrowRight className="text-muted-foreground mr-2 h-4 w-4" />
                    Continue reconciliation
                  </button>
                )}
                <div className="border-border my-1 border-t"></div>
                <button
                  className="text-destructive hover:bg-muted flex w-full items-center px-4 py-2 text-left text-sm"
                  onClick={async () => {
                    try {
                      // Call delete API
                      const res = await delete_reconcilation(project.id);
                      if (res.status === 'success') {
                        alert('Reconciliation deleted successfully');
                        // Optionally refresh or navigate away
                        router.refresh?.();
                      } else {
                        alert(`Failed to delete: ${res.message}`);
                      }
                    } catch (error) {
                      alert('An error occurred while deleting the reconciliation');
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-foreground mb-4 text-xl font-semibold">{title}</h2>

      <div className="mb-4">
        <div className="mb-1 flex justify-between">
          <span className="text-muted-foreground text-sm">Progress</span>
          {progress && (
            <span className="text-foreground text-sm font-medium">
              {progress}%
            </span>
          )}
        </div>
        <div className="bg-muted h-2 w-full rounded-full">
          <div
            className="h-2 rounded-full bg-[#2e604a]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Steps</p>
          <p className="text-foreground font-medium">
            {steps}/{totalSteps}
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground mb-1 text-sm">Reconciled</p>
          <p className="text-foreground font-medium">{reconciled}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Un-reconciled</p>
          <p className="text-foreground font-medium">{unreconciled}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground mb-1 text-sm">Last updated</p>
          <p className="text-foreground font-medium">{lastUpdated?.toDateString()}</p>
        </div>
      </div>

      {status === 'completed' ? (
        <Button
          variant="outline"
          className="w-full border-[#2e604a] text-[#2e604a] hover:bg-[#e4fff7] dark:border-[#4aad82] dark:text-[#4aad82] dark:hover:bg-[#1a382c] dark:hover:text-[#4aad82] cursor-pointer"
          onClick={() => {
            router.push('/dashboard/reconciliation/summary')
          }}
        >
          View Summary
        </Button>
      ) : (
        <Button
          className="w-full bg-[#2e604a] text-white hover:bg-[#2e604a]/90"
          onClick={() => {
            router.push('/dashboard/reconcile')
          }}
        >
          Continue Reconciliation
        </Button>
      )}
    </Card>
  )
}

function updateFormState(arg0: { reconciliation_id: string; title: string; currentStep: number; processingComplete: boolean; results: { matches: matchedItem[] | undefined; unmatched_ledgers: Transaction[] | undefined; unmatched_statements: Transaction[] | undefined }; summary: Summary | undefined }) {
  throw new Error('Function not implemented.')
}

