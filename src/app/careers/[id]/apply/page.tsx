"use client"
import Footer from "@/src/components/Footer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

export default function Home() {
    const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <main className="min-h-screen flex flex-col ">
      <div className=" flex flex-col items-center">
        <div className="flex-1 w-full max-w-3xl px-4 py-[59px] flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Apply today!
          </h1>

          <p className="text-lg text-[#333333] mb-12 max-w-2xl flex flex-col">
            <span>Thank you for your interest!</span>{" "}
            <span>
              Please fill out the form below, and our team will reach out to
              you.
            </span>
          </p>

          <div className="w-full">
            {" "}
            <form
              className="w-full md:w-[650px] bg-white border border-gray-200 rounded-md p-6"
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
                      src="/assets/images/uploadicon.svg"
                      width={45}
                      height={33}
                      alt="upload icon"
                    />
                    <p className="text-sm text-[#214435] mt-5">
                      Drop you file here or browse
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinProfile" className="text-sm text-[#717171]">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    type="url"
                    placeholder="https://www.linkedin.com/in/you"
                    required
                    aria-required="true"
                    className="h-12 bg-white !text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compensation" className="text-sm text-[#717171]">
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
                  className="w-full bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer"
                >
                  Submit Application{" "}
                  <Image
                    src="/assets/images/SendIcon.svg"
                    width={17}
                    height={17}
                    alt="Send icon"
                  />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}