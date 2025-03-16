"use client";

import { motion } from "framer-motion";
import DemoForm from "./demo-form";

export default function Home() {
  // Text animation variants for smoother transitions
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut", 
        delay: i * 0.2 
      }
    })
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut" 
        }}
        className="flex-1 w-full max-w-3xl px-4 py-[59px] flex flex-col items-center text-center"
      >
        <motion.h1 
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold text-[#333333] mb-4"
        >
          Get a free <span className="text-[#2E604A]">Demo</span> and
        </motion.h1>
        <motion.h2 
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-8"
        >
          Automate Your Financial Reconciliation
        </motion.h2>
        
        <motion.p 
          initial="hidden"
          animate="visible"
          custom={3}
          variants={textVariants}
          className="text-lg text-[#333333] mb-12 max-w-2xl"
        >
          Experience the power of AI-driven financial reconciliation. Fill out
          the form below to get a free personalized Demo of ReconXi.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut", 
            delay: 0.6 
          }}
          className="w-full"
        >
          <DemoForm />
        </motion.div>
      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 1
        }}
        className="w-full border-t border-gray-200 py-6 text-center text-gray-600"
      >
        <p>Your data is secured and will not be shared.</p>
      </motion.footer>
    </main>
  );
}