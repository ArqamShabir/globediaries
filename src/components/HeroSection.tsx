import { useState } from "react";
import { Search, Globe, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-travel.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Globe className="h-8 w-8 text-secondary" />
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
                GlobeDiaries
              </h1>
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Explore the World with Us
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Discover amazing destinations, hidden gems, and cultural treasures 
              from every corner of our beautiful planet. Your next adventure starts here.
            </p>
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
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">195+</div>
              <div className="text-white/80">Countries Covered</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">1000+</div>
              <div className="text-white/80">Cities Explored</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-white/80">Travel Guides</div>
            </div>
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
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;