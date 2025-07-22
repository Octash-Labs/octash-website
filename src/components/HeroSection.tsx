import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farming.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-green/60 to-sage-green/40" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Reimagining Dairy Farming
            <span className="block text-warm-cream">In Africa</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-warm-cream/90 max-w-4xl mx-auto leading-relaxed">
            Octash supports farmers to grow richer pastures, manage their herds better, and boost 
            milk production through simple, research-driven solutions.
          </p>
          
          <div className="pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-xl bg-white text-forest-green hover:bg-gray-100"
              onClick={scrollToContact}
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-white/60 rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
