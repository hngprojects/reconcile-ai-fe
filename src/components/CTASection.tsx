"use client";
import React from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import TypeWriterButton from "./buttons/TypeWriterButton";

const CTASection = () => {
  return (
    <div className="bg-gray-50 sm:bg-white">
      <Container className="py-8">
        <div
          className="flex flex-col items-center gap-8 sm:gap-10 bg-gray-50 justify-between px-5 py-10 sm:p-16 sm:rounded-xl sm:flex-row sm:px-7 sm:py-12 md:items-start"
        >
          <div
            className="space-y-3 text-center sm:text-left sm:space-y-4 md:w-2/3"
          >
            <p className="font-bold text-gray-900 text-3xl">Try ReconXi Now!</p>
            <p className="text-[#475467] text-xl sm:text-lg max-w-[43rem]">
              Unlock faster and smarter financial reconciliation today.
            </p>
          </div>
          <div>
            <TypeWriterButton
              text="Get Started"
              path="/file-upload"
              // className="bg-primary whitespace-nowrap w-full sm:w-fit py-2 px-4 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex cursor-pointer"
              className="bg-primary whitespace-nowrap w-full sm:w-64 h-12 py-2 px-4 rounded-md font-semibold justify-center items-center text-sm text-white hover:bg-primary/90 hover:scale-105 transition-transform duration-200 flex"
              aria-label="Get started with ReconXi"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CTASection;
