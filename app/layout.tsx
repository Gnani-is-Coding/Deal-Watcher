import type { Metadata } from "next";
import {Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGreotesk = Space_Grotesk({ subsets: ['latin'], 
  weight: ['300','400','500','600','700']
})

export const metadata: Metadata = {
  title: "DealWatcher",
  description: "track product prices effortlessly and save money on your online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGreotesk.className}`}
      >
        <main className="max-w-10xl mx-auto">
        <Navbar/>
        </main>
        {children}
      </body>
    </html>
  );
}
