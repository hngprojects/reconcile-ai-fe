import { cn } from "@/src/lib/utils";
import { StatusBadgeProps } from "@/src/types/status-badge";
import { CheckIcon, XIcon } from "../../Icon/Icons";

export function StatusBadge({
  matched,
  className,
  hideIcon,
  isMobile,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-sm font-semibold px-1",
        matched ? "bg-[#F3FEFA] text-[#007A55]" : "bg-[#FFF4F0] text-[#C50700]",
        className
      )}
    >
      {matched ? "Matched" : "Unmatched"}
      {!hideIcon && (
        <div
          className={cn(
            "h-4 w-4 rounded-full ml-2 flex items-center justify-center group",
            matched ? "bg-[#007A55]" : "bg-[#C50700]"
          )}
        >
          {matched ? (
            <CheckIcon className="h-4 w-4 text-white group-hover:hidden" />
          ) : (
            <XIcon className="h-2.5 w-2.5 text-white" />
          )}
        </div>
      )}
      {isMobile && hideIcon && (
        <XIcon className="h-2.5 w-2.5 ml-2 stroke-2 text-[#333333]" />
      )}
    </div>
  );
}
