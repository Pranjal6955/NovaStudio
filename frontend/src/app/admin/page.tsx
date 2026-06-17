"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { getThemeColors } from "@/lib/themeColors";
import { Box, Typography, Grid, Stack, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FolderIcon from "@mui/icons-material/FolderOpen";
import MailIcon from "@mui/icons-material/MailOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import BoltIcon from "@mui/icons-material/Bolt";

import AdminIcon from "@mui/icons-material/AdminPanelSettings";

interface LogEntry {
  _id: string;
  action: string;
  adminId: string;
  details: Record<string, unknown>;
  createdAt: string;
}

function formatLogDetails(details: Record<string, unknown>): string {
  const entries = Object.entries(details || {}).filter(([k]) => !k.toLowerCase().includes("id"));
  if (entries.length === 0) return "—";
  return entries.map(([k, v]) => {
    const val = typeof v === "object" ? JSON.stringify(v) : String(v);
    const display = val.length > 20 ? val.slice(0, 20) + "..." : val;
    return `${k}: ${display}`;
  }).join(", ");
}

function getActionLabel(action: string): string {
  return action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  LOGIN: { bg: "rgba(74,222,128,0.1)", color: "#4ADE80" },
  LOGOUT: { bg: "rgba(251,146,60,0.1)", color: "#FB923C" },
  CREATE_PROJECT: { bg: "rgba(96,165,250,0.1)", color: "#60A5FA" },
  UPDATE_PROJECT: { bg: "rgba(251,146,60,0.1)", color: "#FB923C" },
  DELETE_PROJECT: { bg: "rgba(248,113,113,0.1)", color: "#F87171" },
  CREATE_SERVICE: { bg: "rgba(96,165,250,0.1)", color: "#60A5FA" },
  UPDATE_SERVICE: { bg: "rgba(251,146,60,0.1)", color: "#FB923C" },
  DELETE_SERVICE: { bg: "rgba(248,113,113,0.1)", color: "#F87171" },
  UPDATE_STATS: { bg: "rgba(167,139,250,0.1)", color: "#A78BFA" },
  CREATE_CONTACT_FORM: { bg: "rgba(74,222,128,0.1)", color: "#4ADE80" },
  DELETE_CONTACT: { bg: "rgba(248,113,113,0.1)", color: "#F87171" },
};

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface AnalyticsSummary {
  totalVisits: number;
  totalClick: number;
  totalContact: number;
}



function SparkLine({ data, color, width = 120, height = 32 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data, 1);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * (height - 4) - 2}`)
    .join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({
  title, value, change, sparkData, icon, accentColor, t, isDark,
}: {
  title: string; value: number | string; change?: number;
  sparkData: number[]; icon: React.ReactNode; accentColor: string;
  t: ReturnType<typeof getThemeColors>; isDark: boolean;
}) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <Box
      sx={{
        p: 0,
        borderRadius: "16px",
        background: t.card,
        border: `1px solid ${t.border}`,
        overflow: "hidden",
        transition: "all 0.25s ease",
        "&:hover": { borderColor: t.borderHover, transform: "translateY(-2px)", boxShadow: t.shadow },
      }}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: "10px",
            background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
            border: `1px solid ${accentColor}20`,
            display: "flex", alignItems: "center", justifyContent: "center", color: accentColor,
          }}>
            {icon}
          </Box>
          {change !== undefined && (
            <Chip
              size="small"
              icon={isPositive ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
              label={`${Math.abs(change)}%`}
              sx={{
                height: 28, fontSize: 13, fontWeight: 600,
                background: isPositive ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                color: isPositive ? "#4ADE80" : "#F87171",
                border: `1px solid ${isPositive ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
                borderRadius: "8px",
                "& .MuiChip-icon": { color: "inherit" },
              }}
            />
          )}
        </Stack>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: t.textMuted, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 36, fontWeight: 700, color: t.text, lineHeight: 1, letterSpacing: "-0.5px" }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ px: 3, pb: 2.5, pt: 1, borderTop: `1px solid ${t.border}` }}>
        <SparkLine data={sparkData} color={accentColor} width={280} height={36} />
      </Box>
    </Box>
  );
}

