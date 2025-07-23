import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <h1 className="text-4xl font-bold text-forest-green mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Effective Date:</strong> January 23, 2025
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Octash Labs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website octash.co (the "Site") or engage with our precision dairy farming research and development services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-2">Information You Provide</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Organization details when submitting partnership inquiries</li>
                  <li>Comments and feedback through our contact forms</li>
                  <li>Blog comments and engagement data</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>IP address and general location information</li>
                  <li>Browser type, operating system, and device information</li>
                  <li>Pages visited, time spent on pages, and referring websites</li>
                  <li>Cookie data to improve site functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li>Respond to your inquiries and partnership requests</li>
                  <li>Provide information about our research and services</li>
                  <li>Improve our website and user experience</li>
                  <li>Send relevant updates about our research (with your consent)</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">4. Information Sharing</h2>
                <p className="mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>With trusted service providers who assist in operating our website (under confidentiality agreements)</li>
                  <li>In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">6. Cookies and Tracking</h2>
                <p className="mb-4">
                  Our website uses cookies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences, though disabling cookies may affect site functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">7. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Object to certain processing activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">8. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">9. International Data Transfers</h2>
                <p className="mb-4">
                  As an African-based company, your information may be processed in Nigeria. If you are accessing our site from outside Nigeria, please be aware that your information may be transferred to and processed in Nigeria.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">10. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated effective date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-forest-green mb-4">11. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy or how we handle your personal information, please contact us at:
                </p>
                <p className="mb-2">
                  <strong>Octash Labs</strong><br />
                  Email: partnerships@octash.co<br />
                  Phone: +234 (0) 808 109 4648<br />
                  Address: Oyo, Nigeria
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;