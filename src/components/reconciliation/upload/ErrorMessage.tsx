import { ErrorMessageProps } from "./types";
import { AlertIcon } from "../../Icon/Icons";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 text-[#C50700]">
      <AlertIcon className="w-4 h-4" />
      <span className="text-[14px]">{message}</span>
    </div>
  );
}
