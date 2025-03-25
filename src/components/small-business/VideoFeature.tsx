"use client";
import Container from "@/src/components/Container";

const VideoFeature = () => {
  return (
    <section>
      <Container className="py-6 sm:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          {/* Animated Text Section */}
          <div
            className="flex flex-col items-center"
          >
            <span
              className="inline-block mb-3 text-base font-semibold leading-6 text-[#2A5743] rounded-full"
            >
              How it Works
            </span>
            <h2
              className="text-[28px] sm:text-[36px] font-semibold leading-[36px] sm:leading-[44px] tracking-[-0.02em] text-[#101828] text-center mb-8 max-w-[768px]"
            >
              Let&apos;s show you the ReconXi way!
            </h2>
          </div>

          {/* Animated Video Section */}
          <div
            className="w-full aspect-video max-w-[1024px] rounded-2xl overflow-hidden shadow-lg"
          >
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster="/assets/images/video-thumbnail.png"
            >
              <source src="/assets/video/smeVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoFeature;
