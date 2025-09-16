import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <SEO 
        title="Terms of Service | GlobeDiaries"
        description="Review GlobeDiaries' Terms of Service for usage rules and legal information."
      />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using <strong>GlobeDiaries</strong>, you agree
                to comply with these Terms of Service. If you do not agree, you
                may not use our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                2. Use of Our Service
              </h2>
              <p>
                You agree to use our website only for lawful purposes and in a
                way that does not infringe the rights of, restrict, or inhibit
                anyone else’s use and enjoyment of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                3. Intellectual Property Rights
              </h2>
              <p>
                All content, trademarks, and logos displayed on this website are
                the property of GlobeDiaries unless otherwise stated. You may
                not use, reproduce, or distribute our content without prior
                written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                4. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, GlobeDiaries shall not
                be held liable for any damages arising from your use of our
                services or reliance on information provided on this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                5. Changes to Terms
              </h2>
              <p>
                We may update these Terms of Service from time to time. Changes
                will be effective immediately upon posting on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms of Service, you can
                contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p>
                  <strong>Email:</strong> support@multishells.com
                </p>
                <p>
                  <strong>Address:</strong> GlobeDiaries, Travel Content Team
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
