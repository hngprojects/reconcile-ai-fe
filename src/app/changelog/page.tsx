'use client'

import { useState, useRef, useEffect } from 'react'
import Container from '@/components/Container'
import Image from 'next/image'
import { Plus, Minus, Pause, Play } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { releases } from './releaseItems'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReconXiReleases() {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<string[]>([])
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})

  // play video
  const playVideo = async (releaseId: string) => {
    // Pause any currently playing video
    if (playingVideo && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo]?.pause()
    }

    const video = videoRefs.current[releaseId]
    if (video) {
      try {
        if (playingVideo === releaseId) {
          await video.pause()
          setPlayingVideo(null)
        } else {
          await video.play()
          setPlayingVideo(releaseId)
        }
      } catch (error) {
        console.log('Video playback error:', error)
      }
    }
  }

  // Add video load handler
  const handleVideoLoad = (releaseId: string) => {
    setVideoLoaded((prev) => ({
      ...prev,
      [releaseId]: true,
    }))
  }

  useEffect(() => {
    // Reset videos when accordion items change
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key]
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
    setPlayingVideo(null)
  }, [openItems])

  const handleToggle = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id))
    } else {
      setOpenItems([...openItems, id])
    }
  }

  // Sort releases from latest to oldest
  const sortedReleases = [...releases].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // Find the latest release (will now be the first item after sorting)
  const latestReleaseId = sortedReleases[0]?.id

  return (
    <>
      <Container className="mx-auto w-full">
        <Accordion
          type="multiple"
          value={openItems}
          className="mt-9 mb-9 space-y-4 md:mt-16 md:mb-16"
        >
          {sortedReleases.map((release) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionItem
                value={release.id}
                className="overflow-hidden border-b-[#CBD5E1] pb-[12px] md:pb-6"
              >
                <motion.div
                  className="flex items-center justify-between bg-white p-4"
                  whileHover={{ backgroundColor: '#f9f9f9' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-20">
                    <span className="font-normal text-[#333333] md:text-2xl">
                      {release.date}
                    </span>
                    <div className="mt-1 flex flex-col gap-[12px] md:gap-6">
                      {release.id === latestReleaseId && (
                        <motion.div
                          className="flex h-6 w-14 items-center rounded-full bg-[#DFFAE0] px-1 py-0.5 text-sm"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                        >
                          <span className="w-14 rounded-xl bg-[#F3FEFA] px-2 py-0.5 text-center text-xs">
                            New
                          </span>
                        </motion.div>
                      )}
                      <h3 className="text-[16px] font-semibold md:text-[32px]">
                        {release.version}
                      </h3>
                    </div>
                  </div>
                  <AccordionTrigger
                    onClick={() => handleToggle(release.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-[5px] border border-[#2E604A] p-[3px] text-[#2E604A] hover:border-white hover:bg-[#2E604A] hover:text-white md:h-[50px] md:w-[50px] md:p-[5px]`}
                    aria-label={
                      openItems.includes(release.id)
                        ? 'Collapse section'
                        : 'Expand section'
                    }
                  >
                    <motion.span
                      animate={{
                        rotate: openItems.includes(release.id) ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {openItems.includes(release.id) ? (
                        <Minus className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-5 w-5" aria-hidden="true" />
                      )}
                    </motion.span>
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent className="pt-0 lg:pl-62">
                  <AnimatePresence>
                    {openItems.includes(release.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="bg-white"
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mb-4 flex flex-col gap-4 rounded-md p-4 md:flex-row"
                          style={{ backgroundColor: release.bannerColor }}
                        >
                          <div className="flex flex-1 flex-col justify-center gap-2">
                            <h4 className="font-semibold">
                              {release.bannerIntro}
                            </h4>
                            <h2 className="text-[16px] font-semibold md:text-[32px]">
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
                              className="h-auto w-full rounded-md object-cover"
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
                          <p className="mb-6 text-justify text-xl font-medium md:text-start">
                            {release.content.heading}
                          </p>
                          <p className="mb-6 text-justify text-sm md:text-start md:text-lg">
                            {release.content.intro}
                          </p>
                          <p className="mb-6 text-justify text-xl font-medium md:text-start">
                            {release.content.mainText}
                          </p>

                          {/* Video Section */}
                          <motion.div
                            className="relative mb-6 h-0 w-full overflow-hidden rounded-md bg-gray-100 pb-[56.25%]"
                            whileHover={{
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {release.content.videoUrl ? (
                              <video
                                playsInline
                                ref={(el) => {
                                  videoRefs.current[release.id] = el
                                }}
                                onLoadedData={() => handleVideoLoad(release.id)}
                                className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-xl"
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
                                className="absolute inset-0 h-full w-full"
                              />
                            )}

                            {videoLoaded[release.id] && (
                              <motion.button
                                onClick={() => playVideo(release.id)}
                                aria-label={
                                  playingVideo === release.id
                                    ? 'Pause video'
                                    : 'Play video'
                                }
                                className="absolute inset-0 flex cursor-pointer items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                {playingVideo !== release.id ? (
                                  <Play
                                    className="h-8 w-8 text-white"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Pause
                                    className="h-8 w-8 text-white opacity-80"
                                    aria-hidden="true"
                                  />
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
                                transition={{
                                  delay: 0.4 + index * 0.1,
                                  duration: 0.3,
                                }}
                              >
                                <h5 className="mb-2 text-xl font-medium">
                                  {section.title}
                                </h5>
                                {section.text && (
                                  <p className="mb-2 text-sm md:text-[16px]">
                                    {section.text}
                                  </p>
                                )}
                                {section.items && (
                                  <ul className="list-disc space-y-1 pl-5">
                                    {section.items.map((item, itemIndex) => (
                                      <motion.li
                                        key={itemIndex}
                                        className="text-sm md:text-[16px]"
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{
                                          delay: 0.5 + itemIndex * 0.05,
                                          duration: 0.2,
                                        }}
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
                            className="mt-6 pt-4 text-sm md:text-[16px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                          >
                            <p>{release.content.feedback.text}</p>
                            <p className="mt-2 text-sm md:text-[16px]">
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
  )
}