function HorizontalBar({ label, value, max, color, t, isDark }: { label: string; value: number; max: number; color: string; t: ReturnType<typeof getThemeColors>; isDark: boolean }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: t.textSec }}>{label}</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: t.text }}>{value}</Typography>
      </Stack>
      <Box sx={{ height: 8, borderRadius: 4, background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", overflow: "hidden" }}>
        <Box sx={{
          width: `${max > 0 ? (value / max) * 100 : 0}%`, height: "100%", borderRadius: 4,
          background: color, transition: "width 0.6s ease",
        }} />
      </Box>
    </Stack>
  );
}

function DonutChart({ segments, size = 140, t }: { segments: { value: number; color: string; label: string }[]; size?: number; t: ReturnType<typeof getThemeColors> }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.border} strokeWidth={12} />
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLen = circ * pct;
          const dashOff = circ - circ * pct - (cumulative / total) * circ;
          cumulative += seg.value;
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color}
              strokeWidth={12} strokeDasharray={`${dashLen} ${circ - dashLen}`}
              strokeDashoffset={dashOff} strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.6s ease" }} />
          );
        })}
      </svg>
      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, lineHeight: 1 }}>{total}</Typography>
        <Typography sx={{ fontSize: 12, color: t.textMuted, mt: 0.5 }}>total</Typography>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const router = useRouter();
  const [counts, setCounts] = useState({ services: 0, projects: 0, contacts: 0, stats: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({ totalVisits: 0, totalClick: 0, totalContact: 0 });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    import("@/services/api").then((api) => {
      Promise.all([
        api.getServices().catch(() => []),
        api.getProjects().catch(() => []),
        api.getContacts().catch(() => []),
        api.getStats().catch(() => []),
        api.getLogs().catch(() => []),
        api.getAnalytics().catch(() => ({ summary: { totalVisits: 0, totalClick: 0, totalContact: 0 } })),
      ]).then(([services, projects, contacts, statsData, logsData, analyticsData]) => {
        setCounts({
          services: Array.isArray(services) ? services.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          stats: Array.isArray(statsData) ? statsData.length : 0,
        });
        setLogs(Array.isArray(logsData) ? logsData.slice(0, 6) : []);
        setRecentContacts(Array.isArray(contacts) ? contacts.slice(0, 5) : []);
        setAnalytics(analyticsData?.summary || { totalVisits: 0, totalClick: 0, totalContact: 0 });
      });
    });
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const sparkServices = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 5) + counts.services);
  const sparkProjects = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 4) + counts.projects);
  const sparkContacts = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 3) + counts.contacts);
  const sparkEvents = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 20) + 5);

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px" }}>Dashboard</Typography>
        <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>{today}</Typography>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard title="Services" value={counts.services} change={12}
            sparkData={sparkServices} icon={<BoltIcon sx={{ fontSize: 18 }} />} accentColor="#4ADE80" t={t} isDark={isDark} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard title="Projects" value={counts.projects} change={8}
            sparkData={sparkProjects} icon={<FolderIcon sx={{ fontSize: 18 }} />} accentColor="#60A5FA" t={t} isDark={isDark} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard title="Contacts" value={counts.contacts} change={counts.contacts > 0 ? 5 : 0}
            sparkData={sparkContacts} icon={<MailIcon sx={{ fontSize: 18 }} />} accentColor="#A78BFA" t={t} isDark={isDark} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard title="Total Events" value={analytics.totalVisits + analytics.totalClick + analytics.totalContact}
            sparkData={sparkEvents} icon={<BarChartIcon sx={{ fontSize: 18 }} />} accentColor="#FB923C" t={t} isDark={isDark} />
        </Grid>
      </Grid>

      {/* Traffic + Distribution Row */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {/* Traffic Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, borderRadius: "16px", background: t.card, border: `1px solid ${t.border}`, height: "100%", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: t.text }}>Traffic Overview</Typography>
              <Chip label="All time" size="small" sx={{
                height: 30, fontSize: 13, fontWeight: 500, background: t.input,
                color: t.textSec, border: `1px solid ${t.border}`, borderRadius: "8px",
              }} />
            </Stack>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { label: "Visits", value: analytics.totalVisits, color: "#4ADE80" },
                { label: "Clicks", value: analytics.totalClick, color: "#60A5FA" },
                { label: "Contacts", value: analytics.totalContact, color: "#A78BFA" },
              ].map((item) => (
                <Grid key={item.label} size={{ xs: 4 }}>
                  <Box sx={{
                    p: 2.5, borderRadius: "10px", background: t.rowBg,
                    border: `1px solid ${t.border}`,
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "2px", background: item.color }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 26, fontWeight: 700, color: t.text }}>{item.value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2.5} sx={{ pt: 3, borderTop: `1px solid ${t.border}` }}>
              <HorizontalBar label="Page Visits" value={analytics.totalVisits} max={Math.max(analytics.totalVisits, analytics.totalClick, analytics.totalContact, 1)} color="#4ADE80" t={t} isDark={isDark} />
              <HorizontalBar label="CTA Clicks" value={analytics.totalClick} max={Math.max(analytics.totalVisits, analytics.totalClick, analytics.totalContact, 1)} color="#60A5FA" t={t} isDark={isDark} />
              <HorizontalBar label="Contact Submissions" value={analytics.totalContact} max={Math.max(analytics.totalVisits, analytics.totalClick, analytics.totalContact, 1)} color="#A78BFA" t={t} isDark={isDark} />
            </Stack>
          </Box>
        </Grid>

        {/* Donut */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, borderRadius: "16px", background: t.card, border: `1px solid ${t.border}`, height: "100%", display: "flex", flexDirection: "column", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: t.text, mb: 4 }}>Distribution</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <DonutChart segments={[
                { value: counts.services, color: "#4ADE80", label: "Services" },
                { value: counts.projects, color: "#60A5FA", label: "Projects" },
                { value: counts.contacts, color: "#A78BFA", label: "Contacts" },
              ]} size={160} t={t} />
            </Box>
            <Stack spacing={2.5}>
              {[
                { label: "Services", value: counts.services, color: "#4ADE80" },
                { label: "Projects", value: counts.projects, color: "#60A5FA" },
                { label: "Contacts", value: counts.contacts, color: "#A78BFA" },
              ].map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "3px", background: item.color }} />
                    <Typography sx={{ fontSize: 15, color: t.textSec }}>{item.label}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>{item.value}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        {/* Activity Table */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={{ borderRadius: "16px", background: t.card, border: `1px solid ${t.border}`, overflow: "hidden", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
              px: 4, py: 2.5, borderBottom: `1px solid ${t.border}`,
            }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: t.text }}>Recent Activity</Typography>
              <Box component="a" href="/admin/analytics" sx={{
                fontSize: 14, fontWeight: 500, color: "#4ADE80", textDecoration: "none",
                px: 2.5, py: 1, borderRadius: "8px", background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.15)",
                "&:hover": { background: "rgba(74,222,128,0.12)" },
              }}>View all</Box>
            </Stack>
            <Box component="table" sx={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
              <Box component="thead">
                <Box component="tr">
                  {["Action", "Admin", "Details", "Date"].map((h) => (
                    <Box key={h} component="th" sx={{
                      px: 3, py: 1.5, textAlign: "left", fontSize: 11, fontWeight: 600,
                      color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px",
                      borderBottom: `1px solid ${t.border}`,
                    }}>{h}</Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {logs.length === 0 ? (
                  <Box component="tr">
                    <Box component="td" colSpan={4} sx={{ py: 10, textAlign: "center", color: t.textMuted, fontSize: 14 }}>
                      No activity logs yet
                    </Box>
                  </Box>
                  ) : logs.map((log, i) => {
                    const ac = ACTION_COLORS[log.action] || { bg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec };
                    return (
                    <Box component="tr" key={log._id || i} sx={{
                      transition: "background 0.15s",
                      "&:hover": { background: isDark ? "rgba(255,255,255,0.02)" : "#F3F4F6" },
                    }}>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
                        <Chip label={getActionLabel(log.action)} size="small" sx={{
                          height: 24, fontSize: 11, fontWeight: 600, borderRadius: "6px",
                          background: ac.bg, color: ac.color,
                        }} />
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box sx={{
                            width: 28, height: 28, borderRadius: "6px",
                            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#4ADE80",
                          }}>
                            <AdminIcon sx={{ fontSize: 14 }} />
                          </Box>
                          <Typography sx={{ fontSize: 13, fontWeight: 500, color: t.textSec }}>
                            {log.adminId ? "Admin" : "System"}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
                        <Chip label={formatLogDetails(log.details)} size="small" sx={{
                          height: 22, fontSize: 10, fontWeight: 500, borderRadius: "6px",
                          background: t.chipBg, color: t.textSec,
                          maxWidth: 180, "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
                        }} />
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted, whiteSpace: "nowrap" }}>
                        {new Date(log.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </Box>
                    </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Recent Contacts */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={{ borderRadius: "16px", background: t.card, border: `1px solid ${t.border}`, overflow: "hidden", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 4, pb: 0 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: t.text }}>Recent Contacts</Typography>
              <Box component="a" href="/admin/contacts" sx={{
                fontSize: 14, fontWeight: 500, color: "#4ADE80", textDecoration: "none",
                px: 2.5, py: 1, borderRadius: "8px", background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.15)",
                "&:hover": { background: "rgba(74,222,128,0.12)" },
              }}>View all</Box>
            </Stack>
            {recentContacts.length === 0 ? (
              <Box sx={{ py: 12, textAlign: "center" }}>
                <MailIcon sx={{ fontSize: 40, color: t.borderHover, mb: 1 }} />
                <Typography sx={{ fontSize: 15, color: t.textMuted }}>No contact submissions yet</Typography>
              </Box>
            ) : (
              <Stack sx={{ p: 4, pt: 2 }}>
                {recentContacts.map((c, i) => (
                  <Box key={c.id} sx={{
                    py: 2.5,
                    borderBottom: i < recentContacts.length - 1 ? `1px solid ${t.border}` : "none",
                  }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{
            width: 44, height: 44, borderRadius: "12px",
                          background: `linear-gradient(135deg, ${["#4ADE80", "#60A5FA", "#A78BFA", "#FB923C", "#F87171"][i % 5]}20, ${["#4ADE80", "#60A5FA", "#A78BFA", "#FB923C", "#F87171"][i % 5]}08)`,
                          border: `1px solid ${["#4ADE80", "#60A5FA", "#A78BFA", "#FB923C", "#F87171"][i % 5]}20`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Typography sx={{ fontSize: 15, fontWeight: 600, color: ["#4ADE80", "#60A5FA", "#A78BFA", "#FB923C", "#F87171"][i % 5] }}>
                            {c.name.charAt(0).toUpperCase()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: 15, fontWeight: 500, color: t.text }}>{c.name}</Typography>
                          <Typography sx={{ fontSize: 13, color: t.textMuted }}>{c.email}</Typography>
                        </Box>
                      </Stack>
                      <Chip label={new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })} size="small" sx={{
                        height: 26, fontSize: 12, background: t.rowBg,
                        color: t.textMuted, border: `1px solid ${t.border}`, borderRadius: "6px",
                      }} />
                    </Stack>
                    <Typography sx={{
                      fontSize: 14, color: t.textSec, lineHeight: 1.5, pl: 7,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{c.message}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
