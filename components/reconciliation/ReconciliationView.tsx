"use client";

import { useMedia } from "react-use";
import { MobileReconciliationView } from "@/components/reconciliation/MobileReconciliationView";
import { ReconciliationTable } from "@/components/reconciliation/ReconciliationTable";

export function ReconciliationView() {
  const isMobile = useMedia("(max-width: 768px)");

  return isMobile ? <MobileReconciliationView /> : <ReconciliationTable />;
}
