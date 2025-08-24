import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchWordPressCountries, WordPressCountry } from "@/data/wordpress"; // import fetch function

const FeaturedCountries = () => {
  const [countries, setCountries] = useState<WordPressCountry[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchWordPressCountries();
      setCountries(data);
    };
    loadCountries();
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Featured Countries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the world's most captivating destinations through our comprehensive 
            country guides and local insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <Link key={country.id} to={`/country/${country.slug}`}>
              <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${country.featured_media_url})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold">
                      Country
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {country.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/countries"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore All Countries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCountries;
