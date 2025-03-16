import { cn } from "@/src/lib/utils";
import { StatusBadgeProps } from "@/src/types/status-badge";
import { Check as CheckIcon, X as XIcon } from "lucide-react";

export function StatusBadge({ matched, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-sm font-semibold px-1 h-full",
        matched
          ? "bg-[#F3FEFA] text-[#007A55] group-hover:bg-transparent"
          : "bg-[#FFF4F0] text-[#C50700]",
        className
      )}
    >
      {matched ? "Matched" : "Unmatched"}
      <div
        className={cn(
          "h-4 w-4 rounded-full ml-2 flex items-center justify-center flex-1",
          matched
            ? "bg-[#007A55] max-md:group-hover:bg-transparent"
            : "bg-[#C50700]"
        )}
      >
        {matched ? (
          <>
            <CheckIcon className="h-3 w-3 text-white max-md:group-hover:hidden" />
          </>
        ) : (
          <div
            title="unlink matching transactions"
            className="p-1 rounded-full max-md:hidden max-md:group-hover:block"
          >
            <XIcon
              strokeWidth={2}
              className="rounded-full h-4 w-4 text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
