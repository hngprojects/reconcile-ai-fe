'use client'

import { Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Container from './components/Container'
import Footer from './components/Footer'
import EmailSubscribeForm from './components/form/EmailSubscribeForm'
import { Gradient1, Gradient2, Play } from './components/Icons'
import bgImg from './img/bg.png'

const ComingSoonPage = () => {
  const [showBg, setShowBg] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setShowBg(window.innerWidth >= 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const playVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleVideoEnd = () => setIsPlaying(false)
      video.addEventListener('ended', handleVideoEnd)
      return () => video.removeEventListener('ended', handleVideoEnd)
    }
  }, [])

  return (
    <div
      className="font-inter flex min-h-screen flex-col overflow-hidden bg-center"
      style={{
        backgroundImage: `url(${bgImg.src})`,
        backgroundSize: showBg ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative flex h-full w-full flex-1 items-start justify-center sm:items-center">
        <Container className="flex h-full w-full items-center justify-center py-8">
          <Gradient1 />
          <Gradient2 />
          <div className="flex w-9/10 flex-col items-center justify-between gap-8 sm:text-left lg:flex-row">
            <div className="flex max-w-[500px] flex-col gap-6 sm:gap-12">
              <div className="space-y-3">
                <h3 className="font-inter text-4xl font-medium text-black sm:text-5xl">
                  We are creating something amazing
                </h3>
                <p className="font-inter text-black">
                  We will launch our website soon! Be the first to be notified
                  when we go live!
                </p>
              </div>
              <div className="hidden sm:block">
                <EmailSubscribeForm
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
                />
              </div>
            </div>
            <div>
              <div className="relative aspect-video max-w-[450px]">
                <video
                  autoPlay
                  controls
                  playsInline
                  ref={videoRef}
                  className="h-full w-full rounded-lg object-cover shadow-xl"
                  poster="/assets/video/teaser-poster.png"
                >
                  <source src="/assets/video/ReconXi.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={playVideo}
                  className="absolute top-0 right-0 bottom-0 left-0 m-auto w-fit cursor-pointer"
                >
                  {!isPlaying ? (
                    <Play />
                  ) : (
                    <Pause className="text-white opacity-30" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-3 block w-full sm:hidden">
              <EmailSubscribeForm
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default ComingSoonPage
