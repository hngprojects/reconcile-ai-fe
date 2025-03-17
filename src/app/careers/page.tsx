"use client";

import Container from "@/src/components/Container";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import Footer from "@/src/components/Footer";
// import Link from "next/link";

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
    title: "Product designer",
    location: "London, United Kingdom",
    description:
      "As a Product designer at the ReconXi, you will play a critical role in shaping the user experience of the products",
    salary: "$500K - $900K / month",
  },
  {
    id: 4,
    title: "Product Manager",
    location: "London, United Kingdom",
    description:
      "As a Product Manager, you will oversee product strategy, roadmap execution, design and engineering teams.",
    salary: "$500K - $900K / month",
  },
  {
    id: 5,
    title: "Backend Engineer",
    location: "London, United Kingdom",
    description:
      "As a Product designer at the ReconXi, you will play a critical role in shaping the user experience of the products",
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
  const [steps] = useState(hiringSteps);
  const [jobs] = useState(jobListings);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const totalPages = Math.ceil(jobs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Container className="h-full w-full flex items-center justify-center py-8">
        <div className="inline-flex flex-col items-center">
          <div className="flex w-[1200px] p-[14px_0px_5px_0px] flex-col justify-center items-center gap-[24px]">
            <div className="flex w-[996px] py-[10px] flex-col justify-center items-center gap-[24px]">
              <div className="flex items-center p-[4px_12px] rounded-[16px] bg-[#E6FFF2] mix-blend-multiply">
                <p className="text-[#2E604A] text-center font-inter text-[20px] font-normal leading-normal">
                  Careers
                </p>
              </div>
              <h1 className="self-stretch text-[#0A0A0A] text-center font-inter text-[60px] font-semibold leading-normal">
                Careers at ReconXi – Build the Future of Financial
                Reconciliation
              </h1>
              <p className="text-[#525252] text-center font-inter text-[20px] font-normal leading-normal">
                Explore job opportunities across various fields that fit for
                your skills and career aspirations.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[64px] self-stretch bg-white py-[64px]">
            <div className="flex w-[1200px] justify-center items-center gap-[64px]">
              <div className="flex flex-col justify-center items-start gap-[64px] flex-[1_0_0]">
                <div className="flex flex-col items-start gap-[32px] self-stretch">
                  <h1 className="self-stretch text-[#101828] font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
                    Our Hiring Process
                  </h1>
                  <p className="self-stretch text-[#475467] font-inter text-[20px] font-normal leading-[30px]">
                    We believe in a transparent, structured, and engaging hiring
                    process to ensure the best fit for both you and our team.
                  </p>
                  <ul className="flex flex-col items-start gap-[30px] self-stretch">
                    {steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-[16px] self-stretch"
                      >
                        <Image
                          src="/assets/images/Star 1.svg"
                          alt="Star Icon"
                          width={32}
                          height={32}
                        />
                        <p className="text-[#475467] font-inter text-[16px] font-normal leading-[24px]">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex w-[634px] flex-col items-start gap-[64px] shrink-0">
                <Image
                  src="/assets/images/Image10.png"
                  alt="Group pic"
                  width={634}
                  height={400}
                  className="self-stretch"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[24px] self-stretch">
            <div className="flex flex-col items-center gap-[20px]">
              <h1 className="self-stretch text-center text-[#101828] font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
                Open positions
              </h1>
              <p className="w-[1200px] text-center text-[#333] font-inter text-[20px] font-normal leading-[30px]">
                Want to work with some of the best global talent and build
                software used by all the companies you know and love? Join the
                team — we’re hiring!
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-[29px] self-stretch">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[29px] w-[1200px]">
                {selectedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col justify-center items-start gap-[24px] p-[24px] rounded-[6px] border border-[#CBD5E1]"
                  >
                    <div className="flex flex-col items-start gap-[24px] self-stretch">
                      <div className="flex flex-col items-start gap-[12px]">
                        <h3 className="text-[#0A0A0A] font-inter text-[20px] font-medium leading-normal">
                          {job.title}
                        </h3>
                        <p className="text-[#525252] font-inter text-[16px] font-normal leading-normal">
                          {job.location}
                        </p>
                      </div>
                      <p className="self-stretch text-[#525252] font-inter text-[18px] font-normal leading-normal">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <div className="flex items-center gap-2">
                        <p className="text-[#525252] font-inter text-[16px] font-semibold leading-normal">
                          {job.salary}
                        </p>
                      </div>
                      <Link href={`/careers/${job.id}`}>
                        <Button>View details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Pagination Controls */}

          <div className="flex w-[1280px] pt-4 pb-2 justify-between items-center border-t border-[#EFF1F3]">
            <p className="text-[#344054] font-inter text-[14px] font-medium leading-[20px]">
              Rows per page
              <select
                className=" justify-center items-center p-[8px] m-[8px] rounded-[4px] border border-[#EFF1F3]"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
              </select>
            </p>
            <div className="flex items-center gap-4">
              <button
                className={`px-4 py-2 rounded-[8px] border border-[#D0D5DD] ${currentPage === 1 ? "bg-white cursor-not-allowed" : "bg-green-600 text-white "}`}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p>
                {currentPage} of {totalPages}
              </p>
              <button
                className={`px-4 py-2 rounded-[8px] border border-[#D0D5DD] ${currentPage === totalPages ? "bg-white cursor-not-allowed" : "bg-green-600 text-white"}`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
