import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoJobs – Discover Jobs on the Map | Bengaluru",
  description:
    "Find your next tech job visually on a map. Browse openings at Google, Amazon, Microsoft, and 20+ top companies across Bengaluru.",
  keywords: [
    "jobs",
    "bengaluru",
    "map",
    "tech jobs",
    "software engineer",
    "careers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: "hidden" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
