"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function StartReconcile() {
  return (
    <section
      className="flex w-full max-w-[1440px] px-6 md:px-12 lg:px-[143px] py-10 md:py-16 lg:py-[80px] 
      justify-center items-center gap-10 lg:gap-[40px] bg-[#F9FAFB] flex-col lg:flex-row"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-10 lg:gap-[40px] w-full">
          {/* Image Section - Appears below form on mobile, first on large screens */}
          <div className="w-full max-w-[398.667px] flex-shrink-0 overflow-hidden rounded-[18px] 
            order-1 lg:order-none">
            <Image
              src="/assets/images/education-contact.svg"
              alt="Education contact illustration"
              width={398.667}
              height={598}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Form Section - Appears first on mobile, second on large screens */}
          <div className="flex flex-col p-6 md:p-8 lg:p-[40px] px-4 md:px-6 lg:px-[32px] 
            items-center gap-6 md:gap-8 lg:gap-[32px] rounded-[18px] bg-white shadow-lg 
            w-full max-w-[624px] order-0 lg:order-none">
            <div className="text-left w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                Get Started Today
              </h2>
              <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600">
                Manage your school&apos;s general ledger with ease - Get automated reconciliation today.
              </p>
            </div>

            <form className="w-full flex flex-col gap-4 md:gap-6">
              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium text-sm md:text-base">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#2E604A]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium text-sm md:text-base">Email</span>
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#2E604A]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium text-sm md:text-base">Phone Number</span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#2E604A]"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-[#2E604A] text-white font-semibold py-3 rounded-md 
                hover:bg-[#2e6d51] cursor-pointer text-sm md:text-base"
              >
                Get A Free Demo
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
