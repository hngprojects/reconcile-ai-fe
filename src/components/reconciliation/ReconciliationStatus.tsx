import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/router";
import { Bell } from "lucide-react";

export function ReconciliationStatus() {
  const [isReconciling, setIsReconciling] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isReconciling) {
      const interval = setInterval(() => {
        // Check localStorage for results
        const results = localStorage.getItem("reconciliation");
        if (results) {
          setIsReconciling(false);
          setHasResult(true);
          new Audio("/notification.mp3").play();
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isReconciling]);

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="default"
        size="lg"
        className="rounded-full p-4"
        onClick={() => {
          if (hasResult) {
            router.push("/reconciliation/results");
          }
        }}
      >
        <Bell className={hasResult ? "text-green-500" : "text-gray-500"} />
        {hasResult && <span className="ml-2">Results Ready!</span>}
      </Button>
    </div>
  );
}
