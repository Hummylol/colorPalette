"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toggle } from "@/components/toggle";
import { ColorContextProvider } from "./context/ColorContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorContextProvider>
            {children}
            <Toaster position="top-right"/>
          </ColorContextProvider>
          <div className="fixed bottom-2 right-2">
            <Toggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
