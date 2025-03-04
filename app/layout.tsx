import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Reconcile AI",
  description: "Reconcile AI is an easy-to-use reconciliation platform (web app) for comparing any two sets of financial records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
