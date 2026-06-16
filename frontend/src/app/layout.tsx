import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./global.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/providers/ThemeRegistery";


const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>     
          <ThemeRegistry>
          {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}