import React from 'react'
import { Check } from 'lucide-react'

interface SuccessToastProps {
  message: string
  onClose: () => void
}

export const SuccessToast = ({ message, onClose }: SuccessToastProps) => {
  return (
    <div className="bg-card flex items-center justify-between gap-2 rounded-lg border border-green-200 p-4 shadow-lg dark:border-green-800">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-sm font-medium text-green-800 dark:text-green-200">
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
