"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DashboardInfoCards } from "./DashboardInfoCards";
import { FilterDropdown } from "./FilterDropdown";
import ReconciliationHistory from "./ReconciliationHistory";
import { ReconciliationHistoryType } from "@/src/types/reconciliation";
import { fetchReconciliationHistory } from "@/src/lib/api";

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [reconciliations, setReconciliations] = useState<
    ReconciliationHistoryType[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchReconciliationHistory();
      setReconciliations(res.data as ReconciliationHistoryType[]);
    };

    fetch();
  }, []);

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
        <Button
          className="bg-primary hover:bg-primary/90 md:!px-10 cursor-pointer"
          size="lg"
          onClick={() => (window.location.href = "/file-upload")}
        >
          <Plus className="mr-2 !size-5" /> Upload Files
        </Button>
      </div>

      {/* <ReconciliationHistoryTable /> */}
      <ReconciliationHistory
        fromDate={fromDate}
        toDate={toDate}
        isFilterApplied={isFilterApplied}
        reconciliations={reconciliations}
      />
    </div>
  );
};
