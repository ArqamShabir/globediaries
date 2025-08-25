import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, Globe, MapPin, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseSlot from "@/components/AdSenseSlot";

import { fetchWordPressCountries, fetchWordPressCities } from "@/data/wordpress";
import { fetchWordPressPosts, formatBlogPost } from "@/data/blogs";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'country' | 'city' | 'blog';
  image?: string;
  category?: string;
  date?: string;
  url: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<"all" | "countries" | "cities" | "blogs">("all");
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "alphabetical">("relevance");

  const [wpCountries, setWpCountries] = useState<any[]>([]);
  const [wpCities, setWpCities] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load WP countries + cities
  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, citiesData] = await Promise.all([
          fetchWordPressCountries(),
          fetchWordPressCities(),
        ]);
        setWpCountries(countriesData);
        setWpCities(citiesData);
      } catch (error) {
        console.error("Error loading countries/cities:", error);
      }
    };
    loadData();
  }, []);

  // Load WP blog posts
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchWordPressPosts("", "", 1, 50);
        const formattedPosts = posts.map(formatBlogPost);
        setBlogPosts(formattedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      }
    };
    loadBlogPosts();
  }, []);

  // Run search whenever query changes or new WP data arrives
  useEffect(() => {
    performSearch(initialQuery);
  }, [initialQuery, wpCountries, wpCities, blogPosts]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search WordPress Countries
    wpCountries.forEach((country) => {
      if (
        country.name.toLowerCase().includes(lowerQuery) ||
        country.description.toLowerCase().includes(lowerQuery) ||
        country.acf?.capital?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: country.id.toString(),
          title: country.name,
          description: country.description,
          type: "country",
          image: country.featured_media_url,
          url: `/country/${country.slug}`,
        });
      }
    });

    // Search WordPress Cities
    wpCities.forEach((city) => {
      if (
        city.name.toLowerCase().includes(lowerQuery) ||
        city.description.toLowerCase().includes(lowerQuery) ||
        city.acf?.country_slug?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: city.id.toString(),
          title: city.name,
          description: city.description,
          type: "city",
          image: city.featured_media_url,
          url: `/country/${city.acf?.country_slug || "unknown"}/city/${city.slug}`,
        });
      }
    });

    // Search WordPress Blogs
    blogPosts.forEach((blog) => {
      if (
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.excerpt.toLowerCase().includes(lowerQuery) ||
        blog.category.toLowerCase().includes(lowerQuery) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
      ) {
        searchResults.push({
          id: blog.id.toString(),
          title: blog.title,
          description: blog.excerpt,
          type: "blog",
          image: blog.image,
          category: blog.category,
          date: blog.date,
          url: `/blog/${blog.id}`,
        });
      }
    });

    setResults(searchResults);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const filteredResults = results.filter((result) => {
    if (filter === "all") return true;
    if (filter === "countries") return result.type === "country";
    if (filter === "cities") return result.type === "city";
    if (filter === "blogs") return result.type === "blog";
    return true;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "date" && a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0; // relevance (keep order)
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "country":
        return <Globe className="h-4 w-4" />;
      case "city":
        return <MapPin className="h-4 w-4" />;
      case "blog":
        return <BookOpen className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "country":
        return "default";
      case "city":
        return "secondary";
      case "blog":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Search Results
            </h1>
            {initialQuery && (
              <p className="text-xl text-white/90 mb-8">
                Showing results for "{initialQuery}"
              </p>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-elevated p-2">
                  <div className="flex-1 flex items-center space-x-3 px-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search countries, cities, or destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 bg-transparent text-black text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full px-8 bg-gradient-sunset hover:bg-secondary-dark text-secondary-foreground font-semibold"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <AdSenseSlot
          adSlot="1234567890"
          adFormat="horizontal"
          className="my-8"
        />

        {/* Filters and Results */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    size="sm"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    All Results ({filteredResults.length})
                  </Button>
                  <Button
                    variant={filter === "countries" ? "default" : "outline"}
                    onClick={() => setFilter("countries")}
                    size="sm"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Countries ({results.filter((r) => r.type === "country").length})
                  </Button>
                  <Button
                    variant={filter === "cities" ? "default" : "outline"}
                    onClick={() => setFilter("cities")}
                    size="sm"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Cities ({results.filter((r) => r.type === "city").length})
                  </Button>
                  <Button
                    variant={filter === "blogs" ? "default" : "outline"}
                    onClick={() => setFilter("blogs")}
                    size="sm"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Blogs ({results.filter((r) => r.type === "blog").length})
                  </Button>
                </div>

                <Select
                  value={sortBy}
                  onValueChange={(value: any) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              ) : sortedResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedResults.map((result) => (
                    <Link key={`${result.type}-${result.id}`} to={result.url}>
                      <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                        {result.image && (
                          <div
                            className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${result.image})` }}
                          >
                            <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                              <Badge
                                variant={getTypeBadgeVariant(result.type)}
                                className="bg-white/90 text-foreground"
                              >
                                {getTypeIcon(result.type)}
                                <span className="ml-1 capitalize">{result.type}</span>
                              </Badge>
                            </div>
                          </div>
                        )}

                        <CardContent className="p-6 space-y-3">
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3">
                            {result.description}
                          </p>

                          <div className="flex items-center justify-between pt-2">
                            {result.category && (
                              <Badge variant="secondary" className="text-xs">
                                {result.category}
                              </Badge>
                            )}
                            {result.date && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(result.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          <div className="text-primary font-medium group-hover:text-primary-dark transition-colors pt-2">
                            View {result.type} →
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find anything matching your search. Try different keywords or browse our featured destinations.
                  </p>
                  <div className="mt-8 space-x-4">
                    <Link to="/">
                      <Button>Back to Home</Button>
                    </Link>
                    <Link to="/blog">
                      <Button variant="outline">Browse Blog</Button>
                    </Link>
                  </div>
                </div>
              )}

              {sortedResults.length > 0 && (
                <AdSenseSlot
                  adSlot="0987654321"
                  adFormat="horizontal"
                  className="mt-12"
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
