"use client";

import { useState, useRef, useEffect } from "react";
import Container from "@/src/components/Container";
import Image from "next/image";
import { Plus, Minus, Pause, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { releases } from "./releaseItems";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function ReconXiReleases() {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>(
    {},
  );

  // play video
  const playVideo = async (releaseId: string) => {
    // Pause any currently playing video
    if (playingVideo && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo]?.pause();
    }

    const video = videoRefs.current[releaseId];
    if (video) {
      try {
        if (playingVideo === releaseId) {
          await video.pause();
          setPlayingVideo(null);
        } else {
          await video.play();
          setPlayingVideo(releaseId);
        }
      } catch (error) {
        console.log("Video playback error:", error);
      }
    }
  };

  // Add video load handler
  const handleVideoLoad = (releaseId: string) => {
    setVideoLoaded((prev) => ({
      ...prev,
      [releaseId]: true,
    }));
  };

  useEffect(() => {
    // Reset videos when accordion items change
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setPlayingVideo(null);
  }, [openItems]);

  const handleToggle = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  // Find the latest release based on date "new tag"
  const latestReleaseId = releases.reduce((latest, current) => {
    if (!latest) return current.id;
    const latestDate = new Date(
      releases.find((r) => r.id === latest)?.date || "",
    );
    const currentDate = new Date(current.date);
    return currentDate > latestDate ? current.id : latest;
  }, "");

  return (
    <>
      <Container className="w-full mx-auto">
        <Accordion
          type="multiple"
          value={openItems}
          className="space-y-4 mt-9 md:mt-16 mb-9 md:mb-16"
        >
          {releases.map((release) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionItem
                value={release.id}
                className="border-b-[#CBD5E1] pb-[12px] md:pb-6 overflow-hidden"
              >
                <motion.div
                  className="flex items-center justify-between p-4 bg-white"
                  whileHover={{ backgroundColor: "#f9f9f9" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex md:items-center flex-col md:flex-row gap-3 md:gap-20">
                    <span className="md:text-2xl text-[#333333] font-normal">
                      {release.date}
                    </span>
                    <div className="flex flex-col gap-[12px] md:gap-6 mt-1">
                      {release.id === latestReleaseId && (
                        <motion.div
                          className="flex items-center bg-[#DFFAE0] px-1 py-0.5 rounded-full h-6 w-14 text-sm"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <span className="text-xs bg-[#F3FEFA] text-center px-2 py-0.5 rounded-xl w-14">
                            New
                          </span>
                        </motion.div>
                      )}
                      <h3 className="font-semibold text-[16px] md:text-[32px]">
                        {release.version}
                      </h3>
                    </div>
                  </div>
                  <AccordionTrigger
                    onClick={() => handleToggle(release.id)}
                    className="h-6 w-6 md:h-[50px] md:w-[50px] rounded-[5px] p-[3px] md:p-[5px] border border-[#2E604A] flex items-center justify-center text-[#2E604A] hover:border-white hover:text-white hover:bg-[#2E604A] cursor-pointer"
                    aria-label={
                      openItems.includes(release.id)
                        ? "Collapse section"
                        : "Expand section"
                    }
                  >
                    <motion.div
                      animate={{ rotate: openItems.includes(release.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openItems.includes(release.id) ? (
                        <Minus className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-5 w-5" aria-hidden="true" />
                      )}
                    </motion.div>
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent className="pt-0 lg:pl-62">
                  <AnimatePresence>
                    {openItems.includes(release.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-white"
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="flex flex-col md:flex-row gap-4 p-4 rounded-md mb-4"
                          style={{ backgroundColor: release.bannerColor }}
                        >
                          <div className="flex-1 flex flex-col justify-center gap-2 ">
                            <h4 className="font-semibold">{release.bannerIntro}</h4>
                            <h2 className="font-semibold text-[16px] md:text-[32px]">
                              {release.bannerTitle}
                            </h2>
                          </div>
                          <motion.div
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src="/assets/images/screen-mockup.png"
                              alt="People working together"
                              width={471}
                              height={317}
                              className="rounded-md object-cover w-full h-auto"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          {/* Main Text */}
                          <p className="font-medium text-xl mb-6 text-justify md:text-start">
                            {release.content.heading}
                          </p>
                          <p className="mb-6 text-sm md:text-lg text-justify md:text-start">
                            {release.content.intro}
                          </p>
                          <p className="font-medium text-xl mb-6 text-justify md:text-start">
                            {release.content.mainText}
                          </p>

                          {/* Video Section */}
                          <motion.div
                            className="relative w-full h-0 pb-[56.25%] bg-gray-100 mb-6 rounded-md overflow-hidden"
                            whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                          >
                            {release.content.videoUrl ?
                              (
                                <video
                                  playsInline
                                  ref={(el) => {
                                    videoRefs.current[release.id] = el;
                                  }}
                                  onLoadedData={() => handleVideoLoad(release.id)}
                                  className="absolute inset-0 w-full h-full rounded-lg shadow-xl object-cover"
                                >
                                  <source
                                    src={release.content.videoUrl}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <Image
                                  src="/assets/images/financial-pro-ft.svg"
                                  alt="Video placeholder"
                                  layout="fill"
                                  objectFit="cover"
                                  className="absolute inset-0 w-full h-full"
                                />
                              )
                            }

                            {videoLoaded[release.id] && (
                              <motion.button
                                onClick={() => playVideo(release.id)}
                                aria-label={
                                  playingVideo === release.id
                                    ? "Pause video"
                                    : "Play video"
                                }
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                {playingVideo !== release.id ? (
                                  <Play className="h-8 w-8 text-white" />
                                ) : (
                                  <Pause className="h-8 w-8 text-white opacity-80" />
                                )}
                              </motion.button>
                            )}
                          </motion.div>

                          {/* Content Sections */}
                          <div className="space-y-5">
                            {release.content.sections.map((section, index) => (
                              <motion.div
                                key={index}
                                className="mb-4"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                              >
                                <h5 className="font-medium text-xl mb-2">
                                  {section.title}
                                </h5>
                                {section.text && (
                                  <p className="text-sm md:text-[16px] mb-2">
                                    {section.text}
                                  </p>
                                )}
                                {section.items && (
                                  <ul className="list-disc pl-5 space-y-1">
                                    {section.items.map((item, itemIndex) => (
                                      <motion.li
                                        key={itemIndex}
                                        className="text-sm md:text-[16px]"
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + (itemIndex * 0.05), duration: 0.2 }}
                                      >
                                        {item}
                                      </motion.li>
                                    ))}
                                  </ul>
                                )}
                              </motion.div>
                            ))}
                          </div>

                          {/* Feedback Section */}
                          <motion.div
                            className="mt-6 text-sm md:text-[16px] pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                          >
                            <p>{release.content.feedback.text}</p>
                            <p className="text-sm md:text-[16px] mt-2">
                              {release.content.feedback.email}
                            </p>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </Container>
      <Footer />
    </>
  );
}