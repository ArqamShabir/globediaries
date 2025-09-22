import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchWordPressCountries, WordPressCountry } from "@/data/wordpress"; // import fetch function
import { Skeleton } from "@/components/ui/skeleton";
import { getCountryAcfString } from "@/lib/countryAcf";

const FeaturedCountries = () => {
  const [countries, setCountries] = useState<WordPressCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchWordPressCountries();
        setCountries(data);
      } finally {
        setLoading(false);
      }
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
          {loading && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="w-full">
                <Card className="overflow-hidden border-0">
                  <div className="relative h-48">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              </div>
            ))
          )}
          {!loading && countries.slice(0, 6).map((country) => {
            const acf = country.acf;
            const displayName = getCountryAcfString(acf, "country_name") || country.name;
            const tagline = getCountryAcfString(acf, "tagline") || country.description;

            return (
              <Link key={country.id} to={`/country/${country.slug}`}>
                <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={country.featured_media_url || '/placeholder.svg'}
                      srcSet={country.featured_media_srcset}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      alt={`${displayName} image`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold">
                      Country
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {displayName}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {tagline}
                      </p>
                    </div>
                    <div className="text-primary font-medium pt-2">
                      {"Read more ->"}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
