"use client";
import { useState } from "react";
import { ArrowDown, ArrowLeft, Download } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Footer from "@/src/components/Footer";
import Container from "@/src/components/Container";

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  status: "Successful" | "Pending" | "Failed";
  plan: string;
  amount: string;
}

// const billingHistory: BillingRecord[] = [
//   {
//     id: "1",
//     date: "Dec 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "2",
//     date: "Nov 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "3",
//     date: "Oct 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "4",
//     date: "Sep 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "5",
//     date: "Aug 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "6",
//     date: "Jul 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "7",
//     date: "Jun 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "8",
//     date: "May 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "9",
//     date: "Apr 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
//   {
//     id: "10",
//     date: "Mar 1, 2024",
//     description: "Monthly Subscription",
//     status: "Successful",
//     plan: "Starter Plan",
//     amount: "USD $10.00",
//   },
// ];

const billingHistory: BillingRecord[] = [];
export default function BillingHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalRows = billingHistory.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const currentData = billingHistory.slice(startRow - 1, endRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <Container className="mt-8 flex flex-col gap-6 self-stretch">
        <Link href="/" className="flex items-center gap-2 w-fit cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
          <p className="text-[#333] font-inter text-base font-medium leading-[38px]">
            Go back
          </p>
        </Link>

        <div className="flex justify-between items-center">
          <h1 className="self-stretch text-[#101828] font-inter text-lg font-semibold leading-7">
            Billing History
          </h1>
          {!!billingHistory.length && (
            <button className="flex items-center justify-center gap-2 px-4 py-[10px] rounded-lg border border-gray-300 bg-white hover:bg-accent shadow-sm cursor-pointer ">
              <Download className="w-6 h-6" />
              <p className="text-gray-700 text-sm font-semibold leading-5">
                Download all
              </p>
            </button>
          )}
        </div>

        {billingHistory.length ? (
          <>
            <div className="overflow-x-auto rounded-[12px] border border-gray-200 bg-white">
              <table className="w-full border-collapse text-sm">
                {/* Table Head */}
                <thead>
                  <tr className="text-left font-semibold border-b border-gray-200 bg-gray-50 h-[44px]">
                    <th className="p-3 cursor-pointer flex items-center gap-1">
                      <p className="text-[#151515] font-inter text-xs font-semibold leading-[18px]">
                        Billing Date
                      </p>
                      <ArrowDown className="w-4 h-4" />
                    </th>
                    <th className="p-3">
                      <p className="text-[#151515] font-inter text-xs font-semibold leading-[18px]">
                        Description
                      </p>
                    </th>
                    <th className="p-3">
                      <p className="text-[#151515] font-inter text-xs font-semibold leading-[18px]">
                        Status
                      </p>
                    </th>
                    <th className="p-3">
                      <p className="text-[#151515] font-inter text-xs font-semibold leading-[18px]">
                        Plan
                      </p>
                    </th>
                    <th className="p-3">
                      <p className="text-[#151515] font-inter text-xs font-semibold leading-[18px]">
                        Amount
                      </p>
                    </th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {currentData.map((item) => (
                    <tr
                      key={item.id}
                      className="h-18 px-6 py-4 items-center w-full border-b border-gray-200"
                    >
                      <td className="p-3 text-[#151515] text-sm font-normal leading-5">
                        {item.date}
                      </td>
                      <td className="text-[#151515] text-sm font-medium leading-5">
                        {item.description}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-[16px] bg-[#ECFDF3] mix-blend-multiply text-[#027A48] text-center font-inter text-xs font-medium leading-[18px]">
                          <Image
                            src="/assets/images/check.svg"
                            alt="Success"
                            width={12}
                            height={12}
                          />
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-[#151515] text-sm font-normal leading-5">
                        {item.plan}
                      </td>
                      <td className="p-3 text-[#151515] text-sm font-normal leading-5">
                        {item.amount}
                      </td>
                      <td className="p-3 text-[#151515] text-sm font-normal leading-5">
                        <Download className="w-6 h-6 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hidden md:flex w-full max-w-[1200px] pt-4 pb-2 justify-between items-center border-t border-[#EFF1F3]">
              <div className="flex items-center gap-4">
                <p className="text-[#344054] font-inter text-[14px] font-medium leading-[20px]">
                  Rows per page
                </p>
                <Select onValueChange={handleRowsPerPageChange}>
                  <SelectTrigger className=" flex justify-center items-center p-2 gap-[10px] rounded-[4px] border border-[#EFF1F3] cursor-pointer">
                    <SelectValue placeholder={`${rowsPerPage}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 5, 10].map((value) => (
                      <SelectItem
                        key={value}
                        value={value.toString()}
                        className="flex items-center gap-2 h-12 px-3 py-2 cursor-pointer text-[#344054] text-[14px]"
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[14px] font-medium leading-[20px] text-[#344054] font-inter">
                  {startRow}-{endRow} of {totalRows} rows
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className={`px-4 py-2 rounded-[8px] border border-[#D0D5DD] ${currentPage === 1 ? "bg-white cursor-not-allowed text-[#344054]" : "bg-[#297B65] text-white cursor-pointer"}`}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <p>
                  {currentPage} of {totalPages}
                </p>
                <Button
                  className={`px-4 py-2 rounded-[8px] border border-[#D0D5DD] ${currentPage === totalPages ? "bg-white cursor-not-allowed text-[#344054]" : "bg-[#297B65] text-white cursor-pointer"}`}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 mt-12 mb-20">
            <div>
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/images/no_billing.png"
                  alt="No Billing History"
                  width={350}
                  height={270}
                  className=""
                  quality={75}
                  priority={true}
                />
              </div>
              <div className="flex flex-col items-center gap-1 max-w-md">
                <h5 className="font-medium text-2xl">No Billing History Yet</h5>
                <p className="text-center text-[#333333]">
                  It looks like you haven’t made any payments yet. Once you do,
                  you’ll see them here.
                </p>
                <Link
                  href="/pricing"
                  className="mt-4 cursor-pointer w-full text-sm font-medium hover:bg-accent border rounded-md h-10 flex justify-center items-center text-primary hover:text-primary border-primary"
                >
                  View Pricing Plan
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}
