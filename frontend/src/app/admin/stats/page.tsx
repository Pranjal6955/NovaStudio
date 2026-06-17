"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getStats, updateStats } from "@/services/api";

interface Stat {
  id: string;
  projectsCompleted: number;
  clientWorldwide: number;
  experience: number;
}

export default function StatsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stat | null>(null);
  const [form, setForm] = useState({
    projectsCompleted: 0,
    clientWorldwide: 0,
    experience: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getStats()
        .then((data) => {
          const fetched = data.stats || data;
          const stat = Array.isArray(fetched) ? fetched[0] : fetched;
          if (stat && stat.id) {
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
    <>
      <div className="admin-topbar">
        <h1>Stats</h1>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrapper" style={{ maxWidth: 600 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Edit Statistics</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#374151" }}>Projects Completed</label>
              <input
                type="number"
                value={form.projectsCompleted}
                onChange={(e) => setForm({ ...form, projectsCompleted: Number(e.target.value) })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#374151" }}>Clients Worldwide</label>
              <input
                type="number"
                value={form.clientWorldwide}
                onChange={(e) => setForm({ ...form, clientWorldwide: Number(e.target.value) })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#374151" }}>Years of Experience</label>
              <input
                type="number"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }}
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                background: saved ? "#10B981" : "#7C3AED",
                color: "#FFF",
                fontSize: 16,
                fontWeight: 500,
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
                transition: "background 0.2s",
              }}
            >
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
