"use client";

import { usePathname } from "next/navigation";
import { Box, Typography, Stack, Avatar, Badge } from "@mui/material";
import { useThemeMode } from "@/context/ThemeContext";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/services": "Services",
  "/admin/projects": "Projects",
  "/admin/stats": "Stats",
  "/admin/contacts": "Contacts",
};

export default function Header() {
  const pathname = usePathname();
  const { isDark } = useThemeMode();

  const title = pageTitles[pathname] || "Dashboard";
  const bg = isDark ? "rgba(13,13,13,0.85)" : "rgba(255,255,255,0.85)";
  const border = isDark ? "#1E1E1E" : "#E5E7EB";
  const text = isDark ? "#F5F5F5" : "#0F172A";
  const textMuted = isDark ? "#6B7280" : "#9CA3AF";
  const inputBg = isDark ? "#1A1A1A" : "#F1F5F9";
  const inputBorder = isDark ? "#2A2A2A" : "transparent";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        background: bg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${border}`,
        px: { xs: 3, md: 5 },
        py: 1.5,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Left: Page title */}
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: text,
              letterSpacing: "-0.3px",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Right: Search + Notifications + Avatar */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Search */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: "10px",
              background: inputBg,
              border: `1px solid ${inputBorder}`,
              minWidth: 220,
              transition: "all 0.2s",
              "&:focus-within": {
                borderColor: "#108B4E",
                boxShadow: "0 0 0 3px rgba(16,139,78,0.08)",
              },
            }}
          >
            <SearchRoundedIcon sx={{ fontSize: 18, color: textMuted }} />
            <Box
              component="input"
              placeholder="Search..."
              sx={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 13,
                color: text,
                width: "100%",
                fontFamily: "inherit",
                "&::placeholder": { color: textMuted },
              }}
            />
          </Box>

          {/* Notifications */}
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: inputBg,
              border: `1px solid ${inputBorder}`,
              cursor: "pointer",
              transition: "all 0.15s",
              "&:hover": { background: isDark ? "#2A2A2A" : "#E2E8F0" },
            }}
          >
            <Badge
              variant="dot"
              color="success"
              sx={{ "& .MuiBadge-dot": { width: 7, height: 7, borderRadius: "50%", background: "#108B4E" } }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 20, color: textMuted }} />
            </Badge>
          </Box>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #108B4E 0%, #009245 100%)",
              fontSize: 15,
              fontWeight: 700,
              color: "#FFF",
              cursor: "pointer",
              transition: "all 0.15s",
              "&:hover": { opacity: 0.85 },
            }}
          >
            A
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
}
