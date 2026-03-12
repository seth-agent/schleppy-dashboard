import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schleppy Dashboard",
  description: "Observability dashboard for the Schleppy AI agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ConvexClientProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-card-border px-6 py-4">
              <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                <h1 className="text-xl font-bold tracking-tight">
                  Schleppy Dashboard
                </h1>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm text-muted">Online</span>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
