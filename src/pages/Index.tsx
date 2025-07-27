import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResearchSection from "@/components/ResearchSection";
import PartnershipSection from "@/components/PartnershipSection";
import VisionSection from "@/components/VisionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      // wait for sections to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const offsetTop = el.offsetTop - 80; // account for fixed nav
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Octash Labs - Precision Dairy Farming Research & Development"
        description="Advancing sustainable pasture management and livestock productivity in Africa through data-driven innovation. Research-backed solutions for dairy farmers."
        keywords="precision dairy farming, pasture management, livestock productivity, agriculture research, sustainable farming, Nigeria dairy, Africa agriculture"
      />
      <Navigation />
      <section id="hero"><HeroSection /></section>
      <section id="about"><AboutSection /></section>
      <section id="research"><ResearchSection /></section>
      <section id="partnership"><PartnershipSection /></section>
      <section id="vision"><VisionSection /></section>
      <section id="contact"><ContactSection /></section>
      <Footer />
    </div>
  );
};

export default Index;
