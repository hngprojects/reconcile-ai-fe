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
            <h2
              className="text-[28px] sm:text-[36px] font-semibold leading-[36px] sm:leading-[44px] tracking-[-0.02em] text-[#101828] text-center mb-3 lg:mb-5 max-w-[768px]"
            >
              See how ReconXi does it!
            </h2>
            <p className="mb-4 lg:mb-[50px] text-[#475467] max-w-[1024px] leading-[36px] text-[24px]">ReconXi helps financial teams, accountants, and banks automate transaction matching, detect discrepancies, and generate financial reports. It eliminates the need for manual reconciliation, saving time and reducing human errors.</p>
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
              <source src="/assets/video/financialvidmain.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoFeature;
