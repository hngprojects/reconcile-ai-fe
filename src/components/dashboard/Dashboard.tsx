"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DashboardInfoCards } from "./DashboardInfoCards";
import { FilterDropdown } from "./FilterDropdown";
import { ReconciliationHistoryTable } from "./ReconciliationHistoryTable";
// import Image from "next/image";
// import Link from "next/link";

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleResetFilter = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setIsFilterApplied(false);
  };

  const handleApplyFilter = () => {
    setIsFilterApplied(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <DashboardInfoCards />

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
        <FilterDropdown
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onReset={handleResetFilter}
          onApply={handleApplyFilter}
          onClear={handleResetFilter}
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Pending activites</h2>
        <Button className="bg-primary hover:bg-primary/90 md:!px-10" size="lg">
          <Plus className="mr-2 !size-5" /> Upload Files
        </Button>
      </div>

      {/* Reconciliation History Empty State */}
      {/* <div className="flex flex-col items-center gap-6 mt-12 mb-20">
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
              It looks like you haven&apos;t made started reconciling. Once you
              do, you&apos;ll see there progress here.
            </p>
            <Link
              href="/file-upload"
              className="mt-4 cursor-pointer w-full text-sm font-medium hover:bg-accent border rounded-md h-10 flex justify-center items-center text-primary hover:text-primary border-primary"
            >
              Start Reconciliation
            </Link>
          </div>
        </div>
      </div> */}

      {/* <ReconciliationHistoryTable /> */}
      <ReconciliationHistoryTable
        fromDate={fromDate}
        toDate={toDate}
        isFilterApplied={isFilterApplied}
      />
    </div>
  );
};
