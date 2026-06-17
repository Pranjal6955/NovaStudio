"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import { getThemeColors } from "@/lib/themeColors";
import { Box, Typography, Stack, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/MailOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getContacts, deleteContact } from "@/services/api";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const AVATAR_COLORS = ["#4ADE80", "#60A5FA", "#A78BFA", "#FB923C", "#F87171"];

export default function ContactsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { isDark } = useThemeMode();
  const t = getThemeColors(isDark);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadContacts();
  }, [isAuthenticated]);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(Array.isArray(data) ? data : data.contacts || []);
    } catch { /* empty */ }
  };

  const confirmDelete = (c: Contact) => {
    setDeleteId(c.id);
    setDeleteName(c.name);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteContact(deleteId);
      setDeleteId(null);
      setDeleteName("");
      loadContacts();
    } catch { /* empty */ }
    setDeleting(false);
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.5px" }}>Contacts</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>{contacts.length} total submissions</Typography>
        </Box>
      </Stack>

      {/* Stats Row */}
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <Box sx={{
          flex: 1, p: 2.5, borderRadius: "10px", background: t.card,
          border: `1px solid ${t.border}`, transition: "background 0.2s, color 0.2s, border-color 0.2s",
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.5 }}>
            Total Messages
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: t.text }}>
            {contacts.length}
          </Typography>
        </Box>
        <Box sx={{
          flex: 1, p: 2.5, borderRadius: "10px", background: t.card,
          border: `1px solid ${t.border}`, transition: "background 0.2s, color 0.2s, border-color 0.2s",
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.5 }}>
            This Week
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: t.text }}>
            {contacts.filter((c) => {
              const d = new Date(c.createdAt);
              const now = new Date();
              return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
            }).length}
          </Typography>
        </Box>
        <Box sx={{
          flex: 1, p: 2.5, borderRadius: "10px", background: t.card,
          border: `1px solid ${t.border}`, transition: "background 0.2s, color 0.2s, border-color 0.2s",
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.5 }}>
            Unique Emails
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: t.text }}>
            {new Set(contacts.map((c) => c.email)).size}
          </Typography>
        </Box>
      </Stack>

      {/* Contact List */}
      {contacts.length === 0 ? (
        <Box sx={{ py: 12, textAlign: "center", borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`, transition: "background 0.2s, color 0.2s, border-color 0.2s" }}>
          <MailIcon sx={{ fontSize: 48, color: t.borderHover, mb: 2 }} />
          <Typography sx={{ fontSize: 16, color: t.textMuted }}>No contact submissions yet</Typography>
          <Typography sx={{ fontSize: 14, color: t.textMuted, mt: 0.5 }}>Submissions from the landing page will appear here</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {contacts.map((c, i) => {
            const isExpanded = expandedId === c.id;
            const color = AVATAR_COLORS[i % 5];
            return (
              <Box key={c.id} sx={{
                borderRadius: "10px", background: t.card, border: `1px solid ${t.border}`,
                overflow: "hidden",
                transition: "all 0.2s",
                "&:hover": { borderColor: t.borderHover },
              }}>
                {/* Main Row */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ p: 2.5, cursor: "pointer" }}
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                >
                  {/* Avatar */}
                  <Box sx={{
                    width: 40, height: 40, borderRadius: "10px", flexShrink: 0,
                    background: `${color}15`, border: `1px solid ${color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 600, color }}>
                      {c.name.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>

                  {/* Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: t.text }}>{c.name}</Typography>
                      <Chip label={new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })} size="small" sx={{
                        height: 22, fontSize: 11, fontWeight: 500, borderRadius: "6px",
                        background: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6", color: t.textMuted,
                        border: `1px solid ${t.border}`,
                      }} />
                    </Stack>
                    <Typography sx={{ fontSize: 13, color: t.textMuted, mt: 0.25 }}>
                      {c.email}
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                    <Box
                      component="button"
                      onClick={(e) => { e.stopPropagation(); confirmDelete(c); }}
                      sx={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 32, height: 32, borderRadius: "8px", border: "none",
                        background: "rgba(248,113,113,0.08)", color: "#F87171",
                        cursor: "pointer", transition: "all 0.15s",
                        "&:hover": { background: "rgba(248,113,113,0.15)" },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box sx={{
                      width: 32, height: 32, borderRadius: "8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: t.textMuted, transform: isExpanded ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}>
                      <CloseIcon sx={{ fontSize: 16, transform: "rotate(45deg)" }} />
                    </Box>
                  </Stack>
                </Stack>

                {/* Expanded Message */}
                {isExpanded && (
                  <Box sx={{
                    px: 2.5, pb: 2.5, pt: 0,
                  }}>
                    <Box sx={{
                      p: 2.5, borderRadius: "8px", background: t.input,
                      border: `1px solid ${t.border}`,
                    }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                        <MailIcon sx={{ fontSize: 14, color: t.textMuted }} />
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Message
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                        {c.message}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: 11, color: t.textMuted }}>
                          {new Date(c.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>
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
            boxShadow: isDark ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)" : "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
            animation: "modalIn 0.2s ease-out",
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
                  Delete Contact
                </Typography>
              </Stack>
              <IconButton onClick={() => { setDeleteId(null); setDeleteName(""); }} sx={{
                width: 32, height: 32, borderRadius: "8px", color: t.textMuted,
                "&:hover": { background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: t.text },
              }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Box sx={{ mx: 3, height: "1px", background: t.border }} />

            {/* Content */}
            <Box sx={{ px: 3, pt: 3, pb: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography sx={{ fontSize: 14, color: t.textSec, lineHeight: 1.6 }}>
                Are you sure you want to delete submission from <Box component="span" sx={{ color: t.text, fontWeight: 600 }}>{deleteName}</Box>? This action cannot be undone.
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
                  {deleting ? "Deleting..." : "Delete Contact"}
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
                    "&:hover": { background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", color: t.text },
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
