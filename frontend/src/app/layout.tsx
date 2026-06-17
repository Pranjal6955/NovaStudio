import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/common/ThemeRegistry";
import { ThemeModeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NovaStudio — AI-Powered Digital Agency",
    template: "%s | NovaStudio",
  },
  description:
    "Transform your digital presence with NovaStudio's cutting-edge solutions. We deliver exceptional web development, AI integration, and digital strategy.",
  keywords: [
    "NovaStudio",
    "AI digital agency",
    "web development",
    "AI integration",
    "digital strategy",
    "Next.js agency",
    "software studio",
  ],
  authors: [{ name: "NovaStudio", url: "https://novastudio.dev" }],
  creator: "NovaStudio",
  metadataBase: new URL("https://novastudio.dev"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://novastudio.dev",
    siteName: "NovaStudio",
    title: "NovaStudio — AI-Powered Digital Agency",
    description:
      "Transform your digital presence with NovaStudio's cutting-edge solutions. Exceptional web development, AI integration, and digital strategy.",
    images: [
      {
        url: "/Logo.svg",
        width: 1200,
        height: 630,
        alt: "NovaStudio — AI-Powered Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaStudio — AI-Powered Digital Agency",
    description:
      "Transform your digital presence with NovaStudio's cutting-edge solutions.",
    images: ["/Logo.svg"],
    creator: "@novastudio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <ThemeModeProvider>{children}</ThemeModeProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
