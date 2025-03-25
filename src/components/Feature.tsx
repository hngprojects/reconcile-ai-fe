"use client";
import React from "react";
import Image from "next/image";
import Container from "./Container";

export default function Features1() {
  return (
    <section className="w-full overflow-hidden">
<<<<<<< HEAD
      <Container className="py-10">
        <div
=======
      <Container className="py-16 px-4 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
>>>>>>> dev
          className="flex flex-col justify-center lg:flex-row items-center gap-10 lg:gap-24 h-full"
        >
          {/* Left Text Section */}
          <div
            className="flex flex-col text-center sm:text-left items-start gap-[32px] flex-1"
          >
            <div className="flex flex-col items-start gap-[24px] w-full">
              <p className="w-full text-primary font-inter font-semibold leading-[24px]">
                Problem Statement
              </p>
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                <h1 className="text-[#101828] font-inter text-3xl sm:text-4xl font-semibold">
                  Financial Reconciliation Doesn&apos;t Have to Be Hard
                </h1>
                <p className="text-[#475467] font-inter sm:text-lg">
                  Spending hours matching transactions manually? Errors slipping
                  through the cracks? Our tool makes reconciliation simple so
                  you can focus on what really matters.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div
            className="flex justify-center items-center flex-1"
          >
            <div className="relative md:h-[500px] h-[300px] w-full max-w-[536px]">
              <Image
                src="/assets/images/screen-mockup.png"
                alt="screen mockup"
                width={536}
                height={410}
                className="flex-shrink-0 rounded-[10px] bg-gray-300 bg-[50%] bg-cover bg-no-repeat border-[4px] border-[#101828] object-contain max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
