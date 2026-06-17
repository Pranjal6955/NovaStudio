"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { Box, Typography, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const navGroups = [
  {
    label: "Main Menu",
    items: [
      { label: "Dashboard", href: "/admin", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
      { label: "Analytics", href: "/admin/analytics", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Services", href: "/admin/services", icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z" },
      { label: "Projects", href: "/admin/projects", icon: "M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" },
      { label: "Stats", href: "/admin/stats", icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" },
      { label: "Contacts", href: "/admin/contacts", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isDark, toggle } = useThemeMode();

  const bg = isDark ? "#0D0D0D" : "#FFFFFF";
  const border = isDark ? "#1E1E1E" : "#E5E7EB";
  const textMuted = isDark ? "#6B7280" : "#9CA3AF";
  const navText = isDark ? "#9CA3AF" : "#64748B";
  const navTextHover = isDark ? "#E5E7EB" : "#1E293B";
  const navHover = isDark ? "rgba(255,255,255,0.04)" : "#F1F5F9";
  const activeBg = isDark ? "#108B4E" : "#108B4E";
  const activeColor = "#FFFFFF";

  return (
    <Box
      sx={{
        width: 260,
        background: bg,
        borderRight: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 1200,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #108B4E 0%, #009245 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(16,139,78,0.3)",
            }}
          >
            <Typography sx={{ color: "#FFF", fontWeight: 700, fontSize: 17 }}>N</Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 700,
                color: isDark ? "#F5F5F5" : "#0F172A",
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              NovaStudio
            </Typography>
            <Typography sx={{ fontSize: 10, color: textMuted, fontWeight: 500, letterSpacing: "0.3px", textTransform: "uppercase" }}>
              Admin Panel
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* Navigation */}
      <Box component="nav" sx={{ flex: 1, overflow: "auto", py: 2, px: 2 }}>
        {navGroups.map((group) => (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Typography
              sx={{
                px: 2,
                py: 1,
                fontSize: 10,
                fontWeight: 600,
                color: textMuted,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
              }}
            >
              {group.label}
            </Typography>
            <Stack spacing={0.25}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2,
                        py: 1.5,
                        borderRadius: "10px",
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? activeColor : navText,
                        background: isActive ? activeBg : "transparent",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          background: isActive ? activeBg : navHover,
                          color: isActive ? activeColor : navTextHover,
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
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Bottom section */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${border}`,
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
        }}
      >
        <Box
          onClick={toggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: "10px",
            fontSize: 13,
            fontWeight: 500,
            color: navText,
            cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": { background: navHover, color: navTextHover },
          }}
        >
          {isDark ? (
            <LightModeIcon sx={{ fontSize: 18 }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: 18 }} />
          )}
          {isDark ? "Light Mode" : "Dark Mode"}
        </Box>

        <Link href="/" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              borderRadius: "10px",
              fontSize: 13,
              fontWeight: 500,
              color: navText,
              transition: "all 0.15s",
              "&:hover": { background: navHover, color: navTextHover },
            }}
          >
            <HomeRoundedIcon sx={{ fontSize: 18 }} />
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
            borderRadius: "10px",
            fontSize: 13,
            fontWeight: 500,
            color: navText,
            cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": {
              background: isDark ? "rgba(239,68,68,0.1)" : "#FEF2F2",
              color: "#F87171",
            },
          }}
        >
          <LogoutRoundedIcon sx={{ fontSize: 18 }} />
          Logout
        </Box>
      </Box>
    </Box>
  );
}
