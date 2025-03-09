"use client";

import CTASection from "@/src/components/CTASection";
import Footer from "@/src/components/Footer";
import ContactUsForm from "@/src/components/form/ContactUsForm";
import { useState } from "react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div>
      <div className="md:bg-[#FAFAFA] pt-[47px] px-[24px] md:py-14">
        <div className="max-w-[996px] mx-auto flex flex-col items-center mb-[58px] md:mb-[64px]">
          <p className="bg-[#E6FFF2] rounded-[16px] py-2 px-3 text-[20px] text-[#009A49]">
            Contact Us
          </p>
          <h1 className="my-2 font-medium text-[28px] sm:text-[35px] md:text-[45px] lg:text-[64px] text-[#0A0A0A]">
            Get in <span className="text-[#2E604A]">touch with</span> us today
          </h1>
          <p className="text-center text-[18px] max-w-[694px] mx-auto">
            Have questions, feedback, or need assistance? Our team is here to
            help and support you every step of the way. Get in touch with us
            today.
          </p>
        </div>
        <div className="max-w-[1261px] mx-auto flex justify-center">
          {isSubmitted ? (
            <div className="mb-20 p-8">
              <p className="text-xl text-center font-semibold md:text-2xl">
                Thank you for contacting us. We will get back to you soon!
              </p>
            </div>
          ) : (
            <div className="w-full rounded-lg md:border md:border-[rgba(82,82,82,0.2)] max-w-[663px] md:p-8">
              <ContactUsForm setIsSubmitted={setIsSubmitted} />
            </div>
          )}
        </div>
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Contact;
