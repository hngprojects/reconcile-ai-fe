import React from 'react'
import { Check } from 'lucide-react'

interface SuccessToastProps {
  message: string
  onClose: () => void
}

export const SuccessToast = ({ message, onClose }: SuccessToastProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-green-100 bg-green-50/80 p-3 shadow-sm dark:border-green-900 dark:bg-green-950/30">
      {' '}
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4 text-green-500" />
        <p className="text-sm text-green-700 dark:text-green-300">{message}</p>
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
