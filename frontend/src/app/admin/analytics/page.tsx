"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { Box, Typography, Stack, Chip, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import PeopleIcon from "@mui/icons-material/People";
import ListIcon from "@mui/icons-material/ListAlt";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import TimelineIcon from "@mui/icons-material/Timeline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getAnalytics, getLogs } from "@/services/api";
import { getThemeColors } from "@/lib/themeColors";

interface AnalyticsSummary {
  totalVisits: number;
  totalClick: number;
  totalContact: number;
}

interface RecentEvent {
  _id: string;
  eventType: string;
  page: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

interface LogEntry {
  _id: string;
  action: string;
  adminId: string;
  details: Record<string, unknown>;
  createdAt: string;
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

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  PAGE_VISIT: { bg: "rgba(74,222,128,0.1)", color: "#4ADE80" },
  CTA_CLICK: { bg: "rgba(96,165,250,0.1)", color: "#60A5FA" },
  CONTACT_SUBMIT: { bg: "rgba(167,139,250,0.1)", color: "#A78BFA" },
};

function formatMetadata(details: Record<string, unknown>): string {
  const entries = Object.entries(details || {}).filter(([k]) => !k.toLowerCase().includes("id"));
  if (entries.length === 0) return "—";
  return entries.map(([k, v]) => {
    const val = typeof v === "object" ? JSON.stringify(v) : String(v);
    const display = val.length > 25 ? val.slice(0, 25) + "..." : val;
    return `${k}: ${display}`;
  }).join(", ");
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(dateStr: string): string {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
}

function getActionLabel(action: string): string {
  return action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function getEventLabel(type: string): string {
  return type.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const [summary, setSummary] = useState<AnalyticsSummary>({ totalVisits: 0, totalClick: 0, totalContact: 0 });
  const [recent, setRecent] = useState<RecentEvent[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getAnalytics().then((data) => {
        if (data?.summary) setSummary(data.summary);
        if (data?.recent) setRecent(data.recent);
      }).catch(() => {});
      getLogs().then((data) => { setLogs(Array.isArray(data) ? data : []); }).catch(() => {});
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  const summaryCards = [
    { label: "Total Visits", value: summary.totalVisits, icon: <VisibilityIcon sx={{ fontSize: 18 }} />, color: "#4ADE80" },
    { label: "Total Clicks", value: summary.totalClick, icon: <TouchAppIcon sx={{ fontSize: 18 }} />, color: "#60A5FA" },
    { label: "Total Contacts", value: summary.totalContact, icon: <PeopleIcon sx={{ fontSize: 18 }} />, color: "#A78BFA" },
    { label: "Audit Logs", value: logs.length, icon: <ListIcon sx={{ fontSize: 18 }} />, color: "#FB923C" },
  ];

  const actionCounts: Record<string, number> = {};
  logs.forEach((l) => { actionCounts[l.action] = (actionCounts[l.action] || 0) + 1; });
  const sortedActions = Object.entries(actionCounts).sort((a, b) => b[1] - a[1]);
  const maxActionCount = sortedActions.length > 0 ? sortedActions[0][1] : 1;

  const eventCounts: Record<string, number> = {};
  recent.forEach((e) => { eventCounts[e.eventType] = (eventCounts[e.eventType] || 0) + 1; });

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
      {/* Header */}
      <Box sx={{ mb: 5, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px" }}>Analytics & Logs</Typography>
        <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>Track your platform activity</Typography>
      </Box>

      {/* Summary Cards */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
        {summaryCards.map((item) => (
          <Box key={item.label} sx={{
            flex: 1, p: 2.5, borderRadius: "10px", background: t.card,
            border: `1px solid ${t.border}`,
            transition: "all 0.2s, background 0.2s, color 0.2s, border-color 0.2s",
            "&:hover": { borderColor: t.borderHover },
          }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: "8px",
                background: `${item.color}12`, border: `1px solid ${item.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center", color: item.color,
              }}>
                {item.icon}
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, lineHeight: 1 }}>
              {item.value}
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: t.textMuted, mt: 0.75, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Two Column Layout: Action Breakdown + Event Breakdown */}
      <Grid container spacing={2} sx={{ mb: 4, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
        {/* Action Breakdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, height: "100%", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
              <TimelineIcon sx={{ fontSize: 16, color: t.textMuted }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>Log Actions</Typography>
            </Stack>
            <Box sx={{ p: 3 }}>
              {sortedActions.length === 0 ? (
                <Typography sx={{ fontSize: 13, color: t.textMuted, textAlign: "center", py: 4 }}>No actions recorded</Typography>
              ) : (
                <Stack spacing={1.5}>
                  {sortedActions.map(([action, count]) => {
                    const c = ACTION_COLORS[action] || { bg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec };
                    return (
                      <Stack key={action} direction="row" alignItems="center" spacing={2}>
                        <Chip label={getActionLabel(action)} size="small" sx={{
                          height: 24, fontSize: 11, fontWeight: 600, borderRadius: "6px", minWidth: 140,
                          background: c.bg, color: c.color,
                          "& .MuiChip-label": { px: 1 },
                        }} />
                        <Box sx={{ flex: 1, height: 6, borderRadius: 3, background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", overflow: "hidden" }}>
                          <Box sx={{
                            width: `${(count / maxActionCount) * 100}%`, height: "100%", borderRadius: 3,
                            background: c.color, transition: "width 0.5s ease",
                          }} />
                        </Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: t.text, minWidth: 24, textAlign: "right" }}>
                          {count}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Event Type Breakdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, height: "100%", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: t.textMuted }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>Analytics Events</Typography>
            </Stack>
            <Box sx={{ p: 3 }}>
              {recent.length === 0 ? (
                <Typography sx={{ fontSize: 13, color: t.textMuted, textAlign: "center", py: 4 }}>No events tracked yet</Typography>
              ) : (
                <Stack spacing={1.5}>
                  {Object.entries(eventCounts).map(([type, count]) => {
                    const c = EVENT_COLORS[type] || { bg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec };
                    return (
                      <Stack key={type} direction="row" alignItems="center" spacing={2}>
                        <Chip label={getEventLabel(type)} size="small" sx={{
                          height: 24, fontSize: 11, fontWeight: 600, borderRadius: "6px", minWidth: 140,
                          background: c.bg, color: c.color,
                          "& .MuiChip-label": { px: 1 },
                        }} />
                        <Box sx={{ flex: 1, height: 6, borderRadius: 3, background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", overflow: "hidden" }}>
                          <Box sx={{
                            width: `${(count / Math.max(...Object.values(eventCounts))) * 100}%`, height: "100%", borderRadius: 3,
                            background: c.color, transition: "width 0.5s ease",
                          }} />
                        </Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: t.text, minWidth: 24, textAlign: "right" }}>
                          {count}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Recent Analytics Events */}
      {recent.length > 0 && (
        <Box sx={{ borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, overflow: "hidden", mb: 4, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
            px: 3, py: 2, borderBottom: `1px solid ${t.border}`,
          }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <VisibilityIcon sx={{ fontSize: 16, color: t.textMuted }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>Recent Events</Typography>
            </Stack>
            <Chip label={`${recent.length} events`} size="small" sx={{
              height: 24, fontSize: 11, fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6",
              color: t.textSec, border: `1px solid ${t.border}`, borderRadius: "6px",
            }} />
          </Stack>
          <Box component="table" sx={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
            <Box component="thead">
              <Box component="tr">
                {["Event", "Page", "Details", "Time"].map((h) => (
                  <Box key={h} component="th" sx={{
                    px: 3, py: 1.5, textAlign: "left", fontSize: 11, fontWeight: 600,
                    color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px",
                    borderBottom: `1px solid ${t.border}`,
                  }}>{h}</Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {recent.slice(0, 10).map((event) => {
                const ec = EVENT_COLORS[event.eventType] || { bg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec };
                const metaEntries = Object.entries(event.metadata || {}).filter(([k]) => !k.toLowerCase().includes("id"));
                return (
                  <Box component="tr" key={event._id} sx={{
                    transition: "background 0.15s",
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.02)" : "#F9FAFB" },
                  }}>
                    <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
                      <Chip label={getEventLabel(event.eventType)} size="small" sx={{
                        height: 24, fontSize: 11, fontWeight: 600, borderRadius: "6px",
                        background: ec.bg, color: ec.color,
                      }} />
                    </Box>
                    <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}`, fontSize: 13, color: t.textSec }}>
                      {event.page || "—"}
                    </Box>
                    <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}` }}>
                      {metaEntries.length > 0 ? (
                        <Stack direction="row" spacing={0.5} flexWrap="wrap">
                          {metaEntries.map(([k, v]) => (
                            <Chip key={k} label={`${k}: ${String(v).length > 20 ? String(v).slice(0, 20) + "..." : v}`} size="small" sx={{
                              height: 22, fontSize: 10, fontWeight: 500, borderRadius: "6px",
                              background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec, mb: 0.5,
                            }} />
                          ))}
                        </Stack>
                      ) : (
                        <Typography sx={{ fontSize: 13, color: t.textMuted }}>—</Typography>
                      )}
                    </Box>
                    <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted, whiteSpace: "nowrap" }}>
                      {formatDateTime(event.createdAt)}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* Audit Logs Table */}
      <Box sx={{ borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, overflow: "hidden", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
          px: 3, py: 2, borderBottom: `1px solid ${t.border}`,
        }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <ListIcon sx={{ fontSize: 16, color: t.textMuted }} />
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>Audit Logs</Typography>
          </Stack>
          <Chip label={`${logs.length} entries`} size="small" sx={{
            height: 24, fontSize: 11, fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6",
            color: t.textSec, border: `1px solid ${t.border}`, borderRadius: "6px",
          }} />
        </Stack>

        <Box component="table" sx={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
          <Box component="thead">
            <Box component="tr">
              {["Action", "Admin", "Details", "Time"].map((h) => (
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
                  No audit logs yet
                </Box>
              </Box>
            ) : logs.map((log) => {
              const ac = ACTION_COLORS[log.action] || { bg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec };
              return (
                <Box component="tr" key={log._id} sx={{
                  transition: "background 0.15s",
                  "&:hover": { background: isDark ? "rgba(255,255,255,0.02)" : "#F9FAFB" },
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
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {Object.entries(log.details || {}).filter(([k]) => !k.toLowerCase().includes("id")).map(([k, v]) => (
                        <Chip key={k} label={`${k}: ${String(v).length > 20 ? String(v).slice(0, 20) + "..." : v}`} size="small" sx={{
                          height: 22, fontSize: 10, fontWeight: 500, borderRadius: "6px",
                          background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec, mb: 0.5,
                        }} />
                      ))}
                    </Stack>
                  </Box>
                  <Box component="td" sx={{ px: 3, py: 2, borderBottom: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted, whiteSpace: "nowrap" }}>
                    {formatDateTime(log.createdAt)}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
