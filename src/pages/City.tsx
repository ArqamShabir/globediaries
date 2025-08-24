import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Navigation, Utensils, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseSlot from '@/components/AdSenseSlot';
import ContentRenderer from '@/components/ContentRenderer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchWordPressCityBySlug, WordPressCity } from '@/data/wordpress';

const City = () => {
  const { countryId, cityId } = useParams();
  const [city, setCity] = useState<WordPressCity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCityData = async () => {
      if (!cityId) return;
      
      setLoading(true);
      try {
        const cityData = await fetchWordPressCityBySlug(cityId);
        setCity(cityData);
      } catch (error) {
        console.error('Error loading city data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCityData();
  }, [cityId]);

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

  if (!city) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">City Not Found</h1>
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              {countryId && (
                <>
                  <Link to={`/country/${countryId}`} className="text-muted-foreground hover:text-primary transition-colors capitalize">
                    {countryId}
                  </Link>
                  <span className="text-muted-foreground">/</span>
                </>
              )}
              <span className="text-foreground font-medium">{city.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative">
          <div 
            className="h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${city.featured_media_url || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <div className="max-w-4xl">
                  {countryId && (
                    <Link 
                      to={`/country/${countryId}`} 
                      className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                      Back to {countryId}
                    </Link>
                  )}
                  
                  <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {city.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-6">
                    {city.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-white/80">
                    {city.acf?.country_slug && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span className="capitalize">{city.acf.country_slug}</span>
                      </div>
                    )}
                    {city.acf?.best_time && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Best: {city.acf.best_time}</span>
                      </div>
                    )}
                    {city.acf?.population && (
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-5 w-5" />
                        <span>Pop: {city.acf.population}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Ad Space */}
              <AdSenseSlot adSlot="1111111111" className="bg-muted/20 rounded-lg p-4" />
              
              {/* Quick Info */}
              <Card className="bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold mb-6 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Quick Info
                  </h3>
                  <div className="space-y-4 text-sm">
                    {city.acf?.country_slug && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Country:</span>
                        <span className="font-semibold capitalize">{city.acf.country_slug}</span>
                      </div>
                    )}
                    {city.acf?.population && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Population:</span>
                        <span className="font-semibold">{city.acf.population}</span>
                      </div>
                    )}
                    {city.acf?.best_time && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Best Time:</span>
                        <span className="font-semibold">{city.acf.best_time}</span>
                      </div>
                    )}
                    {city.acf?.coordinates && (
                      <div className="pt-4 border-t border-border">
                        <div className="text-muted-foreground mb-2">Coordinates:</div>
                        <div className="text-xs font-mono bg-muted rounded px-2 py-1">
                          {city.acf.coordinates.lat}, {city.acf.coordinates.lng}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Travel Guide */}
              <Card className="bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold mb-6 flex items-center">
                    <Navigation className="h-5 w-5 mr-2 text-primary" />
                    Travel Guide
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="font-semibold text-foreground mb-2">Getting There</div>
                      <p className="text-muted-foreground">
                        Multiple transportation options available including airports, trains, and buses.
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="font-semibold text-foreground mb-2">Local Transport</div>
                      <p className="text-muted-foreground">
                        Public transport, taxis, and walking are great ways to explore the city.
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="font-semibold text-foreground mb-2">Best Areas</div>
                      <p className="text-muted-foreground">
                        City center and historic districts offer the best attractions and amenities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdSenseSlot adSlot="2222222222" className="bg-muted/20 rounded-lg p-4" />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12">
              {/* City Overview */}
              <section>
                <h2 className="font-display text-4xl font-bold mb-8">
                  Discover {city.name}
                </h2>
                <ContentRenderer 
                  content={city.content}
                  excerpt={city.excerpt}
                  className="mb-8"
                />
              </section>

              {/* Top Attractions */}
              {city.acf?.attractions && city.acf.attractions.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Camera className="h-8 w-8 mr-3 text-primary" />
                    Must-Visit Attractions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {city.acf.attractions.map((attraction, index) => (
                      <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-muted/20">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Star className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                                {attraction}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                A must-see attraction in {city.name}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Ad Space */}
              <div className="my-8">
                <AdSenseSlot 
                  adSlot="3333333333" 
                  adFormat="fluid"
                  className="bg-muted/20 rounded-lg p-6"
                  style={{ minHeight: '200px' }}
                />
              </div>

              {/* Travel Tips */}
              {city.acf?.tips && city.acf.tips.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Utensils className="h-8 w-8 mr-3 text-primary" />
                    Essential Travel Tips
                  </h2>
                  <Card className="border-0 bg-gradient-to-br from-card to-muted/20 shadow-elevated">
                    <CardContent className="p-8">
                      <div className="grid gap-6">
                        {city.acf.tips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-background/50">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-foreground leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Call to Action */}
              <section className="text-center py-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
                <div className="max-w-3xl mx-auto">
                  <h2 className="font-display text-4xl font-bold mb-6">Plan Your Trip to {city.name}</h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Ready to explore {city.name}? Start planning your adventure today and discover everything this amazing destination has to offer!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="px-8 py-3">
                      Find Hotels
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 py-3">
                      Book Tours
                    </Button>
                    <Button size="lg" variant="secondary" className="px-8 py-3">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Get Travel Guide
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default City;