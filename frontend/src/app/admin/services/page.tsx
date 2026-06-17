"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { getThemeColors } from "@/lib/themeColors";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import BoltIcon from "@mui/icons-material/Bolt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadServices();
  }, [isAuthenticated]);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(Array.isArray(data) ? data : data.services || []);
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

  const confirmDelete = (s: Service) => {
    setDeleteId(s.id);
    setDeleteName(s.title);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteService(deleteId);
      setDeleteId(null);
      setDeleteName("");
      loadServices();
    } catch { /* empty */ }
    setDeleting(false);
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, background: t.bg, minHeight: "100vh", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px" }}>Services</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>{services.length} total services</Typography>
        </Box>
        <Box
          component="button"
          onClick={() => { setEditingId(null); setForm({ title: "", description: "" }); setOpen(true); }}
          sx={{
            display: "flex", alignItems: "center", gap: 1,
            px: 3, py: 1.5, borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #4ADE80, #22C55E)",
            color: "#000", fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": { transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(74,222,128,0.3)" },
          }}
        >
          <AddIcon sx={{ fontSize: 18 }} /> Add Service
        </Box>
      </Stack>

      {/* Cards */}
      {services.length === 0 ? (
        <Box sx={{
          py: 12, textAlign: "center", borderRadius: "10px",
          background: t.card, border: `1px solid ${t.border}`,
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
        }}>
          <BoltIcon sx={{ fontSize: 48, color: t.borderHover, mb: 2 }} />
          <Typography sx={{ fontSize: 16, color: t.textMuted }}>No services yet</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>Click &quot;Add Service&quot; to create one</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {services.map((s) => (
            <Box key={s.id} sx={{
              p: 2.5, borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`,
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
              "&:hover": { borderColor: t.borderHover, boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)" },
            }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Stack direction="row" alignItems="flex-start" spacing={3}>
                  <Box sx={{
                    width: 48, height: 48, borderRadius: "10px", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(74,222,128,0.04))",
                    border: "1px solid rgba(74,222,128,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#4ADE80",
                  }}>
                    <BoltIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 17, fontWeight: 600, color: t.text, mb: 0.5 }}>{s.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.6, maxWidth: 600 }}>
                      {s.description}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <Box
                    component="button"
                    onClick={() => handleEdit(s)}
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
                    onClick={() => confirmDelete(s)}
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
            width: "100%", maxWidth: 440, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            animation: "modalIn 0.2s ease-out",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
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
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: t.text }}>
                  {editingId ? "Edit Service" : "New Service"}
                </Typography>
              </Stack>
              <IconButton onClick={() => setOpen(false)} sx={{
                width: 32, height: 32, borderRadius: "8px", color: t.textMuted,
                "&:hover": { background: isDark ? "rgba(255,255,255,0.06)" : "#F3F4F6", color: t.text },
              }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Box sx={{ mx: 3, height: "1px", background: t.border }} />

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, pt: 3, pb: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: t.textSec, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>Title</Typography>
                <input
                  placeholder="e.g. Web Development"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: `1px solid ${t.border}`, background: t.input,
                    color: t.text, fontSize: 14, outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#4ADE80"; e.target.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = t.border; e.target.style.boxShadow = "none"; }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: t.textSec, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>Description</Typography>
                <textarea
                  placeholder="Describe this service..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={3}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: `1px solid ${t.border}`, background: t.input,
                    color: t.text, fontSize: 14, outline: "none",
                    fontFamily: "inherit", resize: "vertical",
                    transition: "all 0.2s", lineHeight: "1.5",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#4ADE80"; e.target.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = t.border; e.target.style.boxShadow = "none"; }}
                />
              </Box>

              {/* Footer */}
              <Stack spacing={1.5} sx={{ pt: 0.5 }}>
                <Box
                  component="button" type="submit"
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: "none",
                    background: editingId
                      ? "linear-gradient(135deg, #60A5FA, #3B82F6)"
                      : "linear-gradient(135deg, #4ADE80, #22C55E)",
                    color: "#000", fontSize: 15, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.15s",
                    "&:hover": { transform: "translateY(-1px)", boxShadow: editingId ? "0 4px 16px rgba(96,165,250,0.3)" : "0 4px 16px rgba(74,222,128,0.3)" },
                  }}
                >
                  {editingId ? "Update Service" : "Create Service"}
                </Box>
                <Box
                  component="button" type="button" onClick={() => setOpen(false)}
                  sx={{
                    width: "100%", py: 2, borderRadius: "8px", border: `1px solid ${t.border}`,
                    background: "transparent", color: t.textSec, fontSize: 15, fontWeight: 500,
                    cursor: "pointer", transition: "all 0.15s",
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.04)" : "#F3F4F6", color: t.text, borderColor: t.borderHover },
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
            width: "100%", maxWidth: 440, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            animation: "modalIn 0.2s ease-out",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
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
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: t.text }}>
                  Delete Service
                </Typography>
              </Stack>
              <IconButton onClick={() => { setDeleteId(null); setDeleteName(""); }} sx={{
                width: 32, height: 32, borderRadius: "8px", color: t.textMuted,
                "&:hover": { background: isDark ? "rgba(255,255,255,0.06)" : "#F3F4F6", color: t.text },
              }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Box sx={{ mx: 3, height: "1px", background: t.border }} />

            {/* Content */}
            <Box sx={{ px: 3, pt: 3, pb: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.6 }}>
                Are you sure you want to delete <Box component="span" sx={{ color: t.text, fontWeight: 600 }}>{deleteName}</Box>? This action cannot be undone.
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
                  {deleting ? "Deleting..." : "Delete Service"}
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
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.04)" : "#F3F4F6", color: t.text },
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
