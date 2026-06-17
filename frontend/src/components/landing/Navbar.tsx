"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "@/context/ThemeContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const { isDark, toggle } = useThemeMode();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <Fade in timeout={300}>
        <Box
          component="header"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            pt: 2,
            px: 2,
          }}
        >
          <Stack
            alignItems="center"
            sx={{
              maxWidth: 680,
              mx: "auto",
              height: 56,
              borderRadius: "18px",
              background: trigger
                ? isDark ? "rgba(26,26,26,0.95)" : "rgba(50,50,50,0.95)"
                : isDark ? "#1A1A1A" : "#323232",
              backdropFilter: trigger ? "blur(20px)" : "none",
              WebkitBackdropFilter: trigger ? "blur(20px)" : "none",
              px: 0.5,
              boxShadow: trigger ? "0 4px 20px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
            }}
          >
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                flexShrink: 0,
                ml: 0.5,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <img src="/Logo.svg" alt="NovaStudio" style={{ width: 36, height: 36 }} />
            </Box>

            <Stack
              component="nav"
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: "#FFF",
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: "-0.5px",
                    px: 1.5,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    minWidth: "auto",
                    "&:hover": { background: "rgba(255,255,255,0.1)" },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" alignItems="center" gap={0.5}>
              <IconButton
                onClick={toggle}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  color: "#FFF",
                  background: "rgba(255,255,255,0.08)",
                  "&:hover": { background: "rgba(255,255,255,0.15)" },
                }}
              >
                {isDark ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
              </IconButton>

              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#ccc",
                  borderRadius: "10px",
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": { background: "rgba(255,255,255,0.1)", color: "#fff" },
                }}
              >
                <MenuIcon sx={{ fontSize: 20 }} />
              </IconButton>

              <Button
                href="/admin/login"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  height: 36,
                  px: 2.5,
                  borderRadius: "10px",
                  background: "#108B4E",
                  color: "#FFF",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "-0.3px",
                  textTransform: "none",
                  "&:hover": { background: "#0D7A42" },
                }}
              >
                Admin Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>

      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { background: "transparent", boxShadow: "none", mt: "72px", px: 2 } }}
      >
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            borderRadius: "24px",
            background: isDark ? "#1A1A1A" : "#323232",
            p: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <List sx={{ p: 0 }}>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                component="a"
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: "14px", mb: 0.5, color: "#FFF", "&:hover": { background: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 16, fontWeight: 400 }} />
              </ListItem>
            ))}
            <ListItem component="a" href="/admin/login" onClick={handleDrawerToggle} sx={{ mt: 1, p: 0 }}>
              <Button
                fullWidth
                sx={{
                  height: 40,
                  borderRadius: "12px",
                  background: "#108B4E",
                  color: "#FFF",
                  fontSize: 16,
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { background: "#0D7A42" },
                }}
              >
                Admin Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
