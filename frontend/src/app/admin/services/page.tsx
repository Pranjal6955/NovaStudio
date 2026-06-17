"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/services/api";

interface Service {
  id: string;
  title: string;
  description: string;
}

export default function ServicesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadServices();
  }, [isAuthenticated]);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data.services || data || []);
    } catch { /* empty */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, form);
      } else {
        await createService(form);
      }
      setOpen(false);
      setForm({ title: "", description: "" });
      setEditingId(null);
      loadServices();
    } catch { /* empty */ }
  };

  const handleEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({ title: s.title, description: s.description });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      loadServices();
    } catch { /* empty */ }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <div className="admin-topbar">
        <h1>Services</h1>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h2>All Services</h2>
            <button
              onClick={() => { setEditingId(null); setForm({ title: "", description: "" }); setOpen(true); }}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                background: "#7C3AED",
                color: "#FFF",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
            >
              + Add Service
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.title}</td>
                  <td>{s.description.slice(0, 80)}...</td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        onClick={() => handleEdit(s)}
                        style={{ padding: "6px 12px", borderRadius: 8, background: "#E5E7EB", border: "none", cursor: "pointer", fontSize: 13 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        style={{ padding: "6px 12px", borderRadius: 8, background: "#FEE2E2", color: "#DC2626", border: "none", cursor: "pointer", fontSize: 13 }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr><td colSpan={3} style={{ textAlign: "center", color: "#9CA3AF", padding: 32 }}>No services yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {open && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
            <div style={{ background: "#FFF", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{editingId ? "Edit Service" : "New Service"}</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }}
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={4}
                  style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setOpen(false)} style={{ padding: "10px 20px", borderRadius: 12, background: "#F3F4F6", border: "none", cursor: "pointer", fontSize: 14 }}>Cancel</button>
                  <button type="submit" style={{ padding: "10px 20px", borderRadius: 12, background: "#7C3AED", color: "#FFF", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                    {editingId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
