"use client";
import { useRef, useState } from "react";
import Container from "@/src/components/Container";

const VideoFeature = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <section
      className="relative bg-[#F9FAFB] py-16 px-6 sm:px-12 flex flex-col items-center gap-6"
      style={{
        backgroundImage: "url('/assets/images/video.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="flex flex-col items-center text-center max-w-[327px] w-full sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1232px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
            WHY RECONXI?
          </span>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-[32px] sm:leading-[40px] text-[#101828] pb-8">
            How ReconXI Helps School Finance Teams
          </h2>
        </div>

        {/* Video Section */}
        <div className="relative rounded-xl overflow-hidden shadow-md w-full max-w-[360px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1232px] h-[280px] sm:h-[350px] md:h-[420px] lg:h-[478px]">
          {!isPlaying && (
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
              onClick={handlePlay}
            >
              <div className="bg-white p-4 rounded-full shadow-lg cursor-pointer">
                <svg
                  className="w-10 h-10 text-[#101828]"
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
            className="w-full h-full object-cover"
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
        <button className="bg-[#2E604A] text-white text-base font-medium rounded-md shadow-sm cursor-pointer w-full max-w-[250px] mt-6 sm:mt-8 md:mt-10 flex justify-center items-center gap-4 px-6 py-[18px]">
          Try ReconXi Now
        </button>
      </Container>
    </section>
  );
};

export default VideoFeature;
