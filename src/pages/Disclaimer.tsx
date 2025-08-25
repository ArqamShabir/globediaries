import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Disclaimer
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                1. General Information
              </h2>
              <p>
                The information provided by <strong>GlobeDiaries</strong> is for
                general informational purposes only. All content on this website
                is provided in good faith, however we make no representation or
                warranty of any kind regarding the accuracy, adequacy, validity,
                reliability, or completeness of any information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                2. External Links Disclaimer
              </h2>
              <p>
                Our website may contain (or you may be sent through the site)
                links to other websites or content belonging to or originating
                from third parties. We do not investigate, monitor, or check for
                accuracy of such external links.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                3. Professional Disclaimer
              </h2>
              <p>
                The travel information is provided for general informational and
                educational purposes only and is not a substitute for
                professional advice. Always seek the guidance of qualified
                professionals before making travel or financial decisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                4. Contact Us
              </h2>
              <p>
                If you have any questions about this Disclaimer, you can contact
                us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p>
                  <strong>Email:</strong> support@globediaries.com
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

export default Disclaimer;
