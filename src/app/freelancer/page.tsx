"use client";

import Container from "@/src/components/Container";
import FAQSection from "@/src/components/FAQs/FAQSection";
import Footer from "@/src/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Form from "./components/form";

const benefitContent = [
  {
    id: 1,
    title: "Saves Time",
    content: "Spend more time working, less time on accounting",
  },
  {
    id: 2,
    title: "Accurate & Fast",
    content:
      "AI-powered automated reconciliation software does the job in seconds.",
  },
  {
    id: 3,
    title: "Error-Free Reports",
    content: "Never worry about missing or duplicate transactions again.",
  },
  {
    id: 4,
    title: "Affordable for Freelancers",
    content:
      "Whether you're handling a few transactions or thousands, ReconXi grows with your business.",
  },
];
const whyFreelanceContent = [
  {
    id: 1,
    title: "Instant Bank Reconciliation Accounting",
    content: "Upload your bank statements and let AI do the work",
  },
  {
    id: 2,
    title: "Automated Reconciliation Software",
    content:
      "AI-powered automated reconciliation software does the job in seconds.",
  },
  {
    id: 3,
    title: "Accurate Financial Reports",
    content: "Get a detailed bank reconciliation statement with just a click.",
  },
  {
    id: 4,
    title: "100% Free for limited Use",
    content: "No hidden fees. Just fast, effortless reconciliation.",
  },
];

const page = () => {
  return (
    <>
      <section>
        <Container className="py-4 md:py-10 mt-5 md:mt-0 space-y-16 md:space-y-10 w-full">
          <motion.div
            className="flex flex-col items-center justify-center md:items-start max-w-4xl mx-auto w-full text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-semibold text-2xl md:text-4xl text-[#101828] flex-wrap">
              Stop Wasting Hours on Reconciliation - Let ReconXi Do It for You,
              Automatically!
            </h1>
            <p className="text-[#475467] text-start md:text-center md:text-lg mt-4">
              Tired of manually tracking income and expenses? ReconXi is the
              automated reconciliation software designed for freelancers like
              you. Get accurate bank reconciliation statements in seconds—no
              spreadsheets, no stress!
            </p>
            <motion.div
              className="flex flex-col items-center w-fit md:w-full justify-center gap-6 mt-4 md:mt-6 md:flex-row"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/file-upload"
                aria-label="Start Reconciliation"
                className="bg-primary py-2 px-6 rounded-md font-semibold justify-center items-center h-12 w-full md:w-64 text-sm text-white hover:bg-primary/90 flex cursor-pointer"
              >
                Start Reconciliation
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className=" h-[220px] md:h-[440px] w-full max-w-[960px] mx-auto "
          >
            <Image
              src="/assets/images/free_hero.jpg"
              alt="freelancer image"
              width={1200}
              height={800}
              className="object-cover object-[center_70%] rounded-4xl w-full h-full"
              quality={75}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
            />
          </motion.div>
        </Container>
      </section>
      <section>
        <Container className="py-4 md:py-10 mt-5 md:mt-0 w-full">
          <div className="flex flex-col md:flex-row-reverse max-w-[960px] mx-auto justify-center gap-12 items-center w-full">
            <motion.div
              className="flex flex-col justify-center items-start max-w-4xl mx-auto w-full text-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-semibold text-center md:text-start text-xl md:text-3xl text-[#101828] flex-wrap">
                Freelancers juggle multiple clients, invoices, and payment
                platforms - but keeping financial records accurate is a
                nightmare.
              </h2>
              <p className="text-[#475467] text-start mt-4">
                With payments coming from different sources - bank transfers,
                PayPal, Stripe, local payment gateways - freelancers often
                struggle to match transactions correctly. The solution? An
                automated reconciliation software that does the work for you -
                fast, accurate, and hassle-free.
              </p>
              <span className="mt-3 text-[#475467]">The ReconXi Way!</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-[279px] md:h-[370px] w-full"
            >
              <Image
                src="/assets/images/free_juggle.jpg"
                alt="freelancer image"
                width={1200}
                height={800}
                className="object-cover md:border-4 border-[#101828] rounded-[12px] h-full w-full"
                quality={75}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
              />
            </motion.div>
          </div>
        </Container>
      </section>
      <section>
        <Container className="py-4 md:py-10 mt-5 md:mt-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-3xl font-semibold text-center">
              Benefits of Using ReconXi
            </h2>
          </motion.div>
          <div className="flex flex-col md:flex-row max-w-[1020px] mx-auto justify-center gap-12 items-start w-full">
            <motion.div
              className="w-full text-center items-center sm:items-start sm:text-left flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <motion.ul
                className="list-none flex self-start flex-col gap-6 items-start"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3, // Controls the delay between each child animation
                      delayChildren: 0.2, // Initial delay before staggering starts
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {whyFreelanceContent.map(({ id, title, content }) => (
                  <motion.li
                    key={id}
                    className="flex items-start gap-3 text-start"
                    variants={{
                      hidden: { opacity: 0, x: -20 }, // Slide in from left
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                  >
                    <div className="flex-shrink-0 ">
                      <CheckCircle2Icon
                        className="text-primary size-5 md:size-6"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h5 className="sm:text-lg font-semibold text-[#101828]">
                        {title}
                      </h5>
                      <p className="text-sm text-[#475467]">{content}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-[270px] md:h-[370px] w-full"
            >
              <Image
                src="/assets/images/free_need.jpg"
                alt="freelancer image"
                width={1200}
                height={800}
                className="object-cover h-full w-full"
                quality={75}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
              />
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="overflow-hidden">
        <Container className="bg-white md:bg-[#F5F5F5] py-7 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center gap-4 "
          >
            <h2 className="text-xl md:text-3xl font-semibold text-center">
              Benefits of Using ReconXi
            </h2>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-0 gap-x-9 md:gap-y-8 gap-y-6"
          >
            {benefitContent.map(({ id, title, content }, index) => (
              <motion.li
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 * index,
                  type: "spring",
                  stiffness: 100,
                }}
                key={id}
                className="md:bg-white grid  auto 1fr auto gap-1 md:gap-4 md:p-8 rounded-[12px] h-18 md:h-40"
              >
                <h2 className="font-bold  md:text-xl">{title}</h2>
                <p className="text-sm md:text-base text-[#3B3E45] line-clamp-3">
                  {content}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>
      <section>
        <Container className="py-4 md:py-10 mt-5 md:mt-0 w-full">
          <div className="flex flex-col-reverse md:flex-row-reverse max-w-[960px] mx-auto justify-center gap-12 items-center w-full">
            <motion.div
              className="flex items-center flex-col justify-center md:items-start max-w-4xl mx-auto w-full text-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Form />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-full min-h-[500px] w-full"
            >
              <Image
                src="/assets/images/free_ready.jpg"
                alt="freelancer image"
                width={1200}
                height={800}
                className="object-cover h-full w-full"
                quality={75}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
              />
            </motion.div>
          </div>
        </Container>
      </section>
      <FAQSection />
      <Footer />
    </>
  );
};

export default page;
