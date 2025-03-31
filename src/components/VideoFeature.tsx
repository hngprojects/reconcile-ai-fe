'use client'
import Container from './Container'

const VideoFeature = ({ videoTitle }: { videoTitle: string }) => {
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
              {videoTitle || 'Watch this quick demo to see ReconXi in action.'}
            </h2>
          </div>

          {/* Animated Video Section */}
          <div className="aspect-video w-full max-w-[1024px] overflow-hidden rounded-2xl shadow-lg">
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster="/assets/images/video-thumbnail.png"
            >
              <source src="/assets/video/howItWorks.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default VideoFeature
