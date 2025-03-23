"use client";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

const VideoFeature = () => {
  return (
    <section>
      <Container className="py-6 sm:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          {/* Animated Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="inline-block mb-3 text-base font-semibold leading-6 text-[#2A5743] rounded-full"
            >
              How it Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[28px] sm:text-[36px] font-semibold leading-[36px] sm:leading-[44px] tracking-[-0.02em] text-[#101828] text-center mb-8 max-w-[768px]"
            >
              Let&apos;s show you the ReconXi way!
            </motion.h2>
          </motion.div>

          {/* Animated Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default VideoFeature;
