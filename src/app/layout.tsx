import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "DEEYORA — Digital Marketing & Growth Agency",
  description: "DEEYORA helps businesses grow through digital marketing, SEO, performance marketing, creative strategy, websites and AI-powered marketing solutions.",
  keywords: ["digital marketing agency", "SEO", "performance marketing", "social media marketing", "AI marketing", "brand strategy", "DEEYORA"],
  authors: [{ name: "DEEYORA" }],
  creator: "DEEYORA",
  metadataBase: new URL("https://deeyora.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deeyora.com",
    siteName: "DEEYORA",
    title: "DEEYORA — Digital Marketing & Growth Agency",
    description: "DEEYORA helps businesses grow through digital marketing, SEO, performance marketing, creative strategy, websites and AI-powered marketing solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEEYORA — Digital Marketing & Growth Agency",
    description: "Digital Growth. Designed to Perform.",
    creator: "@deeyora",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://deeyora.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DEEYORA",
              "url": "https://deeyora.com",
              "description": "Digital Marketing & Growth Agency",
              "slogan": "Digital Growth. Designed to Perform.",
              "serviceType": ["Digital Marketing", "SEO", "Performance Marketing", "Social Media Marketing", "AI Marketing"],
            }),
          }}
        />
      </head>
      <body>
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
