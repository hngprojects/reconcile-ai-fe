'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import LoginModal from '../modal/LoginModal'
import GoogleAuthModal from '../modal/GoogleAuthModal'
import { useSession } from 'next-auth/react'

interface TypeWriterButtonProps {
  className?: string
  'aria-label'?: string
  text: string
  path: string
}

export default function TypeWriterButton({
  className,
  'aria-label': ariaLabel,
  text,
  path,
}: TypeWriterButtonProps) {
  const router = useRouter()
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(path)
    } else {
      setShowLoginModal(true)
    }
  }

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
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.05,
          backgroundColor: '#1E6741', // Subtle color change on hover
        }}
        whileTap={{ scale: 0.95 }}
        className={
          className ||
          'inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-md bg-[#297B65] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#297B65]/90 focus:ring-2 focus:ring-[#297B65] focus:ring-offset-2 focus:outline-none sm:w-auto'
        }
        aria-label={ariaLabel || text}
      >
        {/* Show loading spinner if isLoading is true */}
        {isHovered ? (
          <Typewriter
            words={[text]}
            loop={1}
            cursor={false}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        ) : (
          text
        )}
      </motion.button>

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
  )
}
