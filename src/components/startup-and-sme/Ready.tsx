"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function StartReconcile() {
  return (
    <section
      className="py-10 md:py-20 px-0 lg:px-20 bg-white"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Image section - now on the left */}
          <div className="flex-1 w-full min-w-[300px]">
            <Image
              src="/assets/images/Smiling.png"
              alt="Visual representation of ReconXi's reconciliation process"
              width={520}
              height={780}
              className="w-full h-auto max-w-[520px] mx-auto rounded-lg object-cover"
              priority
            />
          </div>

          {/* Form section - now on the right */}
          <div className="flex-1 w-full space-y-6 md:space-y-8 justify-center">
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] sm:text-[32px] md:text-[36px] leading-[1.2] font-semibold text-[#101828]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Join thousands of small businesses using ReconXi&apos;s free bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div
              className="rounded-lg mx-auto"
              aria-label="Start free trial form"
            >
              <div className="w-full">
                <div className="space-y-6 border rounded-[8px] p-[32px]">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm text-[#717171]">
                      Full Name
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
                      placeholder="Enter email address"
                      required
                      aria-required="true"
                      className="h-12 bg-white !text-base"
                    />
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm text-[#717171]">
                      Companys Name
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Enter company name"
                      required
                      aria-required="true"
                      className="h-12 bg-white !text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm text-[#717171]">
                      Phone Number
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter phone number"
                        required
                        aria-required="true"
                        className="h-12 min-h-[48px] bg-white !text-base flex-1"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer"
                  >
                  Start your free trial Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}