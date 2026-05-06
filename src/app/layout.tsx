import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exact Age Calculator | Find Your Age in Years, Months, and Days",
  description: "Use our free Exact Age Calculator to instantly determine your chronological age. Accurately calculate years, months, days, and total days lived.",
  keywords: ["age calculator", "calculate my age", "exact age calculator", "chronological age", "date of birth calculator", "age difference"],
  authors: [{ name: "Age Calculator Team" }],
  openGraph: {
    title: "Exact Age Calculator | Find Your Age Instantly",
    description: "Accurately calculate your chronological age in years, months, and days with our free tool.",
    type: "website",
    url: "https://ahmedtls.pro",
    siteName: "Exact Age Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exact Age Calculator | Find Your Age Instantly",
    description: "Accurately calculate your chronological age in years, months, and days with our free tool.",
  },
  other: {
    "google-adsense-account": "ca-pub-7328437477810038",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  "name": "Exact Age Calculator",
                  "applicationCategory": "UtilitiesApplication",
                  "operatingSystem": "All",
                  "description": "A fast, privacy-friendly web-based tool to accurately calculate your exact chronological age in years, months, and days.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Article",
                  "headline": "How to Calculate Your Exact Age: The Complete Guide",
                  "author": {
                    "@type": "Person",
                    "name": "Ahmed Raza",
                    "url": "https://ahmedtls.pro/author/ahmed-raza",
                    "image": "https://ahmedtls.pro/author-profile.jpeg"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Exact Age Calculator",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://ahmedtls.pro/logo.png"
                    }
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://ahmedtls.pro/"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How is exact age calculated?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Exact age is calculated by finding the chronological difference between the current date and your date of birth, carefully accounting for leap years and the varying number of days in different months."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does this age calculator account for leap years?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, our exact age calculator algorithm accurately accounts for leap years when computing your total days lived and exact chronological age."
                      }
                    }
                   ]
                }
              ]
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7328437477810038"
          crossOrigin="anonymous"
        ></script>
        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2EN6KTJTE9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2EN6KTJTE9');
            `,
          }}
        />
      </head>
      <body className={`${sans.className} min-h-screen bg-background text-foreground flex flex-col`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
