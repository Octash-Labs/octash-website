import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    organization: '',
    email: '',
    partnershipInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.organization || !formData.email || !formData.partnershipInterest) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your partnership inquiry.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        organization: '',
        email: '',
        partnershipInterest: ''
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again or contact us directly at partnerships@octash.co",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-forest-green text-white pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partner With Us
          </h2>
          <p className="text-xl text-warm-cream/90 max-w-3xl mx-auto">
            Ready to collaborate on advancing African agriculture? Let's discuss how 
            we can work together to create sustainable solutions for dairy farming.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-warm-cream" size={24} />
                  <span className="text-lg">partnerships@octash.co</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-warm-cream" size={24} />
                  <span className="text-lg">+234 (0) 808 109 4648</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-warm-cream" size={24} />
                  <span className="text-lg">Oyo, Nigeria.</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Partnership Opportunities</h4>
              <ul className="space-y-2 text-warm-cream/90">
                <li>• Joint research and development projects</li>
                <li>• Technology transfer and commercialization</li>
                <li>• Field trial collaboration</li>
{/*                 <li>• Grant writing and funding applications</li> */}
                <li>• Academic exchange programs</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Start a Conversation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-2">Organization</label>
                <input 
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-warm-cream"
                  placeholder="Your research institution or company"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Contact Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-warm-cream"
                  placeholder="your.email@institution.org"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="partnershipInterest" className="block text-sm font-medium mb-2">Partnership Interest</label>
                <textarea 
                  rows={4}
                  id="partnershipInterest"
                  name="partnershipInterest"
                  value={formData.partnershipInterest}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-warm-cream resize-none"
                  placeholder="Tell us about your research interests and potential collaboration areas..."
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                variant="partnership" 
                className="w-full mt-6 bg-warm-cream text-forest-green hover:bg-warm-cream/90 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
