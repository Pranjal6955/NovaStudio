"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { Box } from "@mui/material";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDark } = useThemeMode();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <Box sx={{ display: "flex", minHeight: "100vh", background: isDark ? "#0A0A0A" : "#F8FAFC", transition: "background 0.2s" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            ml: "260px",
            flex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, transition: "background 0.2s, color 0.2s" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </AuthProvider>
  );
}
