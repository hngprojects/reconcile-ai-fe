import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/src/components/ui/button";
import UploadCard from "./UploadCard";
import { toast } from "sonner";
import { reconcileFiles } from "@/src/lib/api";
import { FileUploadLayoutProps } from "./types";
import Container from "@/src/components/Container";
import ErrorModal from "@/src/components/modal/ErrorModal";
import LimitReachedModal from "@/src/components/modal/LimitReachedModal";
import { useAuth } from "@/src/components/context/AuthContext";
import { countCsvRows } from "@/src/utils/csvHelpers";
import { useRouter } from "next/navigation";

const PLAN_LIMITS: { [key: string]: number } = {
  basic: 5,
  starter: 20,
  business: Infinity,
};

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const [bankFiles, setBankFiles] = useState<File[]>([]);
  const [ledgerFiles, setLedgerFiles] = useState<File[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [errorCode, setErrorCode] = useState<number>();
  const [userPlan, setUserPlan] = useState<string>("basic");
  const [reconciliationCount, setReconciliationCount] = useState<number>(0);
  const router = useRouter();

  const getPlanLimit = (plan: string): number => {
    return PLAN_LIMITS[plan] ?? PLAN_LIMITS["basic"];
  };

  const currentPlanLimit = useMemo(() => getPlanLimit(userPlan), [userPlan]);

  const fetchPlanAndCount = useCallback(async () => {
    try {
      const plan =
        isAuthenticated && user && user.payment_plan?.plan
          ? user.payment_plan.plan.plan
            ? user.payment_plan.plan.plan.toLowerCase()
            : user.payment_plan.plan.toLowerCase()
          : "basic";

      setUserPlan(plan);

      const storedCount = user?.payment_plan?.reconciliations_used || 0;
      setReconciliationCount(storedCount);
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchPlanAndCount();
  }, [fetchPlanAndCount]);

  const handleFileDelete = (fileName: string, type: "bank" | "ledger") => {
    if (type === "bank") {
      setBankFiles((files) => files.filter((f) => f.name !== fileName));
    } else {
      setLedgerFiles((files) => files.filter((f) => f.name !== fileName));
    }
  };

  const validateRowCount = async (files: File[]): Promise<boolean> => {
    if (!isAuthenticated) return true;

    const totalRows = await Promise.all(files.map(countCsvRows));
    return totalRows.reduce((sum, count) => sum + count, 0) <= 100;
  };

  const handleReconciliation = async () => {
    if (bankFiles.length === 0 || ledgerFiles.length === 0) return;

    try {
      if (!isAuthenticated) {
        const [bankValid, ledgerValid] = await Promise.all([
          validateRowCount(bankFiles),
          validateRowCount(ledgerFiles),
        ]);

        if (!bankValid || !ledgerValid) {
          setErrorCode(403);
          setShowErrorModal(true);
          return;
        }
      }

      const toastId = toast.loading(
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Processing Reconciliation</h2>
          <p className="text-sm text-gray-600">
            {isAuthenticated
              ? "You will get an email notification when it's ready"
              : "Your files are being processed"}
          </p>
        </div>,
        { duration: Infinity }
      );

      const result = await reconcileFiles(bankFiles, ledgerFiles);

      if (result.status === "error") {
        toast.dismiss(toastId);

        // Handle rate limit error specifically
        if (result.code === 429) {
          setShowLimitModal(true);
        } else {
          setErrorCode(result.code);
          setShowErrorModal(true);
        }
        return;
      }

      if (result.status === "success") {
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 5000);

        router.push("/dashboard");

        localStorage.setItem(
          "reconciliation_id",
          result.data.reconciliation_id
        );
        setBankFiles([]);
        setLedgerFiles([]);

        const newCount = reconciliationCount + 1;
        setReconciliationCount(newCount);
        localStorage.setItem("reconcileCount", newCount.toString());
      }

      setTimeout(() => {
        onReconcile(bankFiles, ledgerFiles);
      }, 1000);
    } catch (error) {
      console.error("Error in reconciliation handler:", error);
      const reconciliationError = error as Error & {
        code?: number;
        status?: number;
      };

      // Check for rate limit error in catch block too
      if (
        reconciliationError.code === 429 ||
        reconciliationError.status === 429
      ) {
        setShowLimitModal(true);
      } else {
        setErrorCode(reconciliationError.code || reconciliationError.status);
        setShowErrorModal(true);
      }
    }
  };

  const handleUpgrade = () => {
    setShowLimitModal(false);
  };

  return (
    <Container className="my-10">
      <div className="flex flex-col lg:flex-row justify-center gap-[40px]">
        <UploadCard
          title="Upload Bank Statement"
          type="bank"
          files={bankFiles}
          onFilesSelect={setBankFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, "bank")}
          existingFiles={[...bankFiles, ...ledgerFiles].map((f) => f.name)}
        />
        <UploadCard
          title="Upload Company Ledger"
          type="ledger"
          files={ledgerFiles}
          onFilesSelect={setLedgerFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, "ledger")}
          existingFiles={[...bankFiles, ...ledgerFiles].map((f) => f.name)}
        />
      </div>

      <Button
        onClick={handleReconciliation}
        disabled={
          bankFiles.length === 0 || ledgerFiles.length === 0 || !isAuthenticated
        }
        className="mt-[40px] w-full md:w-[552px] h-[64px] bg-[#2E604A] disabled:bg-opacity-50 px-4 md:px-[200px] py-[16px] rounded-[8px] mx-auto block cursor-pointer"
      >
        Reconcile
      </Button>

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <LimitReachedModal
          open={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          onUpgrade={handleUpgrade}
        />
      )}

      {/* General Error Modal */}
      {showErrorModal && (
        <ErrorModal
          open={showErrorModal}
          onOpenChange={() => setShowErrorModal(false)}
          errorCode={errorCode}
        />
      )}
    </Container>
  );
}
