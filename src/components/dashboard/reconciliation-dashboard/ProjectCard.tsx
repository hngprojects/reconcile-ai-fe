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
            {status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical className="h-5 w-5 text-[#475467]" />
          </button>
          {showDropdown && (
            <div className="absolute top-8 right-0 z-10 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="py-1">
                <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                  <Eye className="mr-2 h-4 w-4 text-[#475467]" />
                  View details
                </button>
                {status === 'completed' ? (
                  <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                    <FileBarChart className="mr-2 h-4 w-4 text-[#475467]" />
                    View summary
                  </button>
                ) : (
                  <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                    <ArrowRight className="mr-2 h-4 w-4 text-[#475467]" />
                    Continue reconciliation
                  </button>
                )}
                <div className="my-1 border-t border-gray-200"></div>
                <button className="flex w-full items-center px-4 py-2 text-left text-sm text-[#e63946] hover:bg-gray-100">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <div className="mb-4">
        <div className="mb-1 flex justify-between">
          <span className="text-sm text-[#475467]">Progress</span>
          {progress && <span className="text-sm font-medium">{progress}%</span>}
        </div>
        <div className="h-2 w-full rounded-full bg-[#f5f5f5]">
          <div
            className="h-2 rounded-full bg-[#2e604a]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-sm text-[#475467]">Steps</p>
          <p className="font-medium">
            {steps}/{totalSteps}
          </p>
        </div>
        {reconciled ? (
          <div className="text-right">
            <p className="mb-1 text-sm text-[#475467]">Reconciled</p>
            <p className="font-medium">{reconciled}</p>
          </div>
        ) : null}
        <div>
          <p className="mb-1 text-sm text-[#475467]">Un-reconciled</p>
          <p className="font-medium">{unreconciled}</p>
        </div>
        {lastUpdated ? (
          <div className="text-right">
            <p className="mb-1 text-sm text-[#475467]">Last updated</p>
            <p className="font-medium">{lastUpdated}</p>
          </div>
        ) : null}
      </div>

      {status === 'completed' ? (
        <Button
          variant="outline"
          className="w-full cursor-pointer border-[#2e604a] text-[#2e604a] hover:bg-[#e4fff7] hover:text-[#2e604a]"
          onClick={() => {
            router.push('/dashboard/reconciliation/summary')
          }}
        >
          View Summary
        </Button>
      ) : (
        <Button
          className="w-full cursor-pointer bg-[#2e604a] text-white hover:bg-[#2e604a]/90"
          onClick={() => {
            router.push('/dashboard/reconciliation-flow')
          }}
        >
          Continue Reconciliation
        </Button>
      )}
    </Card>
  )
}
