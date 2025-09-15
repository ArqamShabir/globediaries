import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Landmark, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseSlot from "@/components/AdSenseSlot";
import { WordPressCity } from "@/data/wordpress";
import { useCitiesStore } from "@/store/citiesStore";
import { WordPressCategory } from "@/data/blogs";

const Cities = () => {
  const { cities, areas, loading } = useCitiesStore();

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // No explicit fetching here; store handles it

  // unique country list for filters
  const countryFilters = ["All", ...Array.from(
    new Set(cities.map((c) => c.acf?.country_slug).filter(Boolean))
  )];

  const [selectedArea, setSelectedArea] = useState<number | 'All'>('All');
  const areaFilters: Array<WordPressCategory> = areas;

  // apply search + filter
  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      selectedCountry === "All" ||
      city.acf?.country_slug?.toLowerCase() === selectedCountry.toLowerCase();

    const matchesArea =
      selectedArea === 'All' || (city.categories || []).includes(selectedArea as number);

    return matchesSearch && matchesCountry && matchesArea;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Explore All Cities
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Search, filter, and discover the world’s most beloved cities.
          </p>
        </section>

        <AdSenseSlot 
          adSlot="1234567890"
          adFormat="horizontal"
          className="my-8"
        />

        {/* Search + Country Filters */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search cities..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Country Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {countryFilters.map((country) => (
                <Badge
                  key={country}
                  variant={selectedCountry === country ? "default" : "outline"}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </Badge>
              ))}
            </div>

            {/* Area Filters (derived from WP categories used by city posts) */}
            {areaFilters.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge
                  key="All"
                  variant={selectedArea === 'All' ? "default" : "outline"}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedArea('All')}
                >
                  All Areas
                </Badge>
                {areaFilters.map((area) => (
                  <Badge
                    key={area.id}
                    variant={selectedArea === area.id ? "default" : "outline"}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedArea(area.id)}
                  >
                    {area.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading cities...</p>
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No cities found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCities.map((city) => (
                  <Link key={city.id} to={`/city/${city.slug}`} className="group">
                    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={city.featured_media_url || '/placeholder.svg'}
                          srcSet={city.featured_media_srcset}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          alt={`${city.name} image`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                          {city.acf?.country || (city.acf?.country_slug ? city.acf.country_slug.replace(/-/g, ' ').replace(/\b\w/g, (s) => s.toUpperCase()) : "Unknown Country")}
                        </Badge>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3">
                          {city.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                          {city.acf?.population && (
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{city.acf.population}</span>
                            </div>
                          )}
                          {city.acf?.language && (
                            <div className="flex items-center space-x-2">
                              <Landmark className="h-4 w-4" />
                              <span>{city.acf.language}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-primary font-medium group-hover:text-primary-dark transition-colors pt-2">
                          Explore →
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cities;
