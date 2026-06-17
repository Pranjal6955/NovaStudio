"use client";

import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import Portfolio from "@/components/landing/Portfolio";
import Stats from "@/components/landing/Stats";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { useThemeMode } from "@/context/ThemeContext";
import { trackEvent } from "@/services/api";

export default function Home() {
  const { isDark } = useThemeMode();

  useEffect(() => {
    trackEvent({ eventType: "PAGE_VISIT", page: "/" }).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: isDark ? "#111111" : "#F5F5F4", transition: "background 0.3s" }}>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <HowItWorks />
      <Portfolio />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}
