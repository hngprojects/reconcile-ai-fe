import { Check } from 'lucide-react'
import { toast } from 'sonner'

const Toast = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Check size={'16px'} className="text-[#008000]" />
        <p className="text-sm text-[#333333]">{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="absolute right-3 cursor-pointer text-[#333333]"
      >
        Close
      </button>
    </div>
  )
}

export default Toast
