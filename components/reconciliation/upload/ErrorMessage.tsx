import Image from "next/image";
import { ErrorMessageProps } from "./types";
import warningIcon from "@/public/alert-icon.svg";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-[#C50700]">
      <Image src={warningIcon} width={16} height={16} alt="Warning" />
      <span className="text-[14px]">{message}</span>
    </div>
  );
}
