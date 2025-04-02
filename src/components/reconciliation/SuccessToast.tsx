import React from 'react'

interface SuccessToastProps {
  message: string
  onClose: () => void
}

export const SuccessToast = ({ message, onClose }: SuccessToastProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 shadow">
      <div className="flex-1">
        <p className="font-medium text-green-800">{message}</p>
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
