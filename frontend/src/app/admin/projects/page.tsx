"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { getThemeColors } from "@/lib/themeColors";
import { Box, Typography, Stack, Chip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/FolderOpen";
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
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", category: "", imageUrl: "", techStack: "", description: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadProjects();
  }, [isAuthenticated]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch { /* empty */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean) };
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
    setForm({ title: p.title, category: p.category, imageUrl: p.imageUrl, techStack: p.techStack.join(", "), description: p.description || "" });
    setOpen(true);
  };

  const confirmDelete = (p: Project) => {
    setDeleteId(p.id);
    setDeleteName(p.title);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      setDeleteName("");
      loadProjects();
    } catch { /* empty */ }
    setDeleting(false);
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px", transition: "color 0.2s" }}>Projects</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5, transition: "color 0.2s" }}>{projects.length} total projects</Typography>
        </Box>
        <Box
          component="button"
          onClick={() => { setEditingId(null); setForm({ title: "", category: "", imageUrl: "", techStack: "", description: "" }); setOpen(true); }}
          sx={{
            display: "flex", alignItems: "center", gap: 1,
            px: 3, py: 1.5, borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
            color: "#000", fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": { transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(96,165,250,0.3)" },
          }}
        >
          <AddIcon sx={{ fontSize: 18 }} /> Add Project
        </Box>
      </Stack>

      {/* Cards */}
      {projects.length === 0 ? (
        <Box sx={{ py: 12, textAlign: "center", borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
          <FolderIcon sx={{ fontSize: 48, color: t.borderHover, mb: 2, transition: "color 0.2s" }} />
          <Typography sx={{ fontSize: 16, color: t.textMuted, transition: "color 0.2s" }}>No projects yet</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5, transition: "color 0.2s" }}>Click &quot;Add Project&quot; to create one</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {projects.map((p) => (
            <Box key={p.id} sx={{
              p: 2.5, borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`,
              transition: "all 0.2s, background 0.2s, border-color 0.2s",
              "&:hover": { borderColor: t.borderHover, boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)" },
            }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Stack direction="row" alignItems="flex-start" spacing={3}>
                  <Box
                    component="img"
                    src={p.imageUrl}
                    alt={p.title}
                    sx={{
                      width: 80, height: 80, borderRadius: "10px", objectFit: "cover", flexShrink: 0,
                      border: `1px solid ${t.border}`,
                      transition: "border-color 0.2s",
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                      <Typography sx={{ fontSize: 17, fontWeight: 600, color: t.text, transition: "color 0.2s" }}>{p.title}</Typography>
                      <Chip label={p.category} size="small" sx={{
                        height: 24, fontSize: 11, fontWeight: 500, borderRadius: "6px",
                        background: "rgba(96,165,250,0.1)", color: "#60A5FA",
                        border: "1px solid rgba(96,165,250,0.2)",
                      }} />
                    </Stack>
                    <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.6, mb: 1.5, transition: "color 0.2s" }}>
                      {p.description || "No description provided."}
                    </Typography>
                    <Stack direction="row" spacing={0.75} flexWrap="wrap" gap={0.75}>
                      {p.techStack?.map((tech) => (
                        <Chip key={tech} label={tech} size="small" sx={{
                          height: 24, fontSize: 11, fontWeight: 500, borderRadius: "6px",
                          background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textSec,
                          border: `1px solid ${t.border}`,
                          transition: "background 0.2s, color 0.2s, border-color 0.2s",
                        }} />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <Stack spacing={1} sx={{ flexShrink: 0 }}>
                  <Box
                    component="button"
                    onClick={() => handleEdit(p)}
                    sx={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75,
                      px: 2.5, py: 1, borderRadius: "8px", border: "none",
                      background: "rgba(96,165,250,0.1)", color: "#60A5FA",
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                      "&:hover": { background: "rgba(96,165,250,0.2)" },
                    }}
                  >
                    <EditIcon sx={{ fontSize: 15 }} />
                    Edit
                  </Box>
                  <Box
                    component="button"
                    onClick={() => confirmDelete(p)}
                    sx={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75,
                      px: 2.5, py: 1, borderRadius: "8px", border: "none",
                      background: "rgba(248,113,113,0.1)", color: "#F87171",
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                      "&:hover": { background: "rgba(248,113,113,0.2)" },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 15 }} />
                    Delete
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {/* Create / Edit Modal */}
      {open && (
        <Box
          sx={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(12px)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 2000, p: 2,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <Box sx={{
            background: t.card, borderRadius: "14px", border: `1px solid ${t.border}`,
            width: "100%", maxWidth: 480, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            maxHeight: "90vh", overflowY: "auto",
            animation: "modalIn 0.2s ease-out",
            transition: "background 0.2s, border-color 0.2s",
            "@keyframes modalIn": {
              "0%": { opacity: 0, transform: "scale(0.95) translateY(10px)" },
              "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
            },
          }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
              px: 3, py: 2.5,
            }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: "10px",
                  background: editingId ? "rgba(96,165,250,0.1)" : "rgba(74,222,128,0.1)",
                  border: `1px solid ${editingId ? "rgba(96,165,250,0.2)" : "rgba(74,222,128,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: editingId ? "#60A5FA" : "#4ADE80",
                }}>
                  {editingId ? <EditIcon sx={{ fontSize: 18 }} /> : <AddIcon sx={{ fontSize: 18 }} />}
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: t.text, transition: "color 0.2s" }}>
                  {editingId ? "Edit Project" : "New Project"}
                </Typography>
              </Stack>
              <IconButton onClick={() => setOpen(false)} sx={{
                width: 32, height: 32, borderRadius: "8px", color: t.textMuted,
                "&:hover": { background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: t.text },
              }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Box sx={{ mx: 3, height: "1px", background: t.border, transition: "background 0.2s" }} />

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, pt: 3, pb: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
              {[
                { label: "Title", key: "title", placeholder: "e.g. E-Commerce Platform" },
                { label: "Category", key: "category", placeholder: "e.g. Web Development" },
                { label: "Tech Stack (comma separated)", key: "techStack", placeholder: "React, Node.js, MongoDB" },
              ].map((field) => (
                <Box key={field.key}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: t.textSec, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px", transition: "color 0.2s" }}>{field.label}</Typography>
                  <input
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required={field.key !== "techStack"}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.input, color: t.text, fontSize: 14, outline: "none", transition: "all 0.2s" }}
                    onFocus={(e) => { e.target.style.borderColor = "#60A5FA"; e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = t.border; e.target.style.boxShadow = "none"; }}
                  />
                </Box>
              ))}

              {/* Image Upload */}
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: t.textSec, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px", transition: "color 0.2s" }}>Project Image</Typography>
                {form.imageUrl ? (
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={form.imageUrl}
                      alt="Preview"
                      sx={{
                        width: "100%", height: 160, borderRadius: "8px", objectFit: "cover",
                        border: `1px solid ${t.border}`,
                        transition: "border-color 0.2s",
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.target as HTMLImageElement).src = "";
                        setForm({ ...form, imageUrl: "" });
                      }}
                    />
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      sx={{
                        position: "absolute", top: 8, right: 8,
                        width: 28, height: 28, borderRadius: "6px", border: "none",
                        background: "rgba(0,0,0,0.7)", color: "#F87171",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", backdropFilter: "blur(4px)",
                        "&:hover": { background: "rgba(248,113,113,0.2)" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    component="label"
                    sx={{
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      py: 4, borderRadius: "8px", border: `2px dashed ${t.border}`,
                      background: t.input, cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: "#60A5FA", background: "rgba(96,165,250,0.03)" },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setForm({ ...form, imageUrl: ev.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Box sx={{
                      width: 40, height: 40, borderRadius: "10px",
                      background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#60A5FA", mb: 1.5,
                    }}>
                      <AddIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: t.textSec, mb: 0.5, transition: "color 0.2s" }}>
                      Click to upload image
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: t.textMuted, transition: "color 0.2s" }}>
                      PNG, JPG, GIF up to 5MB
                    </Typography>
                  </Box>
                )}
                <Typography sx={{ fontSize: 11, color: t.textMuted, mt: 1, transition: "color 0.2s" }}>
                  Or paste an image URL below
                </Typography>
                <input
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.input, color: t.text, fontSize: 14, outline: "none", transition: "all 0.2s", marginTop: 6 }}
                  onFocus={(e) => { e.target.style.borderColor = "#60A5FA"; e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = t.border; e.target.style.boxShadow = "none"; }}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: t.textSec, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px", transition: "color 0.2s" }}>Description</Typography>
                <textarea
                  placeholder="Describe this project..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.input, color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", transition: "all 0.2s", lineHeight: "1.5" }}
                  onFocus={(e) => { e.target.style.borderColor = "#60A5FA"; e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = t.border; e.target.style.boxShadow = "none"; }}
                />
              </Box>

              {/* Footer */}
              <Stack spacing={1.5} sx={{ pt: 0.5 }}>
                <Box
                  component="button" type="submit"
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: "none",
                    background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
                    color: "#000", fontSize: 15, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.15s",
                    "&:hover": { transform: "translateY(-1px)", boxShadow: "0 4px 16px rgba(96,165,250,0.3)" },
                  }}
                >
                  {editingId ? "Update Project" : "Create Project"}
                </Box>
                <Box
                  component="button" type="button" onClick={() => setOpen(false)}
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: `1px solid ${t.border}`,
                    background: "transparent", color: t.textSec, fontSize: 15, fontWeight: 500,
                    cursor: "pointer", transition: "all 0.15s",
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: t.text, borderColor: t.borderHover },
                  }}
                >
                  Cancel
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <Box
          sx={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(12px)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 2000, p: 2,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setDeleteId(null); setDeleteName(""); } }}
        >
          <Box sx={{
            background: t.card, borderRadius: "14px", border: `1px solid ${t.border}`,
            width: "100%", maxWidth: 480, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            animation: "modalIn 0.2s ease-out",
            transition: "background 0.2s, border-color 0.2s",
            "@keyframes modalIn": {
              "0%": { opacity: 0, transform: "scale(0.95) translateY(10px)" },
              "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
            },
          }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
              px: 3, py: 2.5,
            }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: "10px",
                  background: "rgba(248,113,113,0.1)",
                  border: "1px solid rgba(248,113,113,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#F87171",
                }}>
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: t.text, transition: "color 0.2s" }}>
                  Delete Project
                </Typography>
              </Stack>
              <IconButton onClick={() => { setDeleteId(null); setDeleteName(""); }} sx={{
                width: 32, height: 32, borderRadius: "8px", color: t.textMuted,
                "&:hover": { background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: t.text },
              }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Box sx={{ mx: 3, height: "1px", background: t.border, transition: "background 0.2s" }} />

            {/* Content */}
            <Box sx={{ px: 3, pt: 3, pb: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.6, transition: "color 0.2s" }}>
                Are you sure you want to delete <Box component="span" sx={{ color: t.text, fontWeight: 600, transition: "color 0.2s" }}>{deleteName}</Box>? This action cannot be undone.
              </Typography>

              {/* Actions */}
              <Stack spacing={1.5}>
                <Box
                  component="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: "none",
                    background: "linear-gradient(135deg, #F87171, #EF4444)",
                    color: "#fff", fontSize: 15, fontWeight: 600,
                    cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.7 : 1,
                    transition: "all 0.15s",
                    "&:hover": { transform: deleting ? "none" : "translateY(-1px)", boxShadow: "0 4px 16px rgba(248,113,113,0.3)" },
                  }}
                >
                  {deleting ? "Deleting..." : "Delete Project"}
                </Box>
                <Box
                  component="button"
                  onClick={() => { setDeleteId(null); setDeleteName(""); }}
                  disabled={deleting}
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: `1px solid ${t.border}`,
                    background: "transparent", color: t.textSec, fontSize: 15, fontWeight: 500,
                    cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.5 : 1,
                    transition: "all 0.15s",
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: t.text },
                  }}
                >
                  Cancel
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
