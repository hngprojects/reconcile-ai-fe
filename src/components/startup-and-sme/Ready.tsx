'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function StartReconcile() {
  return (
    <section
      className="bg-white px-0 py-10 md:py-20 lg:px-20"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Image section - now on the left */}
          <div className="w-full min-w-[300px] flex-1">
            <Image
              src="/assets/images/Smiling.png"
              alt="Visual representation of ReconXi's reconciliation process"
              width={520}
              height={780}
              className="mx-auto h-auto w-full max-w-[520px] rounded-lg object-cover"
              priority
            />
          </div>

          {/* Form section - now on the right */}
          <div className="w-full flex-1 justify-center space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-base leading-[1.5] text-[#475467] sm:text-lg md:text-[20px] md:leading-[30px]">
                Join thousands of small businesses using ReconXi&apos;s free
                bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div
              className="mx-auto rounded-lg"
              aria-label="Start free trial form"
            >
              <div className="w-full">
                <div className="space-y-6 rounded-[8px] border p-[32px]">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-sm text-[#717171]"
                    >
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
                    <Label
                      htmlFor="businessName"
                      className="text-sm text-[#717171]"
                    >
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
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm text-[#717171]"
                    >
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
                        className="h-12 min-h-[48px] flex-1 bg-white !text-base"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-[#2E604A] py-6 text-[18px] font-semibold text-white"
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
  )
}
