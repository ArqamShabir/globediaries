import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Globe, Calendar, Camera, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Country = () => {
  const { countryId } = useParams();

  // Mock data - in a real app, this would come from an API
  const countryData = {
    france: {
      name: "France",
      description: "France, officially the French Republic, is a country located primarily in Western Europe. Known for its rich history, cultural heritage, exquisite cuisine, and iconic landmarks, France remains one of the world's most popular tourist destinations.",
      overview: "From the romantic streets of Paris to the sun-soaked beaches of the French Riviera, France offers an incredible diversity of experiences. The country is renowned for its art, architecture, cuisine, and wine, making it a cultural powerhouse that has influenced the world for centuries.",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=600&fit=crop",
      capital: "Paris",
      population: "68 million",
      language: "French",
      currency: "Euro (EUR)",
      bestTime: "April to October",
      cities: [
        { id: "paris", name: "Paris", description: "The City of Light", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop" },
        { id: "nice", name: "Nice", description: "French Riviera gem", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d4b9d6?w=400&h=300&fit=crop" },
        { id: "lyon", name: "Lyon", description: "Culinary capital", image: "https://images.unsplash.com/photo-1524820197278-540916411e20?w=400&h=300&fit=crop" },
        { id: "marseille", name: "Marseille", description: "Historic port city", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop" }
      ],
      attractions: [
        "Eiffel Tower",
        "Louvre Museum", 
        "Notre-Dame Cathedral",
        "Palace of Versailles",
        "Mont-Saint-Michel",
        "Château de Chambord"
      ],
      blogs: [
        { id: "paris-hidden-gems", title: "10 Hidden Gems in Paris", date: "2024-01-15" },
        { id: "provence-lavender", title: "Lavender Fields of Provence", date: "2024-01-10" },
        { id: "french-cuisine-guide", title: "A Guide to French Cuisine", date: "2024-01-05" }
      ]
    }
  };

  const country = countryData[countryId as keyof typeof countryData];

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Country Not Found</h1>
          <p className="text-muted-foreground mb-8">The country you're looking for doesn't exist in our database.</p>
          <Link to="/countries">
            <Button>Browse All Countries</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${country.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl">
              <Link to="/countries" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Countries
              </Link>
              
              <h1 className="font-display text-6xl md:text-7xl font-bold text-white mb-6">
                {country.name}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
                {country.description}
              </p>
            </div>
          </div>
        </section>

        {/* Country Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">About {country.name}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {country.overview}
                  </p>
                </div>

                {/* Top Attractions */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">Top Attractions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {country.attractions.map((attraction, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                        <Star className="h-5 w-5 text-secondary" />
                        <span className="font-medium text-foreground">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Country Info Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 bg-card border-0 shadow-card">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">Country Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Capital</div>
                        <div className="text-muted-foreground">{country.capital}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Population</div>
                        <div className="text-muted-foreground">{country.population}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Language</div>
                        <div className="text-muted-foreground">{country.language}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Best Time to Visit</div>
                        <div className="text-muted-foreground">{country.bestTime}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cities */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl font-bold text-foreground text-center mb-12">
              Featured Cities in {country.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {country.cities.map((city) => (
                <Link key={city.id} to={`/city/${city.id}`}>
                  <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0">
                    <div 
                      className="h-40 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${city.image})` }}
                    >
                      <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-display text-lg font-bold">{city.name}</h3>
                          <p className="text-white/90 text-sm">{city.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl font-bold text-foreground text-center mb-12">
              Travel Stories from {country.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {country.blogs.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.id}`}>
                  <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card border-0 p-6">
                    <CardContent className="p-0 space-y-3">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-primary font-medium group-hover:text-primary-dark transition-colors">
                        Read More →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Country;