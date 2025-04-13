'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useImageUpload } from '@/hooks/use-image-upload'
import { Camera, UserRound, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

export const ProfileImage = ({
  onUpload,
}: {
  defaultImage?: string
  onUpload?: (file: File) => void
}) => {
  const { data: session } = useSession()
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    fileName,
  } = useImageUpload({
    onUpload: (file) => onUpload?.(file),
  })

  const userImage = session?.user.avatar
  const imageUrl = previewUrl || userImage

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="size-24">
            <AvatarImage src={imageUrl} className="object-cover" />
            <AvatarFallback>
              <div
                aria-hidden="true"
                className="flex items-center justify-center rounded-full"
              >
                <UserRound className="size-12 opacity-60" strokeWidth={1.5} />
              </div>
            </AvatarFallback>
          </Avatar>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            aria-label="Upload image file"
          />

          {previewUrl && (
            <Button
              onClick={handleRemove}
              size="icon"
              variant="destructive"
              className="border-background absolute top-0 -right-1 size-6 cursor-pointer rounded-full border-2"
              aria-label="Remove image"
            >
              <X size={16} />
            </Button>
          )}

          {!previewUrl && (
            <Button
              variant="ghost"
              onClick={handleThumbnailClick}
              className="bg-primary dark:bg-primary-foreground dark:border-muted-foreground hover:bg-primary/90 absolute -right-1 bottom-0 z-20 h-auto cursor-pointer rounded-full !px-2 shadow-md transition-all duration-200 dark:border"
              aria-label={previewUrl ? 'Change photo' : 'Upload photo'}
            >
              <Camera className="ml-auto rounded-full text-white" />
            </Button>
          )}
        </div>

        {fileName && (
          <p className="text-muted-foreground text-xs">{fileName}</p>
        )}
      </div>

      <div className="sr-only" aria-live="polite" role="status">
        {previewUrl
          ? 'Image uploaded and preview available'
          : 'No image uploaded'}
      </div>
    </div>
  )
}
