import { SmoothScrolling } from "@/components/ui/smooth-scrolling";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "smegomade® — KNOWLEDGE. Design Education",
  description:
    "smegomade is a multidisciplinary graphic designer behind cover art, custom typography, and visual identities for global artists. Now sharing the knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-black text-white">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
