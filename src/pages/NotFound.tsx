import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Page Not Found - Octash Labs"
        description="The page you're looking for doesn't exist. Return to Octash Labs homepage for precision dairy farming research and solutions."
      />
      <Navigation />
      
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-forest-green mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-forest-green mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to exploring our research and solutions.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              <Link to="/blog" className="hover:text-forest-green transition-colors">
                Browse our blog
              </Link>
              {" or "}
              <Link to="/#contact" className="hover:text-forest-green transition-colors">
                get in touch
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
