import { Users, Lightbulb, Target, Globe } from "lucide-react";

const PartnershipSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Collaborative Research",
      description: "Joint research projects with leading institutions, combining expertise for greater impact."
    },
    {
      icon: Lightbulb,
      title: "Knowledge-Sharing",
      description: "We share insights with trusted partners to improve adoption and ensure solutions truly work for farmers."
    },
    {
      icon: Target,
      title: "Evidence-Based Trials",
      description: "Rigorous field trials ensure all solutions are validated in real farm conditions before scaling."
    },
    {
      icon: Globe,
      title: "Scalable Solutions",
      description: "Focus on developing technologies and practices that can be adapted and scaled across diverse African agricultural systems."
    }
  ];

  return (
    <section id="partnership" className="py-24 bg-gradient-earth pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
            Why Partner With Octash
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We collaborate with research institutions, universities, individuals, agritech companies, and NGOs to 
            co-develop solutions that transform African agriculture through science and innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group animate-fade-in-up">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-elevated transition-smooth h-full hover-lift">
                <div className="bg-forest-green p-4 rounded-xl text-white w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-forest-green mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-elevated max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-forest-green mb-6">
              Research Partnerships
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              We're actively seeking partnerships with leading agricultural research institutes, 
              universities, and organizations committed to advancing sustainable farming in Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-sage-green">
              <span className="bg-sage-green/20 px-4 py-2 rounded-full">Research Centers</span>
              <span className="bg-sage-green/20 px-4 py-2 rounded-full">Agricultural Universities</span>
              <span className="bg-sage-green/20 px-4 py-2 rounded-full">NGO Partners</span>
              <span className="bg-sage-green/20 px-4 py-2 rounded-full">Agritech Companies</span>
              <span className="bg-sage-green/20 px-4 py-2 rounded-full">Individuals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
