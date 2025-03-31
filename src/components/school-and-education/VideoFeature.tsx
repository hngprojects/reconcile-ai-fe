'use client'
import { useRef, useState } from 'react'
import Container from '@/components/Container'

const VideoFeature = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }
  return (
    <section
      className="relative flex flex-col items-center gap-6 bg-[#F9FAFB] px-6 py-16 sm:px-12"
      style={{
        backgroundImage: "url('/assets/images/video.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="flex w-full max-w-[327px] flex-col items-center text-center sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1232px]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-sm font-medium tracking-wide text-gray-500 uppercase">
            WHY RECONXI?
          </span>
          <h2 className="pb-8 text-[24px] leading-[32px] font-semibold text-[#101828] sm:text-[28px] sm:leading-[40px] md:text-[32px]">
            How ReconXI Helps School Finance Teams
          </h2>
        </div>

        {/* Video Section */}
        <div className="relative h-[280px] w-full max-w-[360px] overflow-hidden rounded-xl shadow-md sm:h-[350px] sm:max-w-[640px] md:h-[420px] md:max-w-[900px] lg:h-[478px] lg:max-w-[1232px]">
          {!isPlaying && (
            <button
              className="bg-opacity-50 absolute inset-0 z-10 flex items-center justify-center bg-black"
              onClick={handlePlay}
            >
              <div className="cursor-pointer rounded-full bg-white p-4 shadow-lg">
                <svg
                  className="h-10 w-10 text-[#101828]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            </button>
          )}

          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            playsInline
            poster="/assets/images/video-thumbnail.png"
          >
            <source src="/assets/video/schools.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Call to Action Button */}
        <button className="mt-6 flex w-full max-w-[250px] cursor-pointer items-center justify-center gap-4 rounded-md bg-[#2E604A] px-6 py-[18px] text-base font-medium text-white shadow-sm sm:mt-8 md:mt-10">
          Try ReconXi Now
        </button>
      </Container>
    </section>
  )
}

export default VideoFeature
