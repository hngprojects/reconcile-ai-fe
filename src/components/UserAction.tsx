'use client'

import { useState } from 'react'
import GoogleAuthModal from '@/components/modal/GoogleAuthModal'
import LoginModal from '@/components/modal/LoginModal'
import UserDetails from '@/components/UserDetails'
import { useSession } from 'next-auth/react'

const UserAction = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleSwitchToSignup = () => {
    setShowLoginModal(false)
    setShowAuthModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowAuthModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      {user ? (
        <UserDetails />
      ) : (
        <>
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="font-inter h-[44px] cursor-pointer rounded-[8px] border-2 border-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-[#2E604A] hover:bg-[#2E604A]/10"
              aria-label="Open login modal"
            >
              <span className="relative bottom-0.5">Login</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="font-inter h-[44px] cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
              aria-label="Open signup modal"
            >
              Sign up
            </button>
          </div>

          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={handleSwitchToSignup}
          />

          <GoogleAuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSwitchToLogin={handleSwitchToLogin}
          />
        </>
      )}
    </>
  )
}

export default UserAction
