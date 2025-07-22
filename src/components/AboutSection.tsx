import researchImage from "@/assets/research-lab.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-subtle pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
                About Octash
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Octash is an R&D-driven agritech venture leveraging satellite data, 
                artificial intelligence, and precision farming techniques to transform 
                African agriculture.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is to make African dairy farming sustainable, profitable, 
                and climate-smart through evidence-based innovation and strategic 
                partnerships with leading research institutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We combine cutting-edge technology with deep understanding of local 
                agricultural challenges to develop solutions that work for African farmers.
              </p>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated hover-lift">
              <img 
                src={researchImage} 
                alt="Agricultural research and data analysis" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-green/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;