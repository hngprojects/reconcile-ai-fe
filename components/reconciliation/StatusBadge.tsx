import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  matched: boolean;
  className?: string;
}

export function StatusBadge({ matched, className }: StatusBadgeProps) {
  const statusStyles = matched
    ? "bg-[#ECFDF3] text-[#006D3B]"
    : "bg-[#FEF3F2] text-[#B42318]";

  return (
    <div
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold",
        statusStyles,
        className
      )}
    >
      {matched ? "Matched" : "Unmatched"}
      {matched ? (
        <CheckCircle className="ml-2 h-4 w-4" />
      ) : (
        <XCircle className="ml-2 h-4 w-4" />
      )}
    </div>
  );
}
