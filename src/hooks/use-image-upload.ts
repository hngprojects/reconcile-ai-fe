'use client'

import type React from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { create } from 'zustand'

interface ImageUploadState {
  previewUrl: string | null
  fileName: string | null
  setPreviewUrl: (url: string | null) => void
  setFileName: (name: string | null) => void
  resetState: () => void
}

const useImageUploadStore = create<ImageUploadState>((set) => ({
  previewUrl: null,
  fileName: null,
  setPreviewUrl: (url) => set({ previewUrl: url }),
  setFileName: (name) => set({ fileName: name }),
  resetState: () => set({ previewUrl: null, fileName: null }),
}))

interface UseImageUploadProps {
  onUpload?: (file: File) => void
}

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const { previewUrl, fileName, setPreviewUrl, setFileName, resetState } =
    useImageUploadStore()
  const previewRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        previewRef.current = url
        onUpload?.(file)
      }
    },
    [onUpload, setFileName, setPreviewUrl]
  )

  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    resetState()
    previewRef.current = null
    resetFileInput()
  }, [previewUrl, resetState, resetFileInput])

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
      }
    }
  }, [])

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    setPreviewUrl,
  }
}
