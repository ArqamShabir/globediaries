import { Link } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import franceImage from "@/assets/france.jpg";
import italyImage from "@/assets/italy.jpg";
import japanImage from "@/assets/japan.jpg";
import usaImage from "@/assets/usa.jpg";
import pakistanImage from "@/assets/pakistan.jpg";
import turkeyImage from "@/assets/turkey.jpg";

const FeaturedCountries = () => {
  const countries = [
    {
      id: "france",
      name: "France",
      description: "From the romantic streets of Paris to the lavender fields of Provence",
      image: franceImage,
      cities: 45,
      guides: 89,
      featured: true,
    },
    {
      id: "italy",
      name: "Italy",
      description: "Ancient history, Renaissance art, and culinary perfection",
      image: italyImage,
      cities: 38,
      guides: 76,
      featured: true,
    },
    {
      id: "japan",
      name: "Japan",
      description: "Where ancient traditions meet cutting-edge technology",
      image: japanImage,
      cities: 32,
      guides: 64,
      featured: false,
    },
    {
      id: "usa",
      name: "United States",
      description: "Diverse landscapes from coast to coast, endless adventures await",
      image: usaImage,
      cities: 156,
      guides: 234,
      featured: true,
    },
    {
      id: "pakistan",
      name: "Pakistan",
      description: "Majestic mountains, rich culture, and warm hospitality",
      image: pakistanImage,
      cities: 28,
      guides: 45,
      featured: false,
    },
    {
      id: "turkey",
      name: "Turkey",
      description: "Where East meets West, bridging Europe and Asia",
      image: turkeyImage,
      cities: 34,
      guides: 58,
      featured: false,
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Featured Countries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the world's most captivating destinations through our comprehensive 
            country guides and local insights.
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCountries.map((country) => (
            <Link key={country.id} to={`/country/${country.id}`}>
              <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${country.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {country.featured && (
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {country.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{country.cities} cities</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{country.guides} guides</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/countries"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore All Countries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCountries;