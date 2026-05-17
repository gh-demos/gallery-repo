import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { Camera } from "lucide-react";
import { ThemeToggle } from "@/components/ui";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const themeInitScript = `
(() => {
  const root = document.documentElement;
  let storedTheme = null;
  let prefersDark = false;

  try {
    storedTheme = window.localStorage.getItem("${THEME_STORAGE_KEY}");
  } catch {}

  if (typeof window.matchMedia === "function") {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const isDark = storedTheme === "dark" || (storedTheme !== "light" && prefersDark);
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
})();
`;

export const metadata: Metadata = {
  title: "Photo Gallery & Portfolio",
  description: "A curated collection of photographs and creative works showcasing a personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {/* Navigation Header */}
        <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Camera className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Portfolio Gallery
                </h1>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/gallery" className="nav-link">
                  Gallery
                </Link>
                <Link href="/upload" className="nav-link">
                  Upload
                </Link>
                <ThemeToggle />
                <Link href="/admin" className="btn-primary">
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
              {/* Create a footer for this section. It should contain the logo and copyright information. */}
              <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-12">
                  <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <Camera className="h-6 w-6 text-blue-600" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                              &copy; {new Date().getFullYear()} Portfolio Gallery. All rights reserved.
                          </span>
                      </div>
                      <nav className="flex items-center gap-4">
                          <Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:underline">
                              Privacy Policy
                          </Link>
                          <Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:underline">
                              Terms of Service
                          </Link>
                      </nav>
                  </div>
              </footer>

       
      </body>
    </html>
  );
}
