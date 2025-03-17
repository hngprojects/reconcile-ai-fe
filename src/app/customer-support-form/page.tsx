"use client";
import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Send data to API
  };

  return (
    <Container>
      <div className="max-w-3xl mt-10 mx-auto p-6  shadow-md rounded-lg border border-[rgba(82,82,82,0.20)] bg-[rgba(250,250,250,0.00)]">
        <h2 className="self-stretch text-center text-[#333] font-inter text-[48px] font-semibold leading-[74px]">
          Give us your feedback
        </h2>
        <p className="self-stretch text-center text-[#475467] font-inter text-[20px] font-normal leading-[30px]">
          Thank you for reaching out! Please fill out the form below, and our
          team will reach out to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[6px] p-8 mt-8 gap-6 border border-[rgba(82,82,82,0.20)] bg-[rgba(250,250,250,0.00)]"
        >
          <div>
            <label className="text-[#333] font-inter text-[14px] font-semibold leading-[20px]">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full flex-1  px-4 py-2 border rounded-md overflow-hidden text-[20px] font-normal leading-[30px] text-[rgba(184,184,184,1)] text-ellipsis line-clamp-1"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-[#333] font-inter text-[14px] font-semibold leading-[20px]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full flex-1  px-4 py-2 border rounded-md overflow-hidden text-[20px] font-normal leading-[30px] text-[rgba(184,184,184,1)] text-ellipsis line-clamp-1"
              placeholder="email@address.com"
              required
            />
          </div>

          <div>
            <label className="text-[#333] font-inter text-[14px] font-semibold leading-[20px]">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full flex-1  px-4 py-2 border rounded-md overflow-hidden text-[20px] font-normal leading-[30px] text-[rgba(184,184,184,1)] text-ellipsis line-clamp-1"
              placeholder="Type a brief description here..."
              required
            />
          </div>

          <div>
            <label className="text-[#333] font-inter text-[14px] font-semibold leading-[20px]">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Message..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="text-[#333] font-inter text-[14px] font-semibold leading-[20px]">
              Upload file (optional)
            </label>
            <div className="relative flex h-[154px] p-[20px_16px] w-full flex-col justify-center items-center gap-[20px] self-stretch rounded-[9px] border border-[#DEDEDE] bg-[#F8F8F8]">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/images/cloud.svg" 
                  alt="Cloud Icon"
                  width={50}
                  height={50}
                  className="mb-2"
                />
                <p className="self-stretch text-[#214435] text-center font-inter text-[14px] font-semibold leading-[20px]">Drag & drop or click to upload</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="block w-full h-[62px]"
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
