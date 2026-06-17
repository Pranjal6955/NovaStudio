"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Box, Typography, Stack } from "@mui/material";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
  { label: "Services", href: "/admin/services", icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z" },
  { label: "Projects", href: "/admin/projects", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" },
  { label: "Stats", href: "/admin/stats", icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" },
  { label: "Contacts", href: "/admin/contacts", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
  { label: "Analytics", href: "/admin/analytics", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" },
];

function SidebarContent() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        background: "#FFFFFF",
        borderRight: "1px solid #F3F4F6",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, borderBottom: "1px solid #F3F4F6" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Box sx={{ width: 32, height: 32, borderRadius: "8px", background: "#108B4E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "#FFF", fontWeight: 700, fontSize: 16 }}>N</Typography>
          </Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#111827", letterSpacing: "-0.3px" }}>
            NovaStudio
          </Typography>
        </Link>
      </Box>

      {/* Navigation */}
      <Box component="nav" sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: "8px",
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#108B4E" : "#6B7280",
                  background: isActive ? "#F0FDF4" : "transparent",
                  transition: "all 0.15s",
                  "&:hover": {
                    background: isActive ? "#F0FDF4" : "#F9FAFB",
                    color: isActive ? "#108B4E" : "#374151",
                  },
                }}
              >
                <Box
                  component="svg"
                  sx={{ width: 18, height: 18, flexShrink: 0 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={item.icon} />
                </Box>
                {item.label}
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: "1px solid #F3F4F6", display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              borderRadius: "8px",
              fontSize: 14,
              color: "#6B7280",
              transition: "all 0.15s",
              "&:hover": { background: "#F9FAFB", color: "#374151" },
            }}
          >
            <Box component="svg" sx={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </Box>
            Back to Site
          </Box>
        </Link>
        <Box
          onClick={logout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: "8px",
            fontSize: 14,
            color: "#6B7280",
            cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": { background: "#FEF2F2", color: "#DC2626" },
          }}
        >
          <Box component="svg" sx={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </Box>
          Logout
        </Box>
      </Box>
    </Box>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
        <SidebarContent />
        <Box component="main" sx={{ ml: 240, flex: 1, minHeight: "100vh" }}>
          {children}
        </Box>
      </Box>
    </AuthProvider>
  );
}
