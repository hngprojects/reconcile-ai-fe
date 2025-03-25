"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardInfoCards } from "./DashboardInfoCards";
import { FilterDropdown } from "./FilterDropdown";
import ReconciliationHistory from "./ReconciliationHistory";
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

        <Link
          href="/file-upload"
          className="cursor-pointer text-sm font-medium border rounded-md h-12 flex justify-center items-center bg-primary hover:bg-primary/90 text-white px-10"
        >
          <Plus className="mr-2 !size-5" /> Upload Files
        </Link>
      </div>

      {/* <ReconciliationHistoryTable /> */}
      <ReconciliationHistory
        fromDate={fromDate}
        toDate={toDate}
        isFilterApplied={isFilterApplied}
      />
    </div>
  );
};
