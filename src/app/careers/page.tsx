"use client";

import Container from "@/src/components/Container";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Footer from "@/src/components/Footer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // From feat/page-animations
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"; // From dev

const hiringSteps = [
  "Explore available roles that match your skills and experience.",
  "Submit your application via our online form.",
  "Receive an instant confirmation email after applying.",
  "Interview Process – Shortlisted candidates will be contacted for an interview with our hiring team.",
  "Join the Team – Successful candidates receive an offer and onboarding support.",
];

const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "London, United Kingdom",
    description:
      "As a Frontend Developer at ReconXi, you will build interactive interfaces to enhance the user experience of our platform.",
    salary: "$500K - $900K / month",
  },
  {
    id: 2,
    title: "DevOps Engineer",
    location: "London, United Kingdom",
    description:
      "As a DevOps Engineer, you will ensure smooth deployment processes, infrastructure reliability, and system security.",
    salary: "$500K - $900K / month",
  },
  {
    id: 3,
    title: "Product Designer",
    location: "London, United Kingdom",
    description:
      "As a Product Designer at ReconXi, you will play a critical role in shaping the user experience of our products.",
    salary: "$500K - $900K / month",
  },
  {
    id: 4,
    title: "Product Manager",
    location: "London, United Kingdom",
    description:
      "As a Product Manager, you will oversee product strategy, roadmap execution, design, and engineering teams.",
    salary: "$500K - $900K / month",
  },
  {
    id: 5,
    title: "Backend Engineer",
    location: "London, United Kingdom",
    description:
      "As a Backend Engineer, you will develop and maintain the core systems that power our products.",
    salary: "$500K - $900K / month",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "London, United Kingdom",
    description:
      "As a Marketing Specialist, you will drive brand awareness and optimize customer engagement strategies.",
    salary: "$500K - $900K / month",
  },
];

export default function Careers() {
  const router = useRouter();
  const [steps] = useState(hiringSteps);
  const [jobs] = useState(jobListings);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const totalRows = jobs.length;

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  const totalPages = Math.ceil(jobs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <Container className="h-full w-full flex items-center justify-center py-8 mb-10">
        <div className="inline-flex flex-col items-center">
          {/* Header Section */}
          <motion.div
            className="py-[10px] md:py-[14px] w-full flex flex-col items-center mb-[40px] md:mb-[64px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="bg-[#E6FFF2] rounded-[16px] py-1 px-3 text-[20px] text-[#2E604A] mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Careers
            </motion.p>

            <motion.h1
              className="text-[28px] md:text-[42px] lg:text-[60px] font-semibold max-w-[1084px] text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Careers at ReconXi – Build the Future of Financial Reconciliation
            </motion.h1>

            <motion.p
              className="text-[18px] text-center text-[#525252]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore job opportunities across various fields that fit your
              skills and career aspirations.
            </motion.p>
          </motion.div>

          {/* Pagination Select Dropdown */}
          <div className="flex items-center gap-4 mt-6">
            <p className="text-[16px]">Rows per page:</p>
            <Select onValueChange={handleRowsPerPageChange}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={`${rowsPerPage}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="18">18</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
