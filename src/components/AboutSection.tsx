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
                Octash is an R&D-driven agritech venture transforming dairy farming into a more productive, 
                profitable and sustainable sector for African farmers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We deliver smarter pasture solutions, actionable data insights, and practical tools that help 
                farmers optimise feed, keep healthier herds, and produce more milk all year round.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is simple: make dairy farming sustainable, profitable, and rewarding for farmers 
                across Africa.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through a unique blend of research, technology, and deep local expertise, we partner with farmers, 
                cooperatives, NGOs, and research institutions to build solutions that truly work in African farming 
                realities.
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
