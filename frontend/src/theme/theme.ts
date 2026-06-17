import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#108B4E",
      light: "#1FB567",
      dark: "#0D7A42",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#323232",
      light: "#555555",
      dark: "#151515",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#151515",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), Arial, Helvetica, sans-serif",
    h1: {
      fontSize: "3.25rem",
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: "-0.015em",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          background: "#108B4E",
          "&:hover": {
            background: "#0D7A42",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
