import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCIJUDGE AI",
  description:
    "AI-powered scientific research evaluation platform for students, researchers, and science fair judges.",
  keywords: [
    "AI",
    "Research",
    "Scientific Papers",
    "Science Fair",
    "ISEF",
    "Research Evaluation",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Yassin Ali" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#030712] text-white overflow-x-hidden">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}