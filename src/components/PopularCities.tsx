import { Link } from "react-router-dom";
import { Star, MapPin, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PopularCities = () => {
  const cities = [
    {
      id: "paris",
      name: "Paris",
      country: "France",
      description: "The City of Light beckons with romantic boulevards and iconic landmarks",
      rating: 4.8,
      attractions: 127,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop"
    },
    {
      id: "rome",
      name: "Rome",
      country: "Italy", 
      description: "Ancient history comes alive in the Eternal City",
      rating: 4.7,
      attractions: 98,
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop"
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      description: "Ultra-modern metropolis with deep traditional roots",
      rating: 4.9,
      attractions: 156,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
    },
    {
      id: "istanbul",
      name: "Istanbul",
      country: "Turkey",
      description: "Where two continents meet in a city of stunning contrasts",
      rating: 4.6,
      attractions: 87,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop"
    },
    {
      id: "lahore",
      name: "Lahore", 
      country: "Pakistan",
      description: "Cultural heart of Pakistan with magnificent Mughal architecture",
      rating: 4.5,
      attractions: 43,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    },
    {
      id: "new-york",
      name: "New York",
      country: "United States",
      description: "The city that never sleeps, where dreams come true",
      rating: 4.7,
      attractions: 203,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Popular Cities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From bustling metropolises to charming historic towns, explore the world's 
            most beloved urban destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <Card className="group overflow-hidden hover:shadow-travel transition-all duration-300 hover:-translate-y-1 bg-card border-0">
                <div className="relative">
                  <div 
                    className="h-52 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${city.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* City name overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-display text-2xl font-bold">{city.name}</h3>
                      <p className="text-white/90 text-sm">{city.country}</p>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-secondary fill-current" />
                      <span className="text-white font-semibold text-sm">{city.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {city.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1 text-sm text-primary font-medium">
                      <Camera className="h-4 w-4" />
                      <span>{city.attractions} attractions</span>
                    </div>
                    <div className="text-sm text-accent font-medium group-hover:text-accent-foreground transition-colors">
                      Explore →
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