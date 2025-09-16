import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <SEO 
        title="Privacy Policy | GlobeDiaries"
        description="Read GlobeDiaries' Privacy Policy to learn how we collect, use, and protect your data."
      />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">1. Information We Collect</h2>
              <p>
                At GlobeDiaries, we collect information to provide better services to our users. We collect information in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Information you give us directly (contact forms, newsletter subscriptions)</li>
                <li>Information we get from your use of our services (browsing patterns, preferences)</li>
                <li>Cookies and similar technologies to enhance your experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">2. How We Use Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you travel-related content and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted third parties who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">4. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">7. Third-Party Services</h2>
              <p>
                Our website may contain links to third-party websites and services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms</li>
                <li>Advertising networks (Google AdSense)</li>
                <li>Email marketing services</li>
              </ul>
              <p>
                These third parties have their own privacy policies, and we are not responsible for their practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">8. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">9. Changes to Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p><strong>Email:</strong> support@multishells.com</p>
                <p><strong>Address:</strong> GlobeDiaries, Travel Content Team</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
