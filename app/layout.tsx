import type { Metadata } from "next";
import { Inter, Baloo_Paaji_2 } from "next/font/google";
import "./globals.css";

import { Toaster } from 'sonner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const balooPaaji2 = Baloo_Paaji_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReconXi",
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
        {children}
        <Toaster
          position="top-right"
            // closeButton
            toastOptions={{
              style: {
                background: '#EEFFEE',
                width: "438px",
                height: "48px",
                padding:"12px 24px",
                borderRadius: "8px",
                boxShadow: "none"
              },
            }}
        />
      </body>
    </html>
  );
}
