import { Link } from "react-router-dom";
import ReactGA from "react-ga4"; // ✅ GA import

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-green text-warm-cream py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Octash Labs. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors duration-200"
              onClick={() => {
                ReactGA.event({
                  category: "Footer",
                  action: "Clicked Privacy Policy",
                });
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
