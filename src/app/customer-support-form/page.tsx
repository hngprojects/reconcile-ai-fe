'use client'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileCheck } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { handleCustomerFeedback } from '@/actions/api'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function ContactUs() {
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    file: null as File | null,
  })

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
      setFormData((prev) => ({ ...prev, file: files[0] }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      setFormData((prev) => ({ ...prev, file: files[0] }))
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
      file: null,
    })
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('request_type', formData.subject || 'Feedback')

      if (formData.file) {
        formDataToSend.append('file', formData.file)
      }

      const result = await handleCustomerFeedback(formDataToSend)

      if (result.success) {
        toast.success('Feedback submitted successfully!')
        resetForm()
      } else if (result.error) {
        toast.error('Error submitting feedback: ' + result.error)
      }
    } catch (error) {
      console.error('Exception when submitting feedback:', error)
      toast.error('An error occurred while submitting feedback')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-[59px]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          >
            <motion.h2
              initial="hidden"
              animate="visible"
              custom={1}
              variants={textVariants}
              className="mb-4 text-4xl font-bold text-[#333] md:text-5xl"
            >
              Give us your feedback
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={textVariants}
              className="mb-12 max-w-2xl text-lg text-[#475467]"
            >
              Thank you for reaching out! Please fill out the form below, and
              our team will reach out to you.
            </motion.p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
                delay: 0.5,
              }}
              onSubmit={handleSubmit}
              className="w-full rounded-md border border-gray-200 bg-white p-6 md:w-[650px]"
              aria-labelledby="form-heading"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm text-[#717171]">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    aria-required="true"
                    className="h-12 bg-white !text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm text-[#717171]">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Type a brief description here..."
                    required
                    aria-required="true"
                    className="h-12 bg-white !text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-[#717171]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                    aria-required="true"
                    className="border-input min-h-[120px] w-full resize-none rounded-md border bg-white p-3 text-base focus:ring-2 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-sm text-[#717171]">
                    Upload file (optional)
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
                      onChange={handleFileChange}
                      aria-required="true"
                      className="hidden"
                      multiple
                    />

                    {selectedFile ? (
                      <div className="flex flex-col items-center">
                        <FileCheck
                          className="h-[50px] w-[50px] text-[#2E604A]"
                          strokeWidth={1.5}
                        />
                        <p className="mt-2 text-sm font-semibold text-[#214435]">
                          {selectedFile.name}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Image
                          src="/assets/images/cloud.svg"
                          width={50}
                          height={50}
                          alt="upload icon"
                        />
                        <p className="mt-2 text-sm font-semibold text-[#214435]">
                          Drop your file here or browse
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full cursor-pointer bg-[#2E604A] py-6 text-[18px] font-semibold text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
