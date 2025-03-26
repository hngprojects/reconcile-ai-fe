"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import DemoForm from "@/src/app/demo/demo-form";

export default function StartReconcile() {
  return (
    <section
      className="py-10 px-0 lg:px-20 md:py-20 bg-[#F4F7FB]"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-16 items-center">
          <div
            className="flex-1 w-full min-w-[300px]"
          >
            <Image
              src="/assets/images/smiling-customer-service-agent.png"
              alt="Visual representation of ReconXi's reconciliation process"
              width={398}
              height={598}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div
            className="flex-1 w-full items-center space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Get Started Today
              </h2>
              <p className="text-[#767676] text-xl">Users will fill in their details to schedule a demo or sign up for updates.</p>
            </div>

            <div
              className="rounded-lg mx-auto"
              aria-label="Start free trial form"
            >
              <div
              >
                <DemoForm buttonText="Get your Demo" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
