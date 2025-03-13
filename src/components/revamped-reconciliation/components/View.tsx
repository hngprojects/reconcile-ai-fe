"use client";

import DesktopView from "./DesktopView";

export function View() {
  return (
    <DesktopView />
    // <div>
    //   <div className="md:hidden">
    //     <div>MOBILE</div>
    //     {/* <MobileReconciliationView /> */}
    //   </div>
    //   <div className="hidden md:block">
    //     <DesktopView />
    //   </div>
    // </div>
  );
}
