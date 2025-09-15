import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Globe, Calendar, Camera, Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdSenseSlot from "@/components/AdSenseSlot";
import ContentRenderer from "@/components/ContentRenderer";
import { fetchWordPressCountryBySlug, fetchCitiesByCountrySlug, fetchWordPressCountries, WordPressCountry, WordPressCity } from "@/data/wordpress";
import { fetchWordPressPosts, formatBlogPost } from "@/data/blogs";

const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState<WordPressCountry | null>(null);
  const [cities, setCities] = useState<WordPressCity[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [otherCountries, setOtherCountries] = useState<WordPressCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountryData = async () => {
      if (!countryId) return;
      
      setLoading(true);
      try {
        const [countryData, citiesData, blogsData, countriesData] = await Promise.all([
  fetchWordPressCountryBySlug(countryId),
  fetchCitiesByCountrySlug(countryId),
  fetchWordPressPosts(),
  fetchWordPressCountries()
]);

setCountry(countryData);
const filteredCities = (citiesData || []).filter((city) => {
  const slugMatch = city.acf?.country_slug?.toLowerCase() === (countryId || '').toLowerCase();
  const nameMatch = countryData?.name && city.acf?.country && city.acf.country.toLowerCase() === countryData.name.toLowerCase();
  return slugMatch || !!nameMatch;
});
setCities(filteredCities);

// Normalize blog posts here
const formattedBlogs = blogsData.map(formatBlogPost);

// Filter blogs related to this country
const filtered = formattedBlogs.filter(blog =>
  blog.title.toLowerCase().includes(countryData?.name.toLowerCase() || '') ||
  blog.content.toLowerCase().includes(countryData?.name.toLowerCase() || '')
).slice(0, 6);

setRelatedBlogs(filtered);

// Select 4-5 random other countries for the sidebar
const shuffled = (countriesData || [])
  .filter((c) => c.slug.toLowerCase() !== (countryId || '').toLowerCase())
  .sort(() => Math.random() - 0.5);
setOtherCountries(shuffled.slice(0, 5));

        
      } catch (error) {
        console.error('Error loading country data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCountryData();
  }, [countryId]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Country Not Found</h1>
          <p className="text-muted-foreground mb-8">The country you're looking for doesn't exist in our database.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const attractions: string[] =
  Array.isArray(country.acf?.attractions)
    ? country.acf!.attractions
    : typeof country.acf?.attractions === "string"
    ? country.acf!.attractions.split(",").map((a) => a.trim())
    : [];


  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img
            src={country.featured_media_full_url || country.featured_media_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&h=1200&fit=crop'}
            srcSet={country.featured_media_srcset}
            sizes="100vw"
            alt={`${country.name} hero image`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-5xl">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <div className="space-y-6">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  {country.name}
                </h1>
                <div className="max-w-4xl">
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                      {country.acf.tagline}
                  </p>
                  <div className="flex flex-wrap gap-4 text-white/70">
                    {country.acf?.capital && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Capital: {country.acf.capital}</span>
                      </div>
                    )}
                    {country.acf?.best_time && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Best time: {country.acf.best_time}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Country Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="font-display text-4xl font-bold text-foreground mb-8">
                    Discover {country.name}
                  </h2>
                  <ContentRenderer 
                    content={country.content}
                    className="mb-8"
                    showFullContent={false}
                    maxHeight="14em"
                    collapseAtChars={1}
                    previewMode="mask"
                  />
                </div>

                {/* Top Attractions */}
                {country.acf?.attractions && country.acf.attractions.length > 0 && (
                  <div>
                    <h3 className="font-display text-3xl font-bold text-foreground mb-8 flex items-center">
                      <Star className="mr-3 h-8 w-8 text-primary" />
                      Must-Visit Attractions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {attractions.map((attraction, index) => (
                        <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-muted/20">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Star className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {attraction}
                                </h4>
                                <p className="text-muted-foreground text-sm mt-1">
                                  A must-see destination in {country.name}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* AdSense Slot */}
                <AdSenseSlot 
                  adSlot="1234567890"
                  adFormat="horizontal"
                  className="my-12"
                />
              </div>

              {/* Country Info Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center">
                    <Globe className="mr-2 h-6 w-6 text-primary" />
                    Country Information
                  </h3>
                  <div className="space-y-6">
                    {country.acf?.capital && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Capital</div>
                          <div className="text-muted-foreground">{country.acf.capital}</div>
                        </div>
                      </div>
                    )}
                    {country.acf?.population && (
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Population</div>
                          <div className="text-muted-foreground">{country.acf.population} million</div>
                        </div>
                      </div>
                    )}
                    {country.acf?.language && (
                      <div className="flex items-start space-x-3">
                        <Globe className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Language</div>
                          <div className="text-muted-foreground">{country.acf.language}</div>
                        </div>
                      </div>
                    )}
                    {country.acf?.currency && (
                      <div className="flex items-start space-x-3">
                        <ExternalLink className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Currency</div>
                          <div className="text-muted-foreground">{country.acf.currency}</div>
                        </div>
                      </div>
                    )}
                    {country.acf?.best_time && (
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Best Time to Visit</div>
                          <div className="text-muted-foreground">{country.acf.best_time}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {otherCountries.length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">Explore Other Countries</h3>
                    <ul className="space-y-2">
                      {otherCountries.slice(0, 5).map((c) => (
                        <li key={c.id} className="flex items-center justify-between">
                          <Link to={`/country/${c.slug}`} className="text-primary hover:underline">
                            {c.name}
                          </Link>
                          
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* AdSense Sidebar Slot */}
                <AdSenseSlot 
                  adSlot="2345678901"
                  adFormat="vertical"
                  className="min-h-[600px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cities */}
        {cities.length > 0 && (
          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Explore Cities in {country.name}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover the unique charm and attractions of each destination
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cities.map((city) => (
                  <Link key={city.id} to={`/country/${countryId}/city/${city.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={city.featured_media_url || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop'}
                          srcSet={city.featured_media_srcset}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          alt={`${city.name} image`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-display text-xl font-bold mb-1">{city.name}</h3>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {city.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="text-primary font-medium group-hover:text-primary-dark transition-colors">
                            Explore City →
                          </div>
                          {city.acf?.best_time && (
                            <div className="text-sm text-muted-foreground">
                              Best: {city.acf.best_time}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <AdSenseSlot 
                adSlot="1234567890"
                adFormat="horizontal"
                className="mt-16"
              />
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-20 bg-background hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Travel Stories from {country.name}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Real experiences and insights from fellow travelers
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.slice(0, 6).map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`}>
                    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.featured_image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'}
                          srcSet={blog.image_srcset}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          alt={`${blog.title} image`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-primary font-medium group-hover:text-primary-dark transition-colors">
                            Read More →
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link to="/blog">
                  <Button size="lg" variant="outline" className="px-8">
                    View All Travel Stories
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Country;
