"use client";

import React, { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import bgImg from "./img/bg.png";
import Footer from "./components/Footer";
import { Gradient1, Gradient2 } from "./components/Icons";
import EmailSubscribeForm from "./components/form/EmailSubscribeForm";

const ComingSoonPage = () => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowBg(window.innerWidth >= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className="flex flex-col font-inter min-h-screen bg-center overflow-hidden"
      style={{
        backgroundImage: showBg ? `url(${bgImg.src})` : "none",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="w-full h-full relative flex-1 flex items-center justify-center">
        <Container className="h-full w-full  flex items-center justify-center py-6 sm:py-8 ">
          <Gradient1 />
          <Gradient2 />
          <div className="w-9/10 flex flex-col-reverse gap-8 sm:flex-row text-center sm:text-left justify-between items-center">
            <div className="flex flex-col gap-6 sm:gap-12 max-w-[500px]">
              <div className="space-y-3">
                <h3 className="text-3xl  sm:text-5xl font-inter text-black font-medium">
                  We are creating something amazing
                </h3>
                <p className="font-inter text-black">
                  We will launch our website soon! Be the first to be notified
                  when we go live!
                </p>
              </div>
              <div>
                <EmailSubscribeForm />
              </div>
            </div>
            <div>
              <div className="w-full max-w-[450px]">
                <video
                  loop
                  controls
                  playsInline
                  className="w-full h-full rounded-lg shadow-xl"
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
