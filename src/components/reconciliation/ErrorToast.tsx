import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorToastProps {
  message: string
  onClose: () => void
}

export const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-red-100 bg-red-50/80 p-3 shadow-sm dark:border-red-900 dark:bg-red-950/30">
      {' '}
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
      >
        ✕
      </button>
    </div>
  )
}
