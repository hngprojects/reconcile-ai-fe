"use client";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { FileCheck } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { handleCustomerFeedback } from "@/src/lib/api";
import { toast } from "sonner";

export default function ContactUs() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    file: null as File | null,
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setFormData((prev) => ({ ...prev, file: files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setFormData((prev) => ({ ...prev, file: files[0] }));
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
      file: null,
    });
    setSelectedFile(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Create FormData object for multipart/form-data request
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('request_type', formData.subject);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      
      // You'll need to modify the handleCustomerFeedback function to accept FormData
      const result = await handleCustomerFeedback(formDataToSend);
  
      if (result.success) {
        toast.success("Feedback submitted successfully!", {
          description: "Thank you for your feedback. We'll get back to you soon.",
        });
        resetForm();
      } else if (result.error) {
        toast.error("Failed to submit feedback", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Exception when submitting feedback:", error);
      toast.error("Failed to submit feedback", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-[59px] px-4">
        <Container>
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#333] mb-4">
              Give us your feedback
            </h2>
            <p className="text-lg text-[#475467] mb-12 max-w-2xl">
              Thank you for reaching out! Please fill out the form below, and
              our team will reach out to you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[650px] bg-white border border-gray-200 rounded-md p-6"
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
                  <Input
                    id="message"
                    name="message"
                    type="text"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    required
                    aria-required="true"
                    className="h-25 bg-white !text-base"
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
                    className={`w-full h-[154px] bg-[#F8F8F8] rounded flex flex-col items-center justify-center cursor-pointer transition-all
                      ${
                        isDragging
                          ? "border-2 border-dashed border-[#2E604A]"
                          : "border border-[#DEDEDE]"
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
                          className="w-[50px] h-[50px] text-[#2E604A]"
                          strokeWidth={1.5}
                        />
                        <p className="text-sm text-[#214435] mt-2 font-semibold">
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
                        <p className="text-sm text-[#214435] mt-2 font-semibold">
                          Drop your file here or browse
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}