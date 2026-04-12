import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DealWatcher",
  description: "track product prices effortlessly and save money on your online shopping",
  icons: {
    icon: "/assets/icons/logo.svg",
    shortcut: "/assets/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-surface-bg text-text-primary min-h-screen`}>
        {/* Dark gradient mesh — fixed full-screen backdrop */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, rgba(99,51,255,0.22) 0%, transparent 55%),
              radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.18) 0%, transparent 55%),
              radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 60%),
              #08080F
            `,
          }}
        />

        {/* Sticky frosted-glass navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-glass-border"
          style={{
            background: "rgba(8,8,15,0.55)",
            backdropFilter: "blur(40px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div className="max-w-10xl mx-auto">
            <Navbar />
          </div>
        </header>

        <main className="max-w-10xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
