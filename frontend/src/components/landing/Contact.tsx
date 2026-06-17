"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { createContact, trackEvent } from "@/services/api";
import { useThemeMode } from "@/context/ThemeContext";

export default function Contact() {
  const { isDark } = useThemeMode();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await createContact(form);
      trackEvent({ eventType: "CONTACT_SUBMIT", page: "/", metadata: { name: form.name, email: form.email } }).catch(() => {});
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: <EmailOutlinedIcon sx={{ fontSize: 18, color: "#108B4E" }} />, label: "Email", value: "hello@novastudio.com" },
    { icon: <PhoneOutlinedIcon sx={{ fontSize: 18, color: "#108B4E" }} />, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#108B4E" }} />, label: "Location", value: "San Francisco, CA" },
    { icon: <AccessTimeIcon sx={{ fontSize: 18, color: "#108B4E" }} />, label: "Response time", value: "Under 24 hours" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, lg: 0 },
        background: isDark ? "#111111" : "#FFFFFF",
      }}
    >
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        {/* Header */}
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Contact us"
            sx={{
              mb: 3,
              height: 32,
              borderRadius: "100px",
              background: isDark ? "#1A1A1A" : "#F0FDF4",
              border: isDark ? "1px solid #2A2A2A" : "1px solid #BBF7D0",
              fontSize: 14,
              fontWeight: 500,
              color: "#108B4E",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 34, md: 52 },
              fontWeight: 600,
              letterSpacing: "-2.5px",
              lineHeight: { xs: 1.15, md: 1.1 },
              color: isDark ? "#F0F0F0" : "#111827",
              mb: 2,
            }}
          >
            Get in{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #108B4E 0%, #059669 50%, #10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              touch
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 17, md: 20 },
              color: isDark ? "#888888" : "#6B7280",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and we&apos;ll respond within 24 hours.
          </Typography>
        </Stack>

        {/* Contact Info Strip */}
        <Grid container spacing={1.5} sx={{ mb: { xs: 5, md: 6 } }}>
          {contactInfo.map((item) => (
            <Grid key={item.label} size={{ xs: 6, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 2,
                  px: 2,
                  borderRadius: "8px",
                  background: isDark ? "#1A1A1A" : "#F9FAFB",
                  border: isDark ? "1px solid #2A2A2A" : "1px solid #F3F4F6",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: isDark ? "#3A3A3A" : "#E5E7EB",
                    background: isDark ? "#222222" : "#FFFFFF",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "8px",
                    background: isDark ? "#0D2E1A" : "#F0FDF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 11, color: isDark ? "#666666" : "#9CA3AF", fontWeight: 500, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: isDark ? "#D4D4D4" : "#374151",
                      fontWeight: 500,
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Form Card */}
        <Box
          sx={{
            borderRadius: "12px",
            border: isDark ? "1px solid #2A2A2A" : "1px solid #F3F4F6",
            background: isDark ? "#1A1A1A" : "#FFFFFF",
            boxShadow: isDark
              ? "0 1px 3px rgba(0,0,0,0.2)"
              : "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 4, md: 5 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: isDark ? "#D4D4D4" : "#374151", mb: 1 }}>Full Name</Typography>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      style={{
                        width: "100%", padding: "11px 14px", borderRadius: "8px",
                        border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
                        background: isDark ? "#222222" : "#F9FAFB",
                        color: isDark ? "#F0F0F0" : "#111827", fontSize: 15, outline: "none",
                        transition: "all 0.2s", fontFamily: "inherit",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#108B4E"; e.target.style.boxShadow = "0 0 0 3px rgba(16,139,78,0.08)"; e.target.style.background = isDark ? "#2A2A2A" : "#FFFFFF"; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "#3A3A3A" : "#E5E7EB"; e.target.style.boxShadow = "none"; e.target.style.background = isDark ? "#222222" : "#F9FAFB"; }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: isDark ? "#D4D4D4" : "#374151", mb: 1 }}>Email Address</Typography>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      style={{
                        width: "100%", padding: "11px 14px", borderRadius: "8px",
                        border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
                        background: isDark ? "#222222" : "#F9FAFB",
                        color: isDark ? "#F0F0F0" : "#111827", fontSize: 15, outline: "none",
                        transition: "all 0.2s", fontFamily: "inherit",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#108B4E"; e.target.style.boxShadow = "0 0 0 3px rgba(16,139,78,0.08)"; e.target.style.background = isDark ? "#2A2A2A" : "#FFFFFF"; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "#3A3A3A" : "#E5E7EB"; e.target.style.boxShadow = "none"; e.target.style.background = isDark ? "#222222" : "#F9FAFB"; }}
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: isDark ? "#D4D4D4" : "#374151", mb: 1 }}>Message</Typography>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: "8px",
                      border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
                      background: isDark ? "#222222" : "#F9FAFB",
                      color: isDark ? "#F0F0F0" : "#111827", fontSize: 15, outline: "none",
                      transition: "all 0.2s", fontFamily: "inherit",
                      resize: "vertical", lineHeight: "1.5",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#108B4E"; e.target.style.boxShadow = "0 0 0 3px rgba(16,139,78,0.08)"; e.target.style.background = isDark ? "#2A2A2A" : "#FFFFFF"; }}
                    onBlur={(e) => { e.target.style.borderColor = isDark ? "#3A3A3A" : "#E5E7EB"; e.target.style.boxShadow = "none"; e.target.style.background = isDark ? "#222222" : "#F9FAFB"; }}
                  />
                </Box>

                {status === "success" && (
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{
                    p: 2, borderRadius: "8px", background: isDark ? "#0D2E1A" : "#F0FDF4",
                    border: isDark ? "1px solid #108B4E" : "1px solid #BBF7D0",
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 18, color: "#108B4E" }} />
                    <Typography sx={{ fontSize: 14, color: "#108B4E", fontWeight: 500 }}>
                      Message sent successfully! We&apos;ll get back to you soon.
                    </Typography>
                  </Stack>
                )}
                {status === "error" && (
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{
                    p: 2, borderRadius: "8px", background: isDark ? "#2D0A0A" : "#FEF2F2",
                    border: isDark ? "1px solid #DC2626" : "1px solid #FECACA",
                  }}>
                    <ErrorIcon sx={{ fontSize: 18, color: "#DC2626" }} />
                    <Typography sx={{ fontSize: 14, color: "#DC2626", fontWeight: 500 }}>
                      Failed to send message. Please try again.
                    </Typography>
                  </Stack>
                )}

                <Box
                  component="button"
                  type="submit"
                  disabled={status === "loading"}
                  sx={{
                    width: "100%", height: 48, borderRadius: "8px", border: "none",
                    background: "linear-gradient(135deg, #108B4E 0%, #059669 100%)",
                    color: "#FFF", fontSize: 15, fontWeight: 600,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(16,139,78,0.2)",
                    "&:hover": status !== "loading" ? {
                      boxShadow: "0 4px 12px rgba(16,139,78,0.3)",
                      transform: "translateY(-1px)",
                    } : {},
                  }}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  {status !== "loading" && <SendIcon sx={{ fontSize: 18 }} />}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Social Row */}
        <Stack direction="row" justifyContent="center" spacing={1.5} sx={{ mt: { xs: 4, md: 5 } }}>
          {[
            { name: "LinkedIn", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
            { name: "X", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg> },
            { name: "GitHub", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
            { name: "YouTube", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
          ].map((social) => (
            <IconButton
              key={social.name}
              aria-label={social.name}
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                background: isDark ? "#1A1A1A" : "#F9FAFB",
                border: isDark ? "1px solid #2A2A2A" : "1px solid #F3F4F6",
                color: isDark ? "#888888" : "#6B7280",
                transition: "all 0.2s",
                "&:hover": {
                  background: "#108B4E",
                  color: "#FFF",
                  borderColor: "#108B4E",
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
