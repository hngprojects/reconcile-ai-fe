import type { Metadata } from "next";
import { Inter, Baloo_Paaji_2 } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import Nav from "@/src/components/Nav";

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
        url: "/seo-image.png",
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
    images: ["/seo-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "ReconXi",
  category: "Financial Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <head>
        <meta
          name="google-site-verification"
          content="28pBz0UhT1sDm1ccjNQ6_ajz59wpNfpvGUV2lQvFRzQ"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GJKRNRM550"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-GJKRNRM550'); `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${balooPaaji2.variable} antialiased`}>
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
      </body>
    </html>
  );
}
