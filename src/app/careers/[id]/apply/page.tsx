'use client'

import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { FileCheck } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Text animation variants for smoother transitions
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: i * 0.1,
      },
    }),
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-[59px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="flex w-full max-w-3xl flex-col items-center text-center"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="mb-4 text-4xl font-bold text-[#333333] md:text-5xl"
          >
            Apply today!
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
            className="mb-12 flex max-w-2xl flex-col text-lg text-[#333333]"
          >
            <span>Thank you for your interest!</span>
            <span>
              Please fill out the form below, and our team will reach out to
              you.
            </span>
          </motion.p>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.5,
            }}
            className="mx-auto w-full rounded-md border border-gray-200 bg-white p-6 md:w-[650px]"
            aria-labelledby="form-heading"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm text-[#717171]">
                  Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter full name"
                  required
                  aria-required="true"
                  className="h-12 bg-white !text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-[#717171]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@address.com"
                  required
                  aria-required="true"
                  className="h-12 bg-white !text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="text-sm text-[#717171]">
                  Resume
                </Label>
                <div
                  id="fileUpload"
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex h-[154px] w-full cursor-pointer flex-col items-center justify-center rounded bg-[#F8F8F8] transition-all ${
                    isDragging
                      ? 'border-2 border-dashed border-[#2E604A]'
                      : 'border border-[#DEDEDE]'
                  }`}
                >
                  <input
                    id="resume"
                    ref={fileInputRef}
                    name="resume"
                    type="file"
                    required
                    onChange={handleFileChange}
                    aria-required="true"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <FileCheck
                        className="h-[33px] w-[45px] text-[#2E604A]"
                        strokeWidth={1.5}
                      />
                      <p className="mt-5 text-sm text-[#214435]">
                        {selectedFile.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Image
                        src="/assets/images/uploadicon.svg"
                        width={45}
                        height={33}
                        alt="upload icon"
                      />
                      <p className="mt-5 text-sm text-[#214435]">
                        Drop your file here or browse
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="linkedinProfile"
                  className="text-sm text-[#717171]"
                >
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedinProfile"
                  name="linkedinProfile"
                  type="url"
                  placeholder="https://www.linkedin.com/in/your_profile"
                  required
                  aria-required="true"
                  className="h-12 bg-white !text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="compensation"
                  className="text-sm text-[#717171]"
                >
                  Desired Compensation
                </Label>
                <Input
                  id="compensation"
                  name="compensation"
                  type="text"
                  placeholder="$"
                  required
                  aria-required="true"
                  className="h-12 bg-white !text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm text-[#717171]">
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  required
                  aria-required="true"
                  className="h-12 bg-white !text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#2E604A] py-6 text-[18px] font-semibold text-white"
              >
                Submit Application{' '}
                <Image
                  src="/assets/images/SendIcon.svg"
                  width={17}
                  height={17}
                  alt="Send icon"
                  className="ml-2"
                />
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}
