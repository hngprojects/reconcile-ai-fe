import React from 'react'

interface ErrorToastProps {
  message: string
  onClose: () => void
}

export const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 shadow">
      <div className="flex-1">
        <p className="font-medium text-red-800">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  )
}
