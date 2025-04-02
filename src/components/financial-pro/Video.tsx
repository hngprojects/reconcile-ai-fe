'use client'
import Container from '@/components/Container'

const VideoFeature = () => {
  return (
    <section>
      <Container className="py-6 sm:py-12">
        <div className="flex w-full flex-col items-center justify-center">
          {/* Animated Text Section */}
          <div className="flex flex-col items-center">
            <h2 className="mb-3 max-w-[768px] text-center text-[28px] leading-[36px] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[36px] sm:leading-[44px] lg:mb-5">
              See how ReconXi does it!
            </h2>
            <p className="mb-4 max-w-[1024px] text-[18px] leading-[36px] text-[#475467] lg:mb-[50px]">
              ReconXi helps financial teams, accountants, and banks automate
              transaction matching, detect discrepancies, and generate financial
              reports. It eliminates the need for manual reconciliation, saving
              time and reducing human errors.
            </p>
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
              <source
                src="/assets/video/financialvidmain.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default VideoFeature
