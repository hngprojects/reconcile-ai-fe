import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorToastProps {
  message: string
  onClose: () => void
}

export const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  return (
    <div className="bg-card flex items-center justify-between gap-2 rounded-lg border border-red-200 p-4 shadow-lg dark:border-red-800">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-sm font-medium text-red-800 dark:text-red-200">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full p-1"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
