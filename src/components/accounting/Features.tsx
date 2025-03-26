"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function Features() {
  return (
    <section
      className="w-full py-20 px-0 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full">
                <h2 className="text-[#767676] text-sm md:text-base">ABOUT US</h2>
                <h1 className="text-[#292D32] text-2xl md:text-4xl mt-2 mb-6">What is ReconXi?</h1>
                <p className="text-[#767676] text-sm md:text-xl">ReconXi is built for accounting and audit firms to simplify reconciliation accounting. With precise financial tracking and automated reconciliation, firms can ensure compliance, eliminate discrepancies, and maintain accurate records for audits and reporting.</p>
                <div className="flex flex-col gap-4 mt-6 md:mt-12">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl font-medium">Simplify your finances with smart reconciliation accounting.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl font-medium">Automate bank reconciliation accounting – Reduce errors & save time.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl font-medium">Simplify your account reconciliation statement – Accurate & fast.</p>                 
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/check-bg-green.png"
                      alt="Check icon"
                      width={40}
                      height={40}
                      className="object-cover"
                    />  
                    <p className="text-[#767676] text-sm md:text-xl font-medium">Stay audit-ready with stress-free account reconciliation statements.</p>                 
                  </div>
                </div>
              </div>
          {/* Image - Moves to top on mobile */}
            <div
              className="w-full"
              role="presentation"
            >
              <Image
                src="/assets/images/office-image.png"
                alt="Enterprise reconciliation features visualization"
                width={605}
                height={544}
                className="w-full h-auto rounded-lg"
                priority={false}
              />
            </div>
    
        </div>
      </Container>
    </section>
  );
}
