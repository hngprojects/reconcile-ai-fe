"use client";

import Footer from "@/src/components/Footer";

export default function VideoPage() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-black">
        <video
          className="w-full max-w-4xl"
          controls
          autoPlay
          playsInline
          aria-label="Demo video"
          muted
        >
          <source src="/assets/video/ReconXi-Ad.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </main>
      <Footer />
    </>
  );
}
