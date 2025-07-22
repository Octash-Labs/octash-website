import dairyImage from "@/assets/dairy-landscape.jpg";

const VisionSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green">
              Vision for African Dairy
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a future where African dairy farming is synonymous with 
                sustainability, profitability, and technological innovation. Through 
                science-driven approaches and strategic partnerships, we're building 
                the foundation for this transformation.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Our long-term goal is to transform dairy value chains across Africa, 
                making them more resilient to climate change, economically viable for 
                farmers, and environmentally sustainable for future generations.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                By 2030, we aim to impact over 100,000 smallholder dairy farmers 
                across East Africa through our research partnerships and technology 
                transfer programs.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-forest-green">100k+</div>
                <div className="text-sm text-gray-600">Farmers Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest-green">15+</div>
                <div className="text-sm text-gray-600">Research Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest-green">50+</div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={dairyImage} 
                alt="Sustainable African dairy farming landscape" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-green/30 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-elevated">
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-green">2030</div>
                <div className="text-sm text-gray-600">Target Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;