"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  Grid,
  Chip,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { getServices } from "@/services/api";

interface Service {
  id: string;
  title: string;
  description: string;
}

const icons = [
  <AutoAwesomeIcon key="ai" sx={{ fontSize: 28, color: "#108B4E" }} />,
  <SpeedIcon key="speed" sx={{ fontSize: 28, color: "#108B4E" }} />,
  <TrendingUpIcon key="growth" sx={{ fontSize: 28, color: "#108B4E" }} />,
];

const fallback: Service[] = [
  {
    id: "1",
    title: "AI-Powered Design",
    description:
      "Our AI-driven approach dissects user patterns and triggers hyper-personalized experiences. Clients see 47% higher engagement.",
  },
  {
    id: "2",
    title: "Growth Analytics",
    description:
      "Real-time analytics detect high-velocity opportunities through user behavior, market shifts, and competitive analysis.",
  },
  {
    id: "3",
    title: "Performance Optimization",
    description:
      "AI optimizes your digital presence in real-time based on market dynamics, competitor analysis, and customer sensitivity.",
  },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(fallback);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, lg: 0 },
        background: "#FFFFFF",
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Chip
            label="Services"
            sx={{
              mb: 3,
              height: 32,
              borderRadius: "100px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              fontSize: 14,
              fontWeight: 500,
              color: "#108B4E",
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
              maxWidth: 600,
            }}
          >
            Everything you need to{" "}
            <Box component="span" sx={{ color: "#108B4E" }}>scale</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 17, md: 20 },
              color: "#6B7280",
              maxWidth: 500,
              lineHeight: 1.6,
            }}
          >
            From ideation to deployment, our AI handles the heavy lifting so your
            team can focus on what matters most.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {services.map((service, i) => (
            <Grid key={service.id} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  p: { xs: 5, md: 6 },
                  height: "100%",
                  background: "#FFFFFF",
                  border: "1px solid #F3F4F6",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#E5E7EB",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {icons[i]}
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
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#6B7280",
                  }}
                >
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
