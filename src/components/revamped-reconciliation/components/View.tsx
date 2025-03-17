"use client";

import { ReconciliationProvider } from "../context/ReconciliationProvider";
import DesktopView from "./DesktopView";
import { MobileView } from "./MobileView";

export function View() {
  return (
    <ReconciliationProvider>
      <div className="md:hidden">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </ReconciliationProvider>
  );
}
