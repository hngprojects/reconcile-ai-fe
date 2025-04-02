import Image from 'next/image'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { ErrorModalProps } from '@/types/error-modal'
import { getErrorConfig } from '@/utils/errorConfig'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onOpenChange,
  errorCode,
  defaultMessage,
}) => {
  const router = useRouter()
  const config = getErrorConfig(errorCode, defaultMessage)

  const clearUploadData = () => {
    localStorage.removeItem('bankStatement')
    localStorage.removeItem('companyLedger')
    localStorage.removeItem('reconciliation')
  }

  const handleButtonClick = () => {
    if (config.buttonAction === 'googleSignIn') {
      signIn('google', { redirectTo: '/dashboard' })
    } else {
      onOpenChange(false)
      clearUploadData()
      router.push(config.buttonHref)
      window.location.reload()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="max-w-[535px] p-8"
        aria-describedby="error-modal-description"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="sr-only" id="error-modal-description">
          {config.message || 'Error occurred during operation'}
        </div>
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="flex flex-col items-center justify-between gap-6">
          <Image
            src={config.imageSrc}
            width={100}
            height={100}
            alt="Error icon"
            className="object-cover"
          />
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            {config.title}
          </h2>
          <p
            id="error-description"
            className="text-center text-[#475569]"
            aria-hidden={!config.message}
          >
            {config.message}
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-primary hover:bg-primary/90 flex h-12 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white sm:w-64"
          >
            {config.buttonTitle}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorModal
