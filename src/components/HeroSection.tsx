import { useMemo, useState } from "react";
import { Search, Globe, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-travel.jpg";
import { useContentStats } from "@/hooks/use-content-stats";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { countries, cities, stories, loading: statsLoading, error } = useContentStats();

  const heroStats = useMemo(() => {
    const formatValue = (value: number | null, fallback: string) => {
      if (typeof value === "number" && value > 0) {
        return `${value}+`;
      }
      return statsLoading ? "Loading..." : fallback;
    };

    return [
      {
        label: "Countries Published",
        value: formatValue(countries, "Publishing now"),
      },
      {
        label: "City Guides Live",
        value: formatValue(cities, "More coming soon"),
      },
      {
        label: "Editorial Stories",
        value: formatValue(stories, "Fresh each week"),
      },
    ];
  }, [countries, cities, stories, statsLoading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 py-8">
          {/* Main Heading */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <span className="hero-logo block">
                <img
                  src="/logo.png"
                  alt="GlobeDiaries logo"
                  loading="eager"
                  decoding="async"
                  className="h-20 md:h-24 w-auto drop-shadow-md"
                />
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Globe className="h-8 w-8 text-secondary" />
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
                GlobeDiaries
              </h1>
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Explore the world with context you can trust
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Every guide on GlobeDiaries is hand-edited with practical tips, cultural context, and up-to-date research so you can plan memorable trips with confidence.
            </p>
            {error && (
              <p className="text-sm text-white/70">
                We had trouble loading live stats. Content is still available below.
              </p>
            )}
          </div>

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
                    className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full px-8 bg-gradient-sunset hover:bg-secondary-dark text-secondary-foreground font-semibold"
                >
                  Explore
                </Button>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <Button
              size="lg"
              onClick={() => navigate('/countries')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 font-semibold px-8"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explore Countries
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/blog')}
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold px-8"
            >
              Read Travel Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute hidden bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
