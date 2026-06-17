export function getThemeColors(isDark: boolean) {
  return {
    bg: isDark ? "#0A0A0A" : "#F8FAFC",
    card: isDark ? "#141414" : "#FFFFFF",
    cardHover: isDark ? "#1A1A1A" : "#F9FAFB",
    border: isDark ? "#222222" : "#E5E7EB",
    borderHover: isDark ? "#333333" : "#D1D5DB",
    text: isDark ? "#F5F5F5" : "#111827",
    textSec: isDark ? "#A3A3A3" : "#6B7280",
    textMuted: isDark ? "#666666" : "#9CA3AF",
    sidebar: isDark ? "#0A0A0A" : "#FFFFFF",
    sidebarBorder: isDark ? "#1F1F1F" : "#E5E7EB",
    sidebarText: isDark ? "#94A3B8" : "#64748B",
    sidebarTextHover: isDark ? "#CBD5E1" : "#334155",
    input: isDark ? "#0D0D0D" : "#F9FAFB",
    inputHover: isDark ? "#141414" : "#F3F4F6",
    chipBg: isDark ? "rgba(255,255,255,0.05)" : "#F3F4F6",
    rowBg: isDark ? "#111111" : "#F9FAFB",
    shadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.06)",
  };
}
