"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import FolderIcon from "@mui/icons-material/Folder";
import MailIcon from "@mui/icons-material/Mail";
import BarChartIcon from "@mui/icons-material/BarChart";

const statConfig = [
  { key: "services", label: "Services", icon: <BuildIcon sx={{ fontSize: 20 }} />, color: "#108B4E", bg: "#F0FDF4" },
  { key: "projects", label: "Projects", icon: <FolderIcon sx={{ fontSize: 20 }} />, color: "#2563EB", bg: "#EFF6FF" },
  { key: "contacts", label: "Contacts", icon: <MailIcon sx={{ fontSize: 20 }} />, color: "#7C3AED", bg: "#F5F3FF" },
  { key: "stats", label: "Stats", icon: <BarChartIcon sx={{ fontSize: 20 }} />, color: "#EA580C", bg: "#FFF7ED" },
];

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    contacts: 0,
    stats: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      import("@/services/api").then((api) => {
        Promise.all([
          api.getServices().catch(() => ({ services: [] })),
          api.getProjects().catch(() => ({ projects: [] })),
          api.getContacts().catch(() => ({ contacts: [] })),
          api.getStats().catch(() => ({ stats: [] })),
        ]).then(([services, projects, contacts, statsData]) => {
          setStats({
            services: (services.services || services || []).length,
            projects: (projects.projects || projects || []).length,
            contacts: (contacts.contacts || contacts || []).length,
            stats: (statsData.stats || statsData || []).length,
          });
        });
      });
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <Box sx={{ p: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#111827", letterSpacing: "-0.5px", mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#6B7280" }}>
          Welcome back. Here&apos;s an overview of your platform.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {statConfig.map((item) => (
          <Grid key={item.key} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #F3F4F6",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#E5E7EB",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                },
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#6B7280" }}>
                  {item.label}
                </Typography>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
              </Stack>
              <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
                {stats[item.key as keyof typeof stats]}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#111827", mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: "Manage Services", href: "/admin/services", color: "#108B4E" },
            { label: "Manage Projects", href: "/admin/projects", color: "#2563EB" },
            { label: "View Contacts", href: "/admin/contacts", color: "#7C3AED" },
            { label: "View Analytics", href: "/admin/analytics", color: "#EA580C" },
          ].map((action) => (
            <Grid key={action.href} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                component="a"
                href={action.href}
                sx={{
                  display: "block",
                  p: 2.5,
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #F3F4F6",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: action.color,
                    boxShadow: `0 4px 12px ${action.color}15`,
                  },
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
                  {action.label}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#9CA3AF", mt: 0.5 }}>
                  View and manage
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
