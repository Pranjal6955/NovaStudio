"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Grid,
  Card,
  Chip,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { createContact } from "@/services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await createContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: <EmailOutlinedIcon sx={{ fontSize: 20, color: "#108B4E" }} />, label: "Email", value: "hello@novastudio.com" },
    { icon: <PhoneOutlinedIcon sx={{ fontSize: 20, color: "#108B4E" }} />, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: <LocationOnOutlinedIcon sx={{ fontSize: 20, color: "#108B4E" }} />, label: "Location", value: "San Francisco, CA" },
    { icon: <AccessTimeIcon sx={{ fontSize: 20, color: "#108B4E" }} />, label: "Response time", value: "Under 24 hours" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, lg: 0 },
        background: "#FFFFFF",
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
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
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
              color: "#111827",
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
              color: "#6B7280",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and we&apos;ll respond within 24 hours.
          </Typography>
        </Stack>

        {/* Contact Info Strip */}
        <Grid container spacing={2} sx={{ mb: { xs: 5, md: 6 } }}>
          {contactInfo.map((item) => (
            <Grid key={item.label} size={{ xs: 6, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 2,
                  px: 2,
                  borderRadius: "14px",
                  background: "#F9FAFB",
                  border: "1px solid #F3F4F6",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#E5E7EB",
                    background: "#FFFFFF",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "#F0FDF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, lineHeight: 1.2 }}>
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#374151",
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
        <Card
          elevation={0}
          sx={{
            borderRadius: "24px",
            border: "1px solid #F3F4F6",
            background: "#FFFFFF",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 5, md: 7 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3.5}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Full Name"
                      required
                      fullWidth
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      size="medium"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          fontSize: 15,
                          "&:hover fieldset": { borderColor: "#108B4E" },
                        },
                        "& .Mui-focused fieldset": { borderColor: "#108B4E" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#108B4E" },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email Address"
                      type="email"
                      required
                      fullWidth
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      size="medium"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          fontSize: 15,
                          "&:hover fieldset": { borderColor: "#108B4E" },
                        },
                        "& .Mui-focused fieldset": { borderColor: "#108B4E" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#108B4E" },
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Message"
                  required
                  multiline
                  rows={5}
                  fullWidth
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project, goals, and timeline..."
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: 15,
                      "&:hover fieldset": { borderColor: "#108B4E" },
                    },
                    "& .Mui-focused fieldset": { borderColor: "#108B4E" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#108B4E" },
                  }}
                />

                {status === "success" && (
                  <Alert
                    severity="success"
                    sx={{ borderRadius: "12px", fontSize: 14 }}
                  >
                    Message sent successfully! We&apos;ll get back to you soon.
                  </Alert>
                )}
                {status === "error" && (
                  <Alert
                    severity="error"
                    sx={{ borderRadius: "12px", fontSize: 14 }}
                  >
                    Failed to send message. Please try again.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={status === "loading"}
                  sx={{
                    height: 52,
                    borderRadius: "12px",
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #108B4E 0%, #059669 100%)",
                    boxShadow: "0 4px 14px rgba(16,139,78,0.35)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0D7A42 0%, #047837 100%)",
                      boxShadow: "0 6px 20px rgba(16,139,78,0.45)",
                    },
                    "&.Mui-disabled": {
                      background: "#E5E7EB",
                      boxShadow: "none",
                    },
                  }}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Card>

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
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "#F9FAFB",
                border: "1px solid #F3F4F6",
                color: "#6B7280",
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
