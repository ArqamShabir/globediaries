import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Languages, Banknote, Users, Clock, Calendar } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdSenseSlot from '@/components/AdSenseSlot';
import ContentRenderer from '@/components/ContentRenderer';
import { fetchWordPressCountryBySlug, fetchCitiesByCountrySlug, fetchWordPressCountries } from '@/data/wordpress';
import { fetchWordPressPosts, formatBlogPost } from '@/data/blogs';
import SEO from '@/components/SEO';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { getCountryAcfString, getCountryPopulation, formatPopulation } from '@/lib/countryAcf';

type CountryType = {
  id?: number;
  slug?: string;
  name?: string;
  title?: { rendered?: string };
  featured_media_full_url?: string;
  featured_media_url?: string;
  featured_media_srcset?: string;
  content?: string;
  description?: string;
  acf?: Record<string, unknown>;
};

type CityType = {
  id?: number;
  slug?: string;
  name?: string;
  featured_media_url?: string;
  featured_media_srcset?: string;
  description?: string;
};

type BlogType = {
  id?: number;
  slug?: string;
  title?: string;
  excerpt?: string;
  featured_image_url?: string;
};

const Country: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [country, setCountry] = useState<CountryType | null>(null);
  const [cities, setCities] = useState<CityType[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]);
  const [otherCountries, setOtherCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentMaxHeight, setContentMaxHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadCountryData() {
      if (!slug) return;
      setLoading(true);
      try {
        const [countryRes, citiesRes, postsRes, countriesRes] = await Promise.all([
          fetchWordPressCountryBySlug(slug),
          fetchCitiesByCountrySlug(slug),
          fetchWordPressPosts('', '', 1, 12),
          fetchWordPressCountries(),
        ]);

  // fetchWordPressCountryBySlug returns a single object or null (not an array)
  setCountry((countryRes ?? null) as CountryType | null);
        setCities((citiesRes || []) as CityType[]);

        // remove country/city category posts (ids 4 & 5)
        const formatted = (postsRes || []).filter((p: unknown) => {
          const rp = p as { categories?: number[] };
          const cats = rp.categories || [];
          return !cats.includes(4) && !cats.includes(5);
        }).map(formatBlogPost) as BlogType[];
        setRelatedBlogs(formatted || []);

        // Get other countries (excluding current) and randomize
        const otherCountriesData = ((countriesRes || []) as CountryType[]).filter((ct) => ct.slug !== slug);
        // Shuffle array to get random countries
        const shuffled = otherCountriesData.sort(() => Math.random() - 0.5);
        setOtherCountries(shuffled.slice(0, 8));
      } catch (err) {
        console.error('Failed loading country data', err);
      } finally {
        setLoading(false);
      }
    }

    loadCountryData();
  }, [slug]);

  useEffect(() => {
    function update() {
      const container = document.querySelector('#country-sidebar') as HTMLDivElement | null;
      if (!container) return;
      const h = container.clientHeight;
      if (h && h > 0) setContentMaxHeight(`${h}px`);
    }
    const t = setTimeout(update, 60);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', update);
    };
  }, [country, cities, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SEO title="Loading country... | GlobeDiaries" />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48 mx-auto" />
            <div className="h-4 bg-muted rounded w-64 mx-auto" />
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
        <SEO title="Country not found | GlobeDiaries" noindex />
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

  const acf = country.acf || {};
  const countryTitle = getCountryAcfString(acf, 'country_name') || country.name || '';
  const tagline = getCountryAcfString(acf, 'tagline') || country.description || '';

  const infoRows: Array<{ label: string; icon: ReactNode; value: ReactNode }> = [
    getCountryAcfString(acf, 'continent', 'Continent') ? { label: 'Continent', icon: <Globe className="h-5 w-5 text-primary mt-1" />, value: getCountryAcfString(acf, 'continent', 'Continent') } : null,
    getCountryAcfString(acf, 'capital_city', 'Capital_City') ? { label: 'Capital', icon: <MapPin className="h-5 w-5 text-primary mt-1" />, value: getCountryAcfString(acf, 'capital_city', 'Capital_City') } : null,
    getCountryAcfString(acf, 'official_language', 'Official_Language') ? { label: 'Official Language', icon: <Languages className="h-5 w-5 text-primary mt-1" />, value: getCountryAcfString(acf, 'official_language', 'Official_Language') } : null,
    getCountryAcfString(acf, 'currency', 'Currency') ? { label: 'Currency', icon: <Banknote className="h-5 w-5 text-primary mt-1" /> , value: getCountryAcfString(acf, 'currency', 'Currency') } : null,
    formatPopulation(getCountryPopulation(acf)) ? { label: 'Population', icon: <Users className="h-5 w-5 text-primary mt-1" />, value: formatPopulation(getCountryPopulation(acf)) as string } : null,
    getCountryAcfString(acf, 'time_zone') ? { label: 'Time Zone', icon: <Clock className="h-5 w-5 text-primary mt-1" />, value: getCountryAcfString(acf, 'time_zone') } : null,
    getCountryAcfString(acf, 'best_time_to_visit', 'Best_Time_to_Visit') ? { label: 'Best Time to Visit', icon: <Calendar className="h-5 w-5 text-primary mt-1" />, value: getCountryAcfString(acf, 'best_time_to_visit', 'Best_Time_to_Visit') } : null,
  ].filter(Boolean) as { label: string; icon: ReactNode; value: ReactNode }[];

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <SEO title={`${countryTitle} Travel Guide | GlobeDiaries`} description={tagline} image={country.featured_media_full_url || country.featured_media_url} />
      <main>
        <section className="relative md:h-[70vh] overflow-hidden">
          <img src={country.featured_media_full_url || country.featured_media_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&h=1200&fit=crop'} alt={`${countryTitle} hero`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl text-white">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">{countryTitle}</h1>
              <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">{tagline}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
              <div className="lg:col-span-2 flex flex-col space-y-8">
                <div className="flex-1">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Discover {countryTitle}</h2>
                  <div className="flex-1 overflow-hidden">
                    <ContentRenderer content={country.content || ''} showFullContent={false} maxHeight={'20em'} collapseAtChars={600} previewMode="mask" scrollOnToggle />
                  </div>
                </div>

                <AdSenseSlot adSlot="1234567890" adFormat="horizontal" className="my-6" />
              </div>

              <aside id="country-sidebar" className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-elevated h-full">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center"><Globe className="mr-2 h-5 w-5 text-primary" />Country Information</h3>
                  <div className="space-y-4">
                    {infoRows.map((row) => (
                      <div key={row.label} className="flex items-start space-x-3">
                        {row.icon}
                        <div>
                          <div className="font-semibold text-foreground">{row.label}</div>
                          <div className="text-muted-foreground whitespace-pre-line">{row.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <AdSenseSlot adSlot="2345678901" adFormat="vertical" className="min-h-[300px]" />
              </aside>
            </div>
          </div>
        </section>

        {cities && cities.length > 0 && (
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold">Explore Cities in {countryTitle}</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto mt-2">Discover each city's attractions and highlights.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city: CityType) => (
                  <Link key={city.id} to={`/country/${country?.slug}/city/${city.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0">
                      <div className="relative h-44 overflow-hidden">
                        <img src={city.featured_media_url || '/placeholder.svg'} alt={city.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{city.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{(city as any)?.acf?.cultural_vibe || city.description}</p>
                        <div className="text-primary font-medium group-hover:text-primary-dark transition-colors">Read more →</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {otherCountries && otherCountries.length > 0 && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl md:text-3xl font-bold">Other countries to explore</h2>
              </div>
              <div className="relative">
                <Carousel opts={{ align: 'start', containScroll: 'trimSnaps', loop: true }}>
                  {/* Arrows removed as requested */}
                  <CarouselContent className="flex items-stretch pr-4">
                    {otherCountries.slice(0, 8).map((oc: CountryType) => {
                      const ocAcf = oc.acf || {};
                      const ocName = getCountryAcfString(ocAcf, 'country_name') || oc.title?.rendered || oc.name || '';
                      const ocTagline = getCountryAcfString(ocAcf, 'tagline') || oc.description || '';
                      return (
                        <CarouselItem key={oc.id} className="basis-[85%] md:basis-1/3 lg:basis-1/4">
                          <Link to={`/country/${oc.slug}`} className="block h-full">
                            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                              <div className="relative h-40 md:h-44 lg:h-48 overflow-hidden">
                                <img src={oc.featured_media_url || '/placeholder.svg'} alt={ocName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              </div>
                              <CardContent className="p-4 space-y-2">
                                <h3 className="font-display text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{ocName}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2">{ocTagline}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </section>
        )}

        {/* Related posts removed as requested */}
      </main>
      <Footer />
    </div>
  );
};

export default Country;


