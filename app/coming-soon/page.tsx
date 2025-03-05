"use client";

import React, { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import Image from "next/image";
import videoImg from "./video/video-img.png";
import bgImg from "./img/bg.png";
import Footer from "./components/Footer";
import { Gradient1, Gradient2 } from "./components/Icons";
import EmailSubscribeForm from "./components/form/EmailSubscribeForm";

const Page = () => {
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
      className="flex flex-col min-h-screen bg-center overflow-hidden"
      style={{
        backgroundImage: showBg ? `url(${bgImg.src})` : "none",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Container className="flex items-center w-full justify-center relative h-full flex-1">
        <Gradient1 />
        <Gradient2 />
        <div className="w-9/10 flex flex-col-reverse gap-6 sm:flex-row text-center sm:text-left justify-between items-center">
          <div className="flex flex-col gap-6 sm:gap-12 max-w-[500px]">
            <div className="space-y-3">
              <h3 className="text-3xl  sm:text-5xl font-medium">
                We are creating something amazing
              </h3>
              <p>
                We will launch our website soon! Be the first to be notified
                when we go live!
              </p>
            </div>
            <div>
              <EmailSubscribeForm />
            </div>
          </div>
          <div>
            <Image
              alt="video of product"
              src={videoImg}
              width={405}
              height={430}
            />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Page;
