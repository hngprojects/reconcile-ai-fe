import { cn } from "@/lib/utils";
import { StatusBadgeProps } from "@/types/status-badge";
import { Check as CheckIcon, X as XIcon } from "lucide-react";

export function StatusBadge({ matched, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-sm font-semibold px-1",
        matched ? "bg-[#F3FEFA] text-[#007A55]" : "bg-[#FFF4F0] text-[#C50700]",
        className
      )}
    >
      {matched ? "Matched" : "Unmatched"}
      <div
        className={cn(
          "h-4 w-4 rounded-full ml-2 flex items-center justify-center",
          matched ? "bg-[#007A55]" : "bg-[#C50700]"
        )}
      >
        {matched ? (
          <CheckIcon className="h-3 w-3 text-white" />
        ) : (
          <XIcon className="h-3 w-3 text-white" />
        )}
      </div>
    </div>
  );
}
