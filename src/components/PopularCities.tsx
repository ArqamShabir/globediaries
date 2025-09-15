import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWordPressCities, WordPressCity } from "@/data/wordpress";

const PopularCities = () => {
  const [cities, setCities] = useState<WordPressCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      const data = await fetchWordPressCities();
      setCities(data);
      setLoading(false);
    };
    loadCities();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Popular Cities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Loading cities…€¦</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={`city-skeleton-${i}`} className="overflow-hidden border-0">
                <div className="relative h-52">
                  <Skeleton className="absolute inset-0" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cities.length === 0) {
    return (
      <section className="py-16 bg-background text-center">
        <p className="text-muted-foreground">No cities found.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Popular Cities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From bustling metropolises to charming historic towns, explore the world's most beloved urban destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link
              key={city.id}
              to={city.acf?.country_slug ? `/country/${city.acf.country_slug}/city/${city.slug}` : `/city/${city.slug}`}
            >
              <Card className="group overflow-hidden hover:shadow-travel transition-all duration-300 hover:-translate-y-1 bg-card border-0">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={city.featured_media_url || '/placeholder.svg'}
                    srcSet={city.featured_media_srcset}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={`${city.name} image`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* City name overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display text-2xl font-bold">{city.name}</h3>
                    <p className="text-white/90 text-sm">{city.acf?.country || (city.acf?.country_slug ? city.acf.country_slug.replace(/-/g, ' ').replace(/\b\w/g, (s) => s.toUpperCase()) : "Unknown Country")}</p>
                  </div>

                  {/* Rating badge (if you want to support ratings via ACF) */}
                  {city.acf?.population && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-secondary fill-current" />
                      <span className="text-white font-semibold text-sm">
                        {city.acf.population}
                      </span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {city.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1 text-sm text-primary font-medium">
                      <Camera className="h-4 w-4" />
                      <span>{city.acf?.attractions?.length || 0} attractions</span>
                    </div>
                    <div className="text-sm text-accent font-medium group-hover:text-accent-foreground transition-colors">
                      Explore â†’
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/cities"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-sunset text-secondary-foreground rounded-full hover:bg-secondary-dark transition-all duration-300 shadow-card"
          >
            Discover All Cities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCities;




