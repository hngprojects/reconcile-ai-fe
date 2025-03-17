"use client";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ContactUs() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    file: null as File | null,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Send data to API
  };

  return (
    <main>
      <Container>
        <div className="max-w-3xl mt-10 mx-auto p-6">
          <h2 className="self-stretch text-center text-[#333] font-inter text-[48px] font-semibold leading-[74px] mb-4">
            Give us your feedback
          </h2>
          <p className="self-stretch text-center mb-12 text-[#475467] font-inter text-[20px] font-normal leading-[30px]">
            Thank you for reaching out! Please fill out the form below, and our
            team will reach out to you.
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
                <Label htmlFor="fullName" className="text-sm text-[#717171]">
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
                <Label htmlFor="fullName" className="text-sm text-[#717171]">
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
                  className="w-full h-[154px] bg-[#F8F8F8] border border-[#DEDEDE] rounded flex flex-col items-center justify-center cursor-pointer"
                >
                  <input
                    id="resume"
                    ref={fileInputRef}
                    name="resume"
                    type="file"
                    required
                    aria-required="true"
                    className="hidden"
                    multiple
                  />

                  <Image
                    src="/assets/images/cloud.svg"
                    width={50}
                    height={50}
                    alt="upload icon"
                  />
                  <p className="self-stretch text-[#214435] text-center font-inter text-[14px] font-semibold leading-[20px]">
                    Drop you file here or browse
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
