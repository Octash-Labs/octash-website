import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

const SEOHead = ({
  title = "Octash Labs - Precision Dairy Farming Research & Development",
  description = "Advancing sustainable pasture management and livestock productivity in Africa through data-driven innovation. Research-backed solutions for dairy farmers.",
  keywords = "precision dairy farming, pasture management, livestock productivity, agriculture research, sustainable farming, Nigeria dairy, Africa agriculture, Brachiaria grass, dairy technology",
  image = "https://octash.co/octash-labs-header.webp",
  url,
  type = "website",
  author = "Octash Labs",
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = url || `https://octash.co${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "en");

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:image:alt", title, true);
    updateMetaTag("og:site_name", "Octash Labs", true);
    updateMetaTag("og:locale", "en_US", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:site", "@OctashLabs");
    updateMetaTag("twitter:creator", "@OctashLabs");

    // Article-specific tags
    if (type === "article" && publishedTime) {
      updateMetaTag("article:published_time", publishedTime, true);
      updateMetaTag("article:author", author, true);
      if (modifiedTime) {
        updateMetaTag("article:modified_time", modifiedTime, true);
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // Structured Data (JSON-LD)
    const removeExistingStructuredData = () => {
      const existing = document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        existing.remove();
      }
    };

    removeExistingStructuredData();

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Default organization structured data for non-article pages
    if (!structuredData && type === "website") {
      const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Octash Labs",
        "url": "https://octash.co",
        "logo": "https://octash.co/octash-logo.svg",
        "description": "Advancing sustainable pasture management and livestock productivity in Africa through data-driven innovation.",
        "foundingDate": "2023",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "partnerships@octash.co",
          "contactType": "business"
        },
        "sameAs": [
          "https://twitter.com/OctashLabs",
          "https://linkedin.com/company/octash-labs"
        ]
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(organizationData);
      document.head.appendChild(script);
    }

  }, [title, description, keywords, image, currentUrl, type, author, publishedTime, modifiedTime, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;