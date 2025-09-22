import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseSlot from "@/components/AdSenseSlot";
import { fetchWordPressCountries, WordPressCountry } from "@/data/wordpress";
import GridSkeleton from "@/components/GridSkeleton";
import SEO from "@/components/SEO";
import { getCountryAcfString } from "@/lib/countryAcf";

// Example categories (you can extend from WP taxonomy)
const countryCategories = [
  { name: "All", slug: "" },
  { name: "Asia", slug: "asia" },
  { name: "Europe", slug: "europe" },
  { name: "Africa", slug: "africa" },
  { name: "Americas", slug: "americas" },
];

const Countries = () => {
  const [countries, setCountries] = useState<WordPressCountry[]>([]);
  const [filtered, setFiltered] = useState<WordPressCountry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const data = await fetchWordPressCountries();
        setCountries(data);
        setFiltered(data.slice(0, 12));
        setHasMore(data.length > 12);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Handle search + filter
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let results = countries;

      if (selectedCategory !== "All") {
        results = results.filter((c) => {
          const continent = getCountryAcfString(c.acf, "continent", "Continent");
          if (!continent) return false;
          
          const continentLower = continent.toLowerCase().trim();
          const categoryLower = selectedCategory.toLowerCase().trim();
          
          // Check for exact match or partial match
          return continentLower === categoryLower || 
                 continentLower.includes(categoryLower) ||
                 categoryLower.includes(continentLower);
        });
      }

      if (searchTerm) {
        results = results.filter(
          (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (getCountryAcfString(c.acf, "capital_city", "Capital_City")?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
      }

      setFiltered(results.slice(0, 12));
      setPage(1);
      setHasMore(results.length > 12);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, countries]);

  const loadMore = () => {
    const results = countries.filter((c) => {
      // Continent filtering
      const continentMatch = selectedCategory === "All" || (() => {
        const continent = getCountryAcfString(c.acf, "continent", "Continent");
        if (!continent) return false;
        
        const continentLower = continent.toLowerCase().trim();
        const categoryLower = selectedCategory.toLowerCase().trim();
        
        return continentLower === categoryLower || 
               continentLower.includes(categoryLower) ||
               categoryLower.includes(continentLower);
      })();
      
      // Search filtering
      const searchMatch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (getCountryAcfString(c.acf, "capital_city", "Capital_City")?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      return continentMatch && searchMatch;
    });

    const nextPage = page + 1;
    setFiltered(results.slice(0, nextPage * 12));
    setPage(nextPage);
    setHasMore(results.length > nextPage * 12);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <SEO 
          title="Explore Countries | GlobeDiaries"
          description="Browse countries around the world with key facts, highlights and travel tips from GlobeDiaries."
        />
        {/* Hero */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Explore Countries
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover cultures, languages, and iconic landmarks around the
              world.
            </p>
          </div>
        </section>

        <AdSenseSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

        {/* Search + Filters */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {countryCategories.map((cat) => (
                <Badge
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <GridSkeleton count={9} />
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No countries found. Try another search.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((country) => {
                    const acf = country.acf;
                    const displayName = getCountryAcfString(acf, "country_name") || country.name;
                    const tagline = getCountryAcfString(acf, "tagline") || country.description;

                    return (
                      <Link
                        key={country.id}
                        to={`/country/${country.slug}`}
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={country.featured_media_url || '/placeholder.svg'}
                              srcSet={country.featured_media_srcset}
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              alt={`${displayName} image`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                              Country
                            </Badge>
                          </div>

                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {displayName}
                            </h3>
                            <p className="text-muted-foreground line-clamp-3">
                              {tagline}
                            </p>
                            <div className="text-primary font-medium group-hover:text-primary-dark transition-colors pt-4">
                              {"Read more ->"}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      Load More Countries
                    </Button>
                  </div>
                )}
              </>
            )}

            <AdSenseSlot
              adSlot="2345678901"
              adFormat="square"
              className="mt-12 flex justify-center"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Countries;




