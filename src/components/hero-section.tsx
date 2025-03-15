"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="sm:bg-[#F9FAFB] w-full">
      <Container className="py-4 sm:py-10 w-full">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-semibold text-[28px] sm:text-5xl text-[#101828] max-w-[1024px] flex-wrap lg:leading-[3.5rem] lg:text-[3rem]">
            AI-Powered Financial Reconciliation in Minutes, Not Hours
          </h1>
          <p className="text-[#475467] sm:text-xl max-w-[768px] mt-4">
            Reconcile your bank statement and company ledger with AI.
          </p>
          <motion.div
            className="flex flex-col items-center justify-center w-full gap-6 my-6 sm:flex-row"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <Link
              className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center w-full sm:w-56 border border-primary h-12 text-sm text-primary hover:text-white hover:bg-primary flex"
              href="/"
            >
              Start Reconciliation
            </Link> */}
            <Button className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full sm:w-64 text-sm text-white hover:bg-[#297B65]/90 flex cursor-pointer">
              <Link href="/file-upload" aria-label="Start Reconciliation">
                Start Reconciliation
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <Image
            src="/assets/images/Hero-Section-Image.png"
            alt="macbook mockup"
            width={621}
            height={387}
            className="mt-6 mb-2 object-contain"
            quality={75}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
            style={{
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
