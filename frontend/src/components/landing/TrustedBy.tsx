"use client";

import { Box, Typography, Stack } from "@mui/material";
import { useThemeMode } from "@/context/ThemeContext";

const logos = [
  { name: "Acme Corp" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Umbrella" },
  { name: "Hooli" },
  { name: "Pied Piper" },
];

export default function TrustedBy() {
  const { isDark } = useThemeMode();
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, lg: 0 }, background: isDark ? "#111111" : "#FFFFFF" }}>
      <Box sx={{ maxWidth: 1120, mx: "auto", textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: isDark ? "#666666" : "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            mb: 5,
          }}
        >
          Trusted by forward-thinking companies
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={{ xs: 6, md: 10 }}
        >
          {logos.map((logo) => (
            <Typography
              key={logo.name}
              sx={{
                fontSize: { xs: 20, md: 24 },
                fontWeight: 700,
                color: isDark ? "#3A3A3A" : "#D1D5DB",
                letterSpacing: "-0.5px",
                userSelect: "none",
                transition: "color 0.2s",
                "&:hover": { color: isDark ? "#888888" : "#9CA3AF" },
              }}
            >
              {logo.name}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
