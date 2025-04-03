'use client'

import { useRef, useState } from 'react'
import Container from './Container'
import { PlayIcon, MobilePlayIcon } from '@/components/Icon/Icons'

const VideoFeature = ({ videoTitle }: { videoTitle?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section>
      <Container className="py-6 sm:py-12">
        <div className="flex w-full flex-col items-center justify-center">
          {/* Animated Text Section */}
          <div className="flex flex-col items-center">
            <span className="mb-3 inline-block rounded-full text-base leading-6 font-semibold text-[#2A5743]">
              How it Works
            </span>
            <h2 className="mb-8 max-w-[768px] text-center text-[28px] leading-[36px] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[36px] sm:leading-[44px]">
              {videoTitle || 'See how ReconXi does it!.'}
            </h2>
          </div>

          {/* Video Section */}
          <div className="relative aspect-video w-full max-w-[1024px] overflow-hidden rounded-2xl shadow-lg">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              onClick={toggleVideoPlayback}
              preload="metadata"
              playsInline
              poster="/assets/images/video-thumbnail.png"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/assets/video/howItWorks.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <div
                onClick={toggleVideoPlayback}
                className="absolute inset-0 flex cursor-pointer items-center justify-center"
              >
                {/* PlayIcon for large screens */}
                <div className="hidden lg:block">
                  <PlayIcon />
                </div>

                <div className="block lg:hidden">
                  <MobilePlayIcon />
                </div>
              </div>
            )}

            {isPlaying && (
              <div
                onClick={toggleVideoPlayback}
                className="absolute inset-0 flex cursor-pointer items-center justify-center"
              ></div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default VideoFeature
