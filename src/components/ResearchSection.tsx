import { Satellite, TreePine, Shield, Droplets } from "lucide-react";

const ResearchSection = () => {
  const researchAreas = [
    {
      icon: Satellite,
      title: "Better Pasture Monitoring",
      description: "We’re finding simple ways for farmers to know when their grass is healthy, when it’s ready for grazing, and how to avoid overgrazing—so cows always have enough good-quality feed."
    },
    {
      icon: TreePine,
      title: "Improved Forage Research",
      description: "We’re testing and improving grasses that grow well in local conditions, survive dry seasons, and keep cows well-fed and productive."
    },
    {
      icon: Shield,
      title: "Healthier Herd",
      description: "We’re exploring ways to prevent common diseases, improve herd health, and keep farms running smoothly with fewer losses."
    },
    {
      icon: Droplets,
      title: "Farm and Resource Management",
      description: "Giving farmers simple, reliable ways to monitor cows, improve breeding, and manage their farms for better milk production."
    }
  ];

  return (
    <section id="research" className="py-24 bg-white pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
            Research Focus & Initiatives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our research initiatives focus on practical solutions that address the unique 
            challenges facing African dairy in ways that are sustainable and affordable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {researchAreas.map((area, index) => (
            <div key={index} className="group animate-fade-in-up">
              <div className="bg-gradient-subtle p-8 rounded-2xl shadow-soft hover:shadow-elevated transition-smooth hover-lift">
                <div className="flex items-start gap-6">
                  <div className="bg-forest-green p-4 rounded-xl text-white">
                    <area.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-forest-green mb-4">
                      {area.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-sage-green/20 p-8 rounded-2xl border border-sage-green/30">
            <p className="text-lg text-forest-green font-medium">
              Currently conducting feasibility studies and pilot programs with smallholder 
              farmers across East Africa to validate our research approaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
