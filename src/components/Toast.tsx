import { toast } from 'sonner'
import { SuccessToast } from './reconciliation/SuccessToast'
import { ErrorToast } from './reconciliation/ErrorToast'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
}

const Toast = ({ message, type = 'success' }: ToastProps) => {
  return type === 'success' ? (
    <SuccessToast message={message} onClose={() => toast.dismiss()} />
  ) : (
    <ErrorToast message={message} onClose={() => toast.dismiss()} />
  )
}

export default Toast
