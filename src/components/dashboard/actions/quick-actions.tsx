'use client'
import React, { useState } from 'react'

interface PopupProps {
  title: string
  content: React.ReactNode
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{content}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const PopupExample = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <div className="p-8">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Open Popup button
      </button>

      {isPopupOpen && (
        <Popup
          title="Sample Popup"
          content={
            <div>
              <p>
                Report successfully generated, wait patiently to recieve it in
                your mail
              </p>
            </div>
          }
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  )
}

export default PopupExample
