"use client";

import { Box, Typography, Stack } from "@mui/material";

const logos = [
  { name: "Acme Corp", color: "#9CA3AF" },
  { name: "Globex", color: "#9CA3AF" },
  { name: "Initech", color: "#9CA3AF" },
  { name: "Umbrella", color: "#9CA3AF" },
  { name: "Hooli", color: "#9CA3AF" },
  { name: "Pied Piper", color: "#9CA3AF" },
];

export default function TrustedBy() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, lg: 0 }, background: "#FFFFFF" }}>
      <Box sx={{ maxWidth: 1120, mx: "auto", textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: "#9CA3AF",
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
                color: "#D1D5DB",
                letterSpacing: "-0.5px",
                userSelect: "none",
                transition: "color 0.2s",
                "&:hover": { color: "#9CA3AF" },
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
