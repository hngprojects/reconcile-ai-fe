"use client";

import React, { useEffect, useState, useRef } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import bgImg from "./img/bg.png";
import Footer from "./components/Footer";
import { Gradient1, Gradient2, Play } from "./components/Icons";
import { Pause } from "lucide-react";
import EmailSubscribeForm from "./components/form/EmailSubscribeForm";

const ComingSoonPage = () => {
  const [showBg, setShowBg] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowBg(window.innerWidth >= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => setIsPlaying(false);
      video.addEventListener("ended", handleVideoEnd);
      return () => video.removeEventListener("ended", handleVideoEnd);
    }
  }, []);

  return (
    <div
      className="flex flex-col font-inter min-h-screen bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg.src})`,
        backgroundSize: showBg ? "contain" : "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="w-full h-full relative flex-1 flex items-start sm:items-center justify-center">
        <Container className="h-full w-full flex items-center justify-center py-8 ">
          <Gradient1 />
          <Gradient2 />
          <div className="w-9/10 flex flex-col gap-8 lg:flex-row sm:text-left justify-between items-center">
            <div className="flex flex-col gap-6 sm:gap-12 max-w-[500px]">
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-5xl font-inter text-black font-medium">
                  We are creating something amazing
                </h3>
                <p className="font-inter text-black">
                  We will launch our website soon! Be the first to be notified
                  when we go live!
                </p>
              </div>
              <div className="hidden sm:block">
                <EmailSubscribeForm />
              </div>
            </div>
            <div>
              <div className="max-w-[450px] aspect-video relative">
                <video
                  autoPlay
                  controls
                  playsInline
                  ref={videoRef}
                  className="w-full h-full rounded-lg shadow-xl object-cover"
                  poster="/assets/video/teaser-poster.png"
                >
                  <source src="/assets/video/ReconXi.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={playVideo}
                  className="cursor-pointer absolute left-0 right-0 top-0 bottom-0 m-auto w-fit"
                >
                  {!isPlaying ? (
                    <Play />
                  ) : (
                    <Pause className="text-white opacity-30" />
                  )}
                </button>
              </div>
            </div>
            <div className="sm:hidden block mt-3">
              <EmailSubscribeForm />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
