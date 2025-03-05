import type { Metadata } from "next";
import { Inter, Baloo_Paaji_2 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const balooPaaji2 = Baloo_Paaji_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Financial Reconciliation System",
  description:
    "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI. No more manual matching—get accurate results in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${balooPaaji2.variable} antialiased`}>
        <Nav />

        {children}
        <Footer />
      </body>
    </html>
  );
}
