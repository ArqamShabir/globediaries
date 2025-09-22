import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Navigation, Utensils, ArrowLeft, ExternalLink, Users, Languages as LangIcon, Globe, Bus, PartyPopper } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseSlot from '@/components/AdSenseSlot';
import ContentRenderer from '@/components/ContentRenderer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchWordPressCityBySlug, fetchWordPressCountries, WordPressCity, WordPressCountry } from '@/data/wordpress';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import SEO from "@/components/SEO";

const City = () => {
  const { countryId, cityId } = useParams();
  const [city, setCity] = useState<WordPressCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [otherCountries, setOtherCountries] = useState<WordPressCountry[]>([]);

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

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await fetchWordPressCountries();
        setOtherCountries(countries.slice(0, 12));
      } catch {}
    };
    loadCountries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SEO title="Loading city... | GlobeDiaries" />
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
        <SEO title="City not found | GlobeDiaries" noindex />
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
  
  const acf = city.acf || {} as Record<string, unknown>;
  const a: Record<string, unknown> = acf as Record<string, unknown>;
  const attractions: string[] =
    Array.isArray(a.attractions)
      ? (a.attractions as string[])
      : typeof a.attractions === 'string'
      ? (a.attractions as string).split(',').map((x) => x.trim())
      : typeof a.famous_attractions === 'string'
      ? (a.famous_attractions as string).split(',').map((x) => x.trim())
      : [];
  const tips: string[] =
    Array.isArray(a.tips)
      ? (a.tips as string[])
      : typeof a.tips === 'string'
      ? (a.tips as string).split(/\r?\n|,/).map((t) => t.trim()).filter(Boolean)
      : [];

  // Normalized city ACF fields from provided schema
  const cityName = (a.city_name as string) || city.name;
  const countryName = (a.country as string) || (a.country_slug as string) || countryId || '';
  const cityPopulation = (a.city_population as number | string) || (a.population as number | string) || '';
  const cityTimeZone = (a.City_Time_Zone as string) || (a.time_zone as string) || '';
  const language = (a.commonly_spoken_language as string) || (a.language as string) || '';
  const bestTimeCity = (a.best_time_to_visit_city as string) || (a.best_time as string) || '';
  const experiences = typeof a.top_experiences === 'string' ? (a.top_experiences as string).split(',').map((x) => x.trim()).filter(Boolean) : [];
  const localFood = (a.local_food_to_try as string) || '';
  const transport = typeof a.transport_options === 'string' ? (a.transport_options as string).split(',').map((x) => x.trim()).filter(Boolean) : [];
  const culturalVibe = (a.cultural_vibe as string) || '';

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <SEO 
        title={`${city.name} Travel Guide | GlobeDiaries`}
        description={city.description}
        image={city.featured_media_url}
      />
      
      <main>
        

        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img 
            src={city.featured_media_url || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop'}
            alt={`${cityName} hero`}
            className="absolute inset-0 w-full h-full object-cover"
          />
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
                    {cityName}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-6">
                    {culturalVibe || city.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-white/80">
                    {countryName && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span className="capitalize">{countryName}</span>
                      </div>
                    )}
                    {bestTimeCity && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Best: {bestTimeCity}</span>
                      </div>
                    )}
                    {cityPopulation && (
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Pop: {cityPopulation}</span>
                      </div>
                    )}
                    {cityTimeZone && (
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-5 w-5" />
                        <span>TZ: {cityTimeZone}</span>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* City Overview */}
              <section>
                <h2 className="font-display text-4xl font-bold mb-8">
                  Discover {cityName}
                </h2>
                <ContentRenderer 
                  content={city.content}
                  excerpt={city.excerpt}
                  className="mb-8"
                  showFullContent={false}
                  maxHeight="20em"
                  collapseAtChars={600}
                  previewMode="mask"
                  scrollOnToggle
                />
              </section>

              {/* Top Attractions */}
              {attractions.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Camera className="h-8 w-8 mr-3 text-primary" />
                    Must-Visit Attractions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {attractions.map((attraction, index) => (
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
                                A must-see attraction in {cityName}
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
              {tips.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Utensils className="h-8 w-8 mr-3 text-primary" />
                    Essential Travel Tips
                  </h2>
                  <Card className="border-0 bg-gradient-to-br from-card to-muted/20 shadow-elevated">
                    <CardContent className="p-8">
                      <div className="grid gap-6">
                        {tips.map((tip, index) => (
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
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Ad Space */}
              <AdSenseSlot adSlot="1111111111" className="bg-muted/20 rounded-lg p-4" />
              
              {/* City Information */}
              <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated">
                <CardContent className="p-0">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    City Information
                  </h3>
                  <div className="space-y-6">
                    {countryName && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Country</div>
                          <div className="text-muted-foreground capitalize">{countryName}</div>
                        </div>
                      </div>
                    )}
                    {cityPopulation && (
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Population</div>
                          <div className="text-muted-foreground">{cityPopulation}</div>
                        </div>
                      </div>
                    )}
                    {bestTimeCity && (
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Best Time to Visit</div>
                          <div className="text-muted-foreground">{bestTimeCity}</div>
                        </div>
                      </div>
                    )}
                    {typeof acf.coordinates === 'object' && acf.coordinates && 'lat' in (acf.coordinates as any) && 'lng' in (acf.coordinates as any) && (
                      <div className="flex items-start space-x-3">
                        <Navigation className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Coordinates</div>
                           <div className="text-muted-foreground text-xs font-mono">{(acf.coordinates as any).lat}, {(acf.coordinates as any).lng}</div>
                        </div>
                      </div>
                    )}
                    {language && (
                      <div className="flex items-start space-x-3">
                        <LangIcon className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Language</div>
                          <div className="text-muted-foreground">{language}</div>
                        </div>
                      </div>
                    )}
                    {culturalVibe && (
                      <div className="flex items-start space-x-3">
                        <Globe className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Overview</div>
                          <div className="text-muted-foreground">{culturalVibe}</div>
                        </div>
                      </div>
                    )}
                    {localFood && (
                      <div className="flex items-start space-x-3">
                        <Utensils className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Local food to try</div>
                          <div className="text-muted-foreground">{localFood}</div>
                        </div>
                      </div>
                    )}
                    {experiences.length > 0 && (
                      <div className="flex items-start space-x-3">
                        <PartyPopper className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Top experiences</div>
                          <div className="text-muted-foreground">{experiences.join(', ')}</div>
                        </div>
                      </div>
                    )}
                    {transport.length > 0 && (
                      <div className="flex items-start space-x-3">
                        <Bus className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Transport</div>
                          <div className="text-muted-foreground">{transport.join(', ')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              

              {/* Ad Space */}
              <AdSenseSlot adSlot="2222222222" className="bg-muted/20 rounded-lg p-4" />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* City Overview */}
              <section>
                <h2 className="font-display text-4xl font-bold mb-8">
                  Discover {city.name}
                </h2>
                <ContentRenderer 
                  content={city.content}
                  excerpt={city.excerpt}
                  className="mb-8"
                  showFullContent={false}
                  maxHeight="20em"
                  collapseAtChars={600}
                  previewMode="mask"
                  scrollOnToggle
                />
              </section>

              {/* Top Attractions */}
              {attractions.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Camera className="h-8 w-8 mr-3 text-primary" />
                    Must-Visit Attractions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {attractions.map((attraction, index) => (
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
              {tips.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                    <Utensils className="h-8 w-8 mr-3 text-primary" />
                    Essential Travel Tips
                  </h2>
                  <Card className="border-0 bg-gradient-to-br from-card to-muted/20 shadow-elevated">
                    <CardContent className="p-8">
                      <div className="grid gap-6">
                        {tips.map((tip, index) => (
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

              
            </div>
          </div>
        </div></section>

        {/* Explore Countries */}
        {otherCountries.length > 0 && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl md:text-3xl font-bold">Explore Countries</h2>
              </div>
              <div className="relative">
                <Carousel opts={{ align: 'start', containScroll: 'trimSnaps', loop: true }}>
                  <CarouselPrevious aria-label="Previous countries" />
                  <CarouselNext aria-label="Next countries" />
                  <CarouselContent className="flex items-stretch pr-4">
                    {otherCountries.map((c) => (
                      <CarouselItem key={c.id} className="basis-[85%] md:basis-1/3 lg:basis-1/4">
                        <Link to={`/country/${c.slug}`} className="block h-full">
                          <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                            <div className="relative h-40 md:h-44 lg:h-48 overflow-hidden">
                              <img src={c.featured_media_url || '/placeholder.svg'} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </div>
                            <CardContent className="p-4 space-y-2">
                              <h3 className="font-display text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{c.name}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">{c.description}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default City;
