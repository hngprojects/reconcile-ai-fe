"use client";

import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import Footer from "@/src/components/Footer";
import Container from "@/src/components/Container";
import { getBillingHistory } from "@/src/lib/api";
import { Loader } from "@/src/components/ui/loader";

interface BillingRecord {
  id: number;
  amount: number;
  description: string;
  plan: string;
  transaction_date: string;
  status: string;
}

const BillingHistory = () => {
  const router = useRouter();

  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getBillingHistory(currentPage, rowsPerPage);
        if (response.data) {
          setBillingHistory(response.data);
          setTotalRows(response.meta.total);
          setTotalPages(response.meta.last_page);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage]);

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-[#ECFDF3] text-[#027A48]";
      case "pending":
        return "bg-[#FFFAEB] text-[#B54708]";
      case "failed":
        return "bg-[#FEF3F2] text-[#B42318]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container className="mt-8 flex flex-col gap-6 self-stretch">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-2 w-fit cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
          <p className="text-[#333] font-inter text-base font-medium leading-[38px]">
            Go back
          </p>
        </div>

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
        {billingHistory.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-[12px] border border-gray-200 bg-white">
              <table className="w-full border-collapse text-sm">
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
                <tbody>
                  {billingHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-3">
                        {formatDate(item.transaction_date)}
                      </td>

                      <td className="py-3">
                        {item.description || "Monthly Subscription"}
                      </td>
                      <td className="py-3">
                        <span
                          className={`${getStatusStyle(item.status)} inline-flex items-center gap-1 px-2 py-[2px] rounded-[16px]`}
                        >
                          {item.status === "completed" ? (
                            <>
                              <Image
                                src="/assets/images/check.svg"
                                alt="Success"
                                width={12}
                                height={12}
                              />
                              Successful
                            </>
                          ) : (
                            item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)
                          )}
                        </span>
                      </td>
                      <td className="py-3">{item.plan}</td>
                      <td className="py-3">${item.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <Download className="w-6 h-6 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="hidden md:flex justify-between items-center border-t border-[#EFF1F3]">
              <div className="flex items-center gap-4">
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={(v) => {
                    setRowsPerPage(Number(v));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm">
                  Showing {(currentPage - 1) * rowsPerPage + 1}-
                  {Math.min(currentPage * rowsPerPage, totalRows)} of{" "}
                  {totalRows} entries
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
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
};

export default BillingHistory;
