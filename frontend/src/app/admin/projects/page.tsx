"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/services/api";

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  description?: string;
}

export default function ProjectsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
    techStack: "",
    description: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadProjects();
  }, [isAuthenticated]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.projects || data || []);
    } catch { /* empty */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      setOpen(false);
      setForm({ title: "", category: "", imageUrl: "", techStack: "", description: "" });
      setEditingId(null);
      loadProjects();
    } catch { /* empty */ }
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      imageUrl: p.imageUrl,
      techStack: p.techStack.join(", "),
      description: p.description || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch { /* empty */ }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <div className="admin-topbar">
        <h1>Projects</h1>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h2>All Projects</h2>
            <button
              onClick={() => { setEditingId(null); setForm({ title: "", category: "", imageUrl: "", techStack: "", description: "" }); setOpen(true); }}
              style={{ padding: "10px 20px", borderRadius: 12, background: "#7C3AED", color: "#FFF", fontWeight: 500, border: "none", cursor: "pointer" }}
            >
              + Add Project
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tech Stack</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.techStack?.join(", ")}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button onClick={() => handleEdit(p)} style={{ padding: "6px 12px", borderRadius: 8, background: "#E5E7EB", border: "none", cursor: "pointer", fontSize: 13 }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 12px", borderRadius: 8, background: "#FEE2E2", color: "#DC2626", border: "none", cursor: "pointer", fontSize: 13 }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "#9CA3AF", padding: 32 }}>No projects yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {open && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
            <div style={{ background: "#FFF", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{editingId ? "Edit Project" : "New Project"}</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }} />
                <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }} />
                <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }} />
                <input placeholder="Tech Stack (comma separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none" }} />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #D1D5DB", fontSize: 16, outline: "none", fontFamily: "inherit", resize: "vertical" }} />
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setOpen(false)} style={{ padding: "10px 20px", borderRadius: 12, background: "#F3F4F6", border: "none", cursor: "pointer", fontSize: 14 }}>Cancel</button>
                  <button type="submit" style={{ padding: "10px 20px", borderRadius: 12, background: "#7C3AED", color: "#FFF", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>{editingId ? "Update" : "Create"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
