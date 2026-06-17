"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { getThemeColors } from "@/lib/themeColors";
import { Box, Typography, Stack } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { getStats, updateStats } from "@/services/api";

interface Stat {
  id: string;
  projectsCompleted: number;
  clientWorldwide: number;
  experience: number;
}

const statFields = [
  { key: "projectsCompleted", label: "Projects Completed", icon: <TrendingUpIcon sx={{ fontSize: 20 }} />, color: "#4ADE80" },
  { key: "clientWorldwide", label: "Clients Worldwide", icon: <PeopleIcon sx={{ fontSize: 20 }} />, color: "#60A5FA" },
  { key: "experience", label: "Years of Experience", icon: <WorkspacePremiumIcon sx={{ fontSize: 20 }} />, color: "#A78BFA" },
] as const;

export default function StatsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const [stats, setStats] = useState<Stat | null>(null);
  const [form, setForm] = useState({ projectsCompleted: 0, clientWorldwide: 0, experience: 0 });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getStats()
        .then((data) => {
          const arr = Array.isArray(data) ? data : data.stats || data;
          const stat = Array.isArray(arr) ? arr[0] : arr;
          if (stat?.id) {
            setStats(stat);
            setForm({
              projectsCompleted: stat.projectsCompleted,
              clientWorldwide: stat.clientWorldwide,
              experience: stat.experience,
            });
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleSave = async () => {
    if (!stats) return;
    setSaving(true);
    try {
      await updateStats(stats.id, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* empty */ }
    setSaving(false);
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px" }}>Stats</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>Edit your platform statistics</Typography>
        </Box>
        <Box
          component="button"
          onClick={handleSave}
          disabled={saving}
          sx={{
            display: "flex", alignItems: "center", gap: 1,
            px: 3, py: 1.5, borderRadius: "8px", border: "none",
            background: "linear-gradient(135deg, #4ADE80, #22C55E)",
            color: "#000", fontSize: 14, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1, transition: "all 0.2s",
            "&:hover": { transform: saving ? "none" : "translateY(-1px)", boxShadow: "0 4px 12px rgba(74,222,128,0.3)" },
          }}
        >
          {saved ? <CheckIcon sx={{ fontSize: 18 }} /> : <SaveIcon sx={{ fontSize: 18 }} />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Box>
      </Stack>

      {/* Stat Cards */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        {statFields.map((field) => (
          <Box key={field.key} sx={{
            display: "flex", alignItems: "center", gap: 3,
            p: 3, borderRadius: "10px", background: t.card,
            border: `1px solid ${t.border}`,
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
            "&:hover": { borderColor: t.borderHover },
          }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: "10px",
              background: `${field.color}12`, border: `1px solid ${field.color}20`,
              display: "flex", alignItems: "center", justifyContent: "center", color: field.color,
              flexShrink: 0,
            }}>
              {field.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: t.text }}>{field.label}</Typography>
            </Box>
            <Box sx={{ position: "relative", width: 160 }}>
              <input
                type="number"
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: Number(e.target.value) })}
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: "8px",
                  border: "1px solid #2A2A2A", background: t.input,
                  color: t.text, fontSize: 18, fontWeight: 700, outline: "none",
                  letterSpacing: "-0.3px", textAlign: "right",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = field.color; e.target.style.boxShadow = `0 0 0 3px ${field.color}15`; }}
                onBlur={(e) => { e.target.style.borderColor = "#2A2A2A"; e.target.style.boxShadow = "none"; }}
              />
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Preview */}
      <Box sx={{
        p: 3, borderRadius: "10px", background: t.card,
        border: `1px solid ${t.border}`,
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
      }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: t.text, mb: 3 }}>Preview</Typography>
        <Stack direction="row" spacing={2}>
          {statFields.map((field) => (
            <Box key={field.key} sx={{
              flex: 1, p: 2.5, borderRadius: "8px", background: t.input,
              border: `1px solid ${t.border}`, textAlign: "center",
            }}>
              <Typography sx={{ fontSize: 32, fontWeight: 700, color: t.text, lineHeight: 1 }}>
                {form[field.key as keyof typeof form]}
              </Typography>
              <Typography sx={{ fontSize: 12, color: t.textMuted, mt: 1 }}>{field.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
