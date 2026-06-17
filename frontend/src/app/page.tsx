"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import Portfolio from "@/components/landing/Portfolio";
import Stats from "@/components/landing/Stats";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F4" }}>
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
