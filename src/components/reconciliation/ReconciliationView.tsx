"use client";

import { useMedia } from "react-use";
import { MobileReconciliationView } from "./MobileReconciliationView";
import { ReconciliationTable } from "./ReconciliationTable";

export function ReconciliationView() {
  const isMobile = useMedia("(max-width: 768px)");

  return isMobile ? <MobileReconciliationView /> : <ReconciliationTable />;
}
