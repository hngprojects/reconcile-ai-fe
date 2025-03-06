"use client";

import { useMedia } from "react-use";
import { MobileReconciliationView } from "./MobileReconciliationView";
import { ReconciliationTable } from "./ReconciliationTable";
import Header from "@/app/coming-soon/components/Header";

export function ReconciliationView() {
  const isMobile = useMedia("(max-width: 768px)");

  return isMobile ? 
  <>
  <Header />
  <MobileReconciliationView />
  </> :
   <>
    <Header />
    <ReconciliationTable />
   </>;
}
