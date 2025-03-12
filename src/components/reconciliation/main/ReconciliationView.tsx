"use client";

import { MobileReconciliationView } from "./MobileReconciliationView";
import { DesktopReconciliationView } from "./DesktopReconciliationView";

export function ReconciliationView() {
  return (
    <div>
      <div className="md:hidden">
        <MobileReconciliationView />
      </div>
      <div className="hidden md:block">
        <DesktopReconciliationView />
      </div>
    </div>
  );
}
