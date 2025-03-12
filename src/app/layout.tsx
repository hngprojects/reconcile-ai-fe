import type { Metadata } from "next";
import { Inter, Baloo_Paaji_2 } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import Nav from "@/src/components/Nav";
import { AuthProvider } from "@/src/components/context/AuthContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const balooPaaji2 = Baloo_Paaji_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reconxi.com"),
  title: {
    default: "ReconXi - AI-Powered Financial Reconciliation",
    template: "%s | ReconXi",
  },
  description:
    "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI. No more manual matching—get accurate results in seconds.",
  keywords: [
    "financial reconciliation",
    "AI-powered reconciliation",
    "automated reconciliation",
    "financial matching",
    "accounting reconciliation",
    "financial analysis",
    "financial insights",
  ],
  authors: [{ name: "ReconXi Inc" }],
  creator: "ReconXi Inc",
  publisher: "ReconXi Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://reconxi.com",
    siteName: "ReconXi",
    title: "ReconXi - AI-Powered Financial Reconciliation",
    description:
      "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI.",
    images: [
      {
        url: "https://reconxi.com/seo-image.png",
        width: 1200,
        height: 630,
        alt: "ReconXi - AI-Powered Financial Reconciliation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReconXi - AI-Powered Financial Reconciliation",
    description:
      "AI-Powered Financial Reconciliation in Minutes, Not Hours. Automate, compare, and reconcile transactions effortlessly with AI.",
    creator: "@reconxi",
    images: ["https://reconxi.com/seo-image.png"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/icons/apple-icon.png" },
      { url: "/icons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/icons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      {
        url: "/icons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "ReconXi",
  category: "Financial Software",
  verification: {
    google: "28pBz0UhT1sDm1ccjNQ6_ajz59wpNfpvGUV2lQvFRzQ",
  },
  other: {
    "google-site-verification": "28pBz0UhT1sDm1ccjNQ6_ajz59wpNfpvGUV2lQvFRzQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ReconXi",
            url: "https://reconxi.com",
            logo: "https://reconxi.com/logo.svg",
          }),
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
        }}
      />
      <body className={`${inter.variable} ${balooPaaji2.variable} antialiased`}>
        <AuthProvider>
          <Nav />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#EEFFEE",
                width: "438px",
                height: "48px",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "none",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
