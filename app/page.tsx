
import Image from "next/image";
import HomePage from "./(guest)/home";
import ComingSoon from "./(guest)/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Financial Reconciliation System",
  description:
    "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI. No more manual matching—get accurate results in seconds.",
};
export default function Home() {
  return <HomePage />;
}
