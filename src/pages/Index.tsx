import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResearchSection from "@/components/ResearchSection";
import PartnershipSection from "@/components/PartnershipSection";
import VisionSection from "@/components/VisionSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <PartnershipSection />
      <VisionSection />
      <ContactSection />
    </div>
  );
};

export default Index;
