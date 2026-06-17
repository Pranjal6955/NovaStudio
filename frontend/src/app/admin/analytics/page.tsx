"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAnalytics, getLogs } from "@/services/api";

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Record<string, unknown>>({});
  const [logs, setLogs] = useState<Array<{ id: string; action: string; adminId: string; details: Record<string, unknown>; createdAt: string }>>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        getAnalytics().catch(() => ({})),
        getLogs().catch(() => ({ logs: [] })),
      ]).then(([analyticsData, logsData]) => {
        setAnalytics(analyticsData || {});
        setLogs(logsData?.logs || logsData || []);
      });
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  const eventSummary = analytics?.summary || analytics?.events || [];
  const totalEvents = Array.isArray(eventSummary)
    ? eventSummary.reduce((acc: number, e: Record<string, unknown>) => acc + ((e.count as number) || 0), 0)
    : 0;

  return (
    <>
      <div className="admin-topbar">
        <h1>Analytics &amp; Logs</h1>
      </div>
      <div className="admin-content">
        <div className="admin-stat-cards">
          <div className="admin-stat-card">
            <h3>Total Events</h3>
            <div className="value">{totalEvents}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Audit Logs</h3>
            <div className="value">{logs.length}</div>
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ marginTop: 24 }}>
          <div className="admin-table-header">
            <h2>Recent Audit Logs</h2>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Admin ID</th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 20).map((log, i) => (
                <tr key={log.id || `log-${i}`}>
                  <td>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: log.action.includes("LOGIN") ? "#DCFCE7" : log.action.includes("DELETE") ? "#FEE2E2" : "#E5E7EB",
                      color: log.action.includes("LOGIN") ? "#166534" : log.action.includes("DELETE") ? "#991B1B" : "#374151",
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "#6B7280" }}>{log.adminId || "N/A"}</td>
                  <td style={{ fontSize: 13, color: "#6B7280" }}>{JSON.stringify(log.details).slice(0, 50)}</td>
                  <td style={{ fontSize: 13 }}>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "#9CA3AF", padding: 32 }}>No logs yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
