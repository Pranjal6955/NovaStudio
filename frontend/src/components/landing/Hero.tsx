"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { trackEvent } from "@/services/api";
import { useThemeMode } from "@/context/ThemeContext";

export default function Hero() {
  const { isDark } = useThemeMode();
  const handleCtaClick = (label: string) => {
    trackEvent({ eventType: "CTA_CLICK", page: "/", metadata: { label } }).catch(() => {});
  };
  return (
    <Box
      id="home"
      sx={{
        width: "100%",
        pt: { xs: 10, md: 14 },
        pb: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(180deg, #0A1A0F 0%, #111111 50%, #111111 100%)"
          : "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 50%, #F5F5F4 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16,139,78,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16,139,78,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center", position: "relative" }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: 16, color: "#108B4E" }} />}
          label="AI-Powered Digital Agency"
          sx={{
            mb: 4,
            height: 36,
            borderRadius: "100px",
            background: isDark ? "#1A1A1A" : "#FFFFFF",
            border: isDark ? "1px solid #2A2A2A" : "1px solid #E5E7EB",
            fontSize: 14,
            fontWeight: 500,
            color: isDark ? "#D4D4D4" : "#374151",
            px: 1,
            boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.04)",
            "& .MuiChip-label": { px: 1.5 },
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "40px", sm: "52px", md: "68px" },
            fontWeight: 600,
            lineHeight: { xs: 1.1, md: 1.05 },
            letterSpacing: { xs: "-1.5px", md: "-3px" },
            color: isDark ? "#F0F0F0" : "#111827",
            mb: 3,
          }}
        >
          Build digital products{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #108B4E 0%, #059669 50%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            10x faster
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 18, md: 21 },
            lineHeight: 1.6,
            color: isDark ? "#888888" : "#6B7280",
            maxWidth: 560,
            mx: "auto",
            mb: 5,
          }}
        >
          From ideation to launch — NovaStudio&apos;s AI engine handles design,
          development, and optimization so you can focus on what matters.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mb: 8 }}>
          <Button
            href="/admin/login"
            disableElevation
            onClick={() => handleCtaClick("Get started free")}
            sx={{
              height: 52,
              px: 4,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #108B4E 0%, #059669 100%)",
              color: "#FFF",
              fontSize: 17,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(16,139,78,0.35)",
              transition: "all 0.2s",
              "&:hover": {
                background: "linear-gradient(135deg, #0D7A42 0%, #047837 100%)",
                boxShadow: "0 6px 20px rgba(16,139,78,0.45)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Get started free
          </Button>
          <Button
            href="#portfolio"
            startIcon={<PlayArrowRoundedIcon />}
            onClick={() => handleCtaClick("See our work")}
            sx={{
              height: 52,
              px: 4,
              borderRadius: "14px",
              background: isDark ? "#1A1A1A" : "#FFFFFF",
              color: isDark ? "#D4D4D4" : "#374151",
              fontSize: 17,
              fontWeight: 500,
              textTransform: "none",
              border: isDark ? "1px solid #2A2A2A" : "1px solid #E5E7EB",
              boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
              "&:hover": {
                background: isDark ? "#222222" : "#F9FAFB",
                borderColor: isDark ? "#3A3A3A" : "#D1D5DB",
              },
            }}
          >
            See our work
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
