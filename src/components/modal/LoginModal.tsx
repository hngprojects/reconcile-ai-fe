import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { GoogleIcon, LogoIcon } from '../Icon/Icons'
import { signIn } from 'next-auth/react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        closeButton={false}
        className="mx-auto h-auto w-[90%] rounded-[12px] border-none bg-white p-0 md:!max-w-[535px]"
      >
        <button
          title="close modal"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 md:top-6 md:right-6"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6 md:py-[76px]">
          <div className="flex flex-col items-center gap-4">
            <LogoIcon className="h-9 w-9 sm:h-12 sm:w-12" />
            <h2 className="font-baloo -mt-4 text-2xl leading-none font-extrabold text-[#2E604A] md:text-[28px]">
              ReconXi
            </h2>
            <h3 className="font-inter text-[28px] leading-[120%] font-semibold text-[#141414]">
              Welcome Back!
            </h3>
            <p className="font-openSans max-w-[400px] text-center text-[14px] leading-[140%] text-[#475569]">
              Access your financial data and manage your reconciliations. Log in
              to continue optimizing your workflow!
            </p>
          </div>

          <button
            onClick={() => signIn('google', { redirectTo: '/dashboard' })}
            className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border border-[#CBD5E1] px-4 py-2 transition-colors hover:bg-gray-50 disabled:opacity-50 md:h-[64px] md:w-[487px]"
          >
            <GoogleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm font-medium text-[#475569] md:text-base">
              Login with Google
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-inter text-[13px] leading-[120%] font-semibold text-[#525252]">
              Don&apos;t Have an Account?
            </span>
            <button
              onClick={onSwitchToSignup}
              className="font-inter cursor-pointer text-[13px] leading-[120%] font-bold text-[#2E604A] hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
