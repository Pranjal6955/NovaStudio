"use client";

import { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid, Stack, Chip } from "@mui/material";
import { getStats } from "@/services/api";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface Stat {
  id: string;
  projectsCompleted: number;
  clientWorldwide: number;
  experience: number;
}

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const [stats, setStats] = useState<Stat>({
    id: "",
    projectsCompleted: 150,
    clientWorldwide: 50,
    experience: 8,
  });

  useEffect(() => {
    getStats()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStats(data[0]);
        } else if (data && data.id) {
          setStats(data);
        }
      })
      .catch(() => {});
  }, []);

  const items = [
    {
      value: stats.projectsCompleted,
      label: "Projects Completed",
      icon: <TrendingUpIcon sx={{ fontSize: 22 }} />,
      description: "Delivered across 20+ industries",
    },
    {
      value: stats.clientWorldwide,
      label: "Clients Worldwide",
      icon: <GroupsIcon sx={{ fontSize: 22 }} />,
      description: "In 15+ countries globally",
    },
    {
      value: stats.experience,
      label: "Years Experience",
      icon: <WorkspacePremiumIcon sx={{ fontSize: 22 }} />,
      description: "Of digital innovation",
    },
  ];

  return (
    <Box
      id="stats"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, lg: 0 },
        background: "#F5F5F4",
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        {/* Header */}
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Our impact"
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
            Numbers that{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #108B4E 0%, #059669 50%, #10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              speak
            </Box>
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 20 }, color: "#6B7280", maxWidth: 440, lineHeight: 1.6 }}>
            Our track record of delivering results that matter
          </Typography>
        </Stack>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {items.map((item, i) => (
            <Grid key={item.label} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  background: "#FFFFFF",
                  border: "1px solid #F3F4F6",
                  p: { xs: 5, md: 6 },
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                    borderColor: "#E5E7EB",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-40%",
                    right: "-20%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "rgba(16,139,78,0.05)",
                    pointerEvents: "none",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-30%",
                    left: "-10%",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "rgba(16,139,78,0.03)",
                    pointerEvents: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "#F0FDF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#108B4E",
                    mb: 4,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 56, md: 64 },
                    fontWeight: 700,
                    letterSpacing: "-3px",
                    lineHeight: 1,
                    mb: 1.5,
                    color: "#111827",
                  }}
                >
                  <AnimatedNumber target={item.value} />
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: 36, md: 40 },
                      fontWeight: 600,
                      letterSpacing: "-1px",
                      color: "#108B4E",
                    }}
                  >
                    +
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.5,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
