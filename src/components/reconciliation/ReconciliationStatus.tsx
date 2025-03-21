import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export function ReconciliationStatus() {
  const [isReconciling, setIsReconciling] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if there's a reconciliation in progress
    const reconciliationId = localStorage.getItem("reconciliation_id");
    if (reconciliationId) {
      setIsReconciling(true);

      const checkResults = async () => {
        try {
          const response = await fetch(
            `/api/reconciliation/${reconciliationId}/status`,
          );
          const data = await response.json();

          if (data.status === "completed") {
            setIsReconciling(false);
            setHasResult(true);
            new Audio("/notification.mp3").play();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error checking reconciliation status:", error);
          return false;
        }
      };

      const interval = setInterval(async () => {
        const isComplete = await checkResults();
        if (isComplete) {
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleClick = () => {
    const reconciliationId = localStorage.getItem("reconciliation_id");
    if (hasResult && reconciliationId) {
      router.push(`/reconciliation/${reconciliationId}`);
      // Clear the ID after navigation
      localStorage.removeItem("reconciliation_id");
      setHasResult(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="default"
        size="lg"
        className="rounded-full p-4"
        onClick={handleClick}
        disabled={!hasResult}
      >
        <Bell className={hasResult ? "text-green-500" : "text-gray-500"} />
        {isReconciling ? (
          <span className="ml-2">Processing...</span>
        ) : (
          hasResult && <span className="ml-2">Results Ready!</span>
        )}
      </Button>
    </div>
  );
}
