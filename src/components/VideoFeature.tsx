"use client";
import { useState, useRef } from "react";
import { PlayCircle } from "lucide-react";
import Container from "./Container";
import Image from "next/image"; // Import Image from next/image

const VideoFeature = ({ videoTitle }: { videoTitle: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false); 
  };

  return (
    <section>
      <Container className="py-6 sm:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          {/* Title Section */}
          <div className="flex flex-col items-center">
            <span className="inline-block mb-3 text-base font-semibold leading-6 text-[#2A5743] rounded-full">
              How it Works
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[36px] sm:leading-[44px] tracking-[-0.02em] text-[#101828] text-center mb-8 max-w-[768px]">
              {videoTitle || "See how ReconXi does it!"}
            </h2>
          </div>

          <div className="relative w-full aspect-video max-w-[1024px] rounded-2xl overflow-hidden shadow-lg">
            {/* Show Poster Image Before Play */}
            {!isPlaying && (
              <Image
                src="/assets/images/video-thumbnail.png"
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover z-10"
                layout="fill" // This will fill the container with the image
                objectFit="cover" // Ensures the image covers the entire space
              />
            )}

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onEnded={handleVideoEnd}
            >
              <source src="/assets/video/howItWorks.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition duration-300 hover:bg-opacity-50 z-20"
                onClick={handlePlay}
              >
                <PlayCircle className="w-20 h-20 text-white opacity-90 hover:opacity-100 transition duration-300" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoFeature;
