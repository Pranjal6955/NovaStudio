"use client";

import { Box, Typography, Stack, Button, IconButton, Divider, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useThemeMode } from "@/context/ThemeContext";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Documentation"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Community", "Help Center", "API Reference", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};

const socials = [
  { name: "LinkedIn", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
  { name: "X", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg> },
  { name: "GitHub", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
  { name: "YouTube", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
];

export default function Footer() {
  const { isDark } = useThemeMode();
  return (
    <Box
      component="footer"
      sx={{
        background: isDark ? "#111111" : "#F5F5F4",
        color: isDark ? "#F0F0F0" : "#111827",
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        px: { xs: 3, lg: 0 },
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        {/* CTA Banner */}
        <Box
          sx={{
            mb: { xs: 8, md: 10 },
            p: { xs: 5, md: 7 },
            borderRadius: "24px",
            background: "linear-gradient(135deg, #108B4E 0%, #059669 50%, #047837 100%)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 30, md: 42 },
              fontWeight: 600,
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
              mb: 2,
            }}
          >
            Ready to build something amazing?
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 20 }, color: "rgba(255,255,255,0.8)", mb: 4, maxWidth: 480, mx: "auto" }}>
            Start your free trial today. No credit card required.
          </Typography>
          <Button
            href="/admin/login"
            endIcon={<ArrowForwardIcon />}
            sx={{
              height: 48,
              px: 4,
              borderRadius: "12px",
              background: "#FFFFFF",
              color: "#108B4E",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              "&:hover": { background: "#F0FDF4" },
            }}
          >
            Get started free
          </Button>
        </Box>

        {/* Footer Grid */}
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: { xs: 8, md: 10 } }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "#108B4E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ color: "#FFF", fontWeight: 700, fontSize: 18 }}>N</Typography>
              </Box>
              <Typography sx={{ fontSize: 20, fontWeight: 600, color: isDark ? "#F0F0F0" : "#111827", letterSpacing: "-0.5px" }}>
                NovaStudio
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 15, color: isDark ? "#888888" : "#6B7280", lineHeight: 1.6, mb: 3, maxWidth: 280 }}>
              AI-powered digital agency platform. Build, launch, and scale your digital products faster than ever.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socials.map((social) => (
                <IconButton
                  key={social.name}
                  aria-label={social.name}
                  sx={{
                    color: isDark ? "#888888" : "#6B7280",
                    "&:hover": { color: "#108B4E", background: isDark ? "#0D2E1A" : "#F0FDF4" },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid key={category} size={{ xs: 6, sm: 3, md: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: isDark ? "#F0F0F0" : "#111827", textTransform: "uppercase", letterSpacing: "1px", mb: 2.5 }}>
                {category}
              </Typography>
              <Stack spacing={1.5}>
                {links.map((link) => (
                  <Typography
                    key={link}
                    component="a"
                    href="#"
                    sx={{
                      fontSize: 15,
                      color: isDark ? "#888888" : "#6B7280",
                      transition: "color 0.2s",
                      "&:hover": { color: "#108B4E" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: isDark ? "#2A2A2A" : "#E5E7EB", mb: 4 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Typography sx={{ fontSize: 14, color: isDark ? "#888888" : "#6B7280" }}>
            &copy; {new Date().getFullYear()} NovaStudio. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography component="a" href="#" sx={{ fontSize: 14, color: isDark ? "#888888" : "#6B7280", "&:hover": { color: isDark ? "#F0F0F0" : "#111827" } }}>
              Privacy Policy
            </Typography>
            <Typography component="a" href="#" sx={{ fontSize: 14, color: isDark ? "#888888" : "#6B7280", "&:hover": { color: isDark ? "#F0F0F0" : "#111827" } }}>
              Terms of Service
            </Typography>
            <Typography component="a" href="#" sx={{ fontSize: 14, color: isDark ? "#888888" : "#6B7280", "&:hover": { color: isDark ? "#F0F0F0" : "#111827" } }}>
              Cookies
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
