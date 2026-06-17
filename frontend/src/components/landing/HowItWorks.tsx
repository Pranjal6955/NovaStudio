"use client";

import { Box, Typography, Stack, Chip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const steps = [
  {
    num: "01",
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 24, color: "#108B4E" }} />,
    title: "Tell us what you need",
    description: "Describe your project, goals, and vision in a quick form. Our AI instantly understands your requirements.",
  },
  {
    num: "02",
    icon: <AutoFixHighIcon sx={{ fontSize: 24, color: "#108B4E" }} />,
    title: "AI builds your product",
    description: "Our engine generates design, code, and content — optimized for performance and conversion from day one.",
  },
  {
    num: "03",
    icon: <RocketLaunchIcon sx={{ fontSize: 24, color: "#108B4E" }} />,
    title: "Launch and iterate",
    description: "Deploy with one click. AI continues learning from user data to improve your product over time.",
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, px: { xs: 3, lg: 0 }, background: "#F5F5F4" }}>
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Chip
            label="How it works"
            sx={{
              mb: 3,
              height: 32,
              borderRadius: "100px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              fontSize: 14,
              fontWeight: 500,
              color: "#6B7280",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 34, md: 52 },
              fontWeight: 600,
              letterSpacing: "-2.5px",
              lineHeight: { xs: 1.15, md: 1.1 },
              color: "#111827",
              mb: 2,
            }}
          >
            Three steps to{" "}
            <Box component="span" sx={{ color: "#108B4E" }}>launch</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 17, md: 20 },
              color: "#6B7280",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Go from idea to live product in hours, not months.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {steps.map((step, i) => (
            <Box
              key={step.num}
              sx={{
                flex: 1,
                p: { xs: 5, md: 6 },
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "1px solid #F3F4F6",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#F3F4F6",
                  position: "absolute",
                  top: 16,
                  right: 24,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.num}
              </Typography>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {step.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#111827",
                  mb: 1.5,
                  letterSpacing: "-0.5px",
                }}
              >
                {step.title}
              </Typography>
              <Typography sx={{ fontSize: 16, lineHeight: 1.6, color: "#6B7280" }}>
                {step.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
