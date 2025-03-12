// import Container from "@/src/components/Container";
// import { ReconciliationView } from "@/src/components/reconciliation/main/ReconciliationView";

// export default function ReconciliationPage() {
//   return (
//     <Container>
//       <ReconciliationView />
//     </Container>
//   );
// }

"use client";
import { useState } from "react";
import PossibleMatch from "@/src/components/PossibleMatch";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 
        className="border border-gray-200/70 flex-1 w-full my-4 cursor-pointer" 
        onClick={() => setOpen(true)}
      >
        Click to Open
      </h1>
      <PossibleMatch open={open} setOpen={setOpen} />
      <h1>hello</h1>
    </div>
  );
}

