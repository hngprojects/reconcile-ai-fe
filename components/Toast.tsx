import { Check } from 'lucide-react'
import { toast } from 'sonner';  

const Toast = ({message}:{message: string}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Check size={"16px"} className='text-[#008000]' />
            <p className='text-[#333333] text-sm'>{message}</p>
        </div>
        <button onClick={() => toast.dismiss()} className='text-[#333333] absolute right-3 cursor-pointer'>Close</button>
    </div>
  )
}

export default Toast