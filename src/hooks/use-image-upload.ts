'use client'

import type React from 'react'
import { useCallback, useRef } from 'react'
import { create } from 'zustand'

interface ImageUploadState {
  previewUrl: string | null
  fileName: string | null
  photoFile: File | null
  setPreviewUrl: (url: string | null) => void
  setFileName: (name: string | null) => void
  setPhotoFile: (file: File | null) => void
  resetState: () => void
}

const useImageUploadStore = create<ImageUploadState>((set) => ({
  previewUrl: null,
  fileName: null,
  photoFile: null,
  setPreviewUrl: (url) => set({ previewUrl: url }),
  setFileName: (name) => set({ fileName: name }),
  setPhotoFile: (file) => set({ photoFile: file }),
  resetState: () => set({ previewUrl: null, fileName: null }),
}))

export function useImageUpload() {
  const {
    previewUrl,
    fileName,
    setPreviewUrl,
    setFileName,
    resetState,
    photoFile,
    setPhotoFile,
  } = useImageUploadStore()
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
        setPhotoFile(file)
      }
    },
    [setPhotoFile, setFileName, setPreviewUrl]
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

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    setPreviewUrl,
    photoFile,
    setPhotoFile,
  }
}
