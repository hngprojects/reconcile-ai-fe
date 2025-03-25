"use client";

import { useState } from "react";
import { DashboardInfoCards } from "./DashboardInfoCards";
import { ReconciliationHistoryTable } from "./ReconciliationHistoryTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "../Icon/Icons";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <DashboardInfoCards />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-80">
            <Input
              placeholder="Search by records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-2 w-full"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Go</Button>
        </div>
      </div>

      <ReconciliationHistoryTable />
    </div>
  );
};
