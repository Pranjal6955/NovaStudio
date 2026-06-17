"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { isDark } = useThemeMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/admin");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark ? "#111111" : "#F8FAFC",
        px: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 8 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "12px", background: "#108B4E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "#FFF", fontWeight: 700, fontSize: 22 }}>N</Typography>
          </Box>
          <Typography sx={{ fontSize: 24, fontWeight: 600, color: isDark ? "#F0F0F0" : "#111827", letterSpacing: "-0.5px" }}>
            NovaStudio
          </Typography>
        </Stack>

        {/* Card */}
        <Box
          sx={{
            background: isDark ? "#1A1A1A" : "#FFFFFF",
            borderRadius: "20px",
            p: { xs: 4, md: 5 },
            boxShadow: isDark
              ? "0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)"
              : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
            border: isDark ? "1px solid #2A2A2A" : "1px solid #F3F4F6",
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 600, color: isDark ? "#F0F0F0" : "#111827", mb: 0.5, textAlign: "center" }}>
            Sign in
          </Typography>
          <Typography sx={{ fontSize: 15, color: isDark ? "#888888" : "#6B7280", mb: 4, textAlign: "center" }}>
            Enter your credentials to access the dashboard
          </Typography>

          {/* Demo Credentials */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: "10px",
              background: isDark ? "#1A2E1A" : "#E8F5E9",
              border: isDark ? "1px solid #2D5A2D" : "1px solid #C8E6C9",
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#108B4E", mb: 0.5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Demo Credentials
            </Typography>
            <Typography sx={{ fontSize: 13, color: isDark ? "#A5D6A7" : "#2E7D32" }}>
              Email: <strong>admin@novastudio.com</strong>
            </Typography>
            <Typography sx={{ fontSize: 13, color: isDark ? "#A5D6A7" : "#2E7D32" }}>
              Password: <strong>admin123</strong>
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: isDark ? "#D4D4D4" : "#374151", mb: 0.75 }}>
                  Email address
                </Typography>
                <TextField
                  type="email"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@novastudio.com"
                  size="medium"
                  slotProps={{
                    input: {
                      sx: {
                        color: isDark ? "#F0F0F0" : "#111827",
                        "&::placeholder": { color: isDark ? "#666666" : "#9CA3AF" },
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      fontSize: 14,
                      backgroundColor: isDark ? "#222222" : "#F9FAFB",
                      "&:hover": { backgroundColor: isDark ? "#2A2A2A" : "#F3F4F6" },
                      "& fieldset": { borderColor: isDark ? "#3A3A3A" : "#E5E7EB" },
                      "&:hover fieldset": { borderColor: isDark ? "#555555" : "#D1D5DB" },
                    },
                    "& .Mui-focused fieldset": { borderColor: "#108B4E", borderWidth: 1 },
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: isDark ? "#D4D4D4" : "#374151", mb: 0.75 }}>
                  Password
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="medium"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: isDark ? "#888888" : "#9CA3AF" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        color: isDark ? "#F0F0F0" : "#111827",
                        "&::placeholder": { color: isDark ? "#666666" : "#9CA3AF" },
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      fontSize: 14,
                      backgroundColor: isDark ? "#222222" : "#F9FAFB",
                      "&:hover": { backgroundColor: isDark ? "#2A2A2A" : "#F3F4F6" },
                      "& fieldset": { borderColor: isDark ? "#3A3A3A" : "#E5E7EB" },
                      "&:hover fieldset": { borderColor: isDark ? "#555555" : "#D1D5DB" },
                    },
                    "& .Mui-focused fieldset": { borderColor: "#108B4E", borderWidth: 1 },
                  }}
                />
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: "10px", fontSize: 13, py: 0 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  height: 44,
                  borderRadius: "10px",
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "none",
                  background: "#108B4E",
                  boxShadow: "none",
                  mt: 0.5,
                  "&:hover": { background: "#0D7A42", boxShadow: "none" },
                  "&.Mui-disabled": { background: isDark ? "#2A2A2A" : "#E5E7EB", boxShadow: "none" },
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>
        </Box>

        <Typography sx={{ textAlign: "center", fontSize: 13, color: isDark ? "#666666" : "#9CA3AF", mt: 4 }}>
          &copy; {new Date().getFullYear()} NovaStudio
        </Typography>
      </Box>
    </Box>
  );
}
