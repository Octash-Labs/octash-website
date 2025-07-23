import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ReactGA from "react-ga4"; // ✅ GA import

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "partnership", label: "Partnership" },
    { id: "vision", label: "Vision" },
    { id: "blog", label: "Stories", href: "/blog" },
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const sections = navItems.map((item) =>
          document.getElementById(item.id)
        );
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        setActiveSection(sectionId);
      }
      setIsOpen(false);
    } else {
      navigate(`/?scrollTo=${sectionId}`);
      setIsOpen(false);
    }
  };

  const isBlogPage = location.pathname.startsWith("/blog");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sage-green/20 shadow-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo → always scroll to Home */}
          <div
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("hero");
              ReactGA.event({
                category: "Navigation",
                action: "Clicked Logo → Home",
              });
            }}
          >
            <img src="/octash-logo.svg" alt="Octash Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                item.href === "/blog"
                  ? isBlogPage
                  : location.pathname === "/" && activeSection === item.id;

              return item.href ? (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-sm font-medium transition-smooth hover:text-forest-green ${
                    isActive
                      ? "text-forest-green border-b-2 border-forest-green pb-1"
                      : "text-gray-600"
                  }`}
                  onClick={() =>
                    ReactGA.event({
                      category: "Navigation",
                      action: `Clicked ${item.label} Tab`,
                    })
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    ReactGA.event({
                      category: "Navigation",
                      action: `Clicked ${item.label} Tab`,
                    });
                  }}
                  className={`text-sm font-medium transition-smooth hover:text-forest-green ${
                    isActive
                      ? "text-forest-green border-b-2 border-forest-green pb-1"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* ✅ Track Get In Touch separately */}
            <Button
              variant="partnership"
              size="sm"
              onClick={() => {
                scrollToSection("contact");
                ReactGA.event({
                  category: "Contact",
                  action: "Clicked Get In Touch",
                });
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-forest-green p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-sage-green/20">
            <div className="py-4 space-y-4">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/blog"
                    ? isBlogPage
                    : location.pathname === "/" && activeSection === item.id;

                return item.href ? (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-smooth ${
                      isActive
                        ? "text-forest-green bg-sage-green/10"
                        : "text-gray-600 hover:text-forest-green hover:bg-sage-green/5"
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      ReactGA.event({
                        category: "Navigation",
                        action: `Clicked ${item.label} Tab (Mobile)`,
                      });
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      ReactGA.event({
                        category: "Navigation",
                        action: `Clicked ${item.label} Tab (Mobile)`,
                      });
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-smooth ${
                      isActive
                        ? "text-forest-green bg-sage-green/10"
                        : "text-gray-600 hover:text-forest-green hover:bg-sage-green/5"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* ✅ Track Mobile Get in Touch */}
              <div className="px-4 pt-2">
                <Button
                  variant="partnership"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    scrollToSection("contact");
                    ReactGA.event({
                      category: "Contact",
                      action: "Clicked Get In Touch (Mobile)",
                    });
                  }}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
