import Image from "next/image";
import HomePage from "./(guest)/home";
import { Metadata } from "next";
import Features1 from "../components/features1";

export const metadata: Metadata = {
  title: "AI-Powered Financial Reconciliation System",
  description:
    "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI. No more manual matching—get accurate results in seconds.",
};
export default function Home() {
  return (
    <div>
      <HomePage />
      <Features1 />
    </div>
  );
}
