import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Navigation, Utensils } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseSlot from '@/components/AdSenseSlot';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const City = () => {
  const { countryId, cityId } = useParams();

  // Sample city data - in a real app, this would come from an API
  const cityData = {
    france: {
      paris: {
        name: "Paris",
        country: "France",
        description: "The City of Light, known for its art, fashion, gastronomy, and culture. Paris is a global center for art, fashion, gastronomy and culture.",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&h=800&fit=crop",
        bestTimeToVisit: "April to June, September to October",
        currency: "Euro (EUR)",
        language: "French",
        attractions: [
          {
            name: "Eiffel Tower",
            description: "Iconic iron lattice tower and symbol of Paris",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&h=400&fit=crop",
            category: "Landmark",
            rating: 4.5
          },
          {
            name: "Louvre Museum",
            description: "World's largest art museum and historic monument",
            image: "https://images.unsplash.com/photo-1566139447312-af2d1d8f3d09?w=600&h=400&fit=crop",
            category: "Museum",
            rating: 4.6
          },
          {
            name: "Notre-Dame Cathedral",
            description: "Medieval Catholic cathedral with Gothic architecture",
            image: "https://images.unsplash.com/photo-1539650116574-75c0c6d34e6f?w=600&h=400&fit=crop",
            category: "Religious Site",
            rating: 4.4
          },
          {
            name: "Seine River Cruise",
            description: "Romantic boat tour through the heart of Paris",
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop",
            category: "Activity",
            rating: 4.3
          }
        ],
        travelTips: [
          "Metro day passes offer unlimited travel and great value",
          "Many museums are free on the first Sunday of each month",
          "Book restaurant reservations in advance, especially for dinner",
          "Learn basic French phrases - locals appreciate the effort",
          "Walk when possible - Paris is very pedestrian-friendly"
        ],
        transportation: {
          airport: "Charles de Gaulle (CDG) and Orly (ORY)",
          metro: "Extensive metro system with 14 lines",
          taxi: "Uber, regular taxis, and bike sharing available",
          walking: "Most attractions are walkable in central Paris"
        }
      }
    },
    italy: {
      rome: {
        name: "Rome",
        country: "Italy",
        description: "The Eternal City, filled with ancient history, incredible architecture, and amazing cuisine.",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&h=800&fit=crop",
        bestTimeToVisit: "April to June, September to October",
        currency: "Euro (EUR)",
        language: "Italian",
        attractions: [
          {
            name: "Colosseum",
            description: "Ancient Roman amphitheater and iconic symbol of Imperial Rome",
            image: "https://images.unsplash.com/photo-1539650116574-75c0c6d34e6f?w=600&h=400&fit=crop",
            category: "Historic Site",
            rating: 4.5
          },
          {
            name: "Vatican City",
            description: "Spiritual and administrative headquarters of the Roman Catholic Church",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
            category: "Religious Site",
            rating: 4.7
          },
          {
            name: "Trevi Fountain",
            description: "Baroque fountain and one of the most famous fountains in the world",
            image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&h=400&fit=crop",
            category: "Landmark",
            rating: 4.4
          },
          {
            name: "Roman Forum",
            description: "Rectangular forum surrounded by ruins of ancient government buildings",
            image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop",
            category: "Historic Site",
            rating: 4.3
          }
        ],
        travelTips: [
          "Book Colosseum and Vatican tickets online to skip lines",
          "Visit major attractions early morning or late afternoon",
          "Try authentic Roman cuisine in Trastevere neighborhood",
          "Carry a water bottle - public fountains are everywhere",
          "Dress modestly when visiting religious sites"
        ],
        transportation: {
          airport: "Fiumicino (FCO) and Ciampino (CIA)",
          metro: "Three metro lines cover major attractions",
          taxi: "Official white taxis or ride-sharing apps",
          walking: "Historic center is very walkable"
        }
      }
    }
  };

  const currentCity = cityData[countryId as keyof typeof cityData]?.[cityId as keyof typeof cityData[keyof typeof cityData]] as any;

  if (!currentCity) {
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
        <section className="py-4 bg-muted/20">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to={`/country/${countryId}`} className="hover:text-primary capitalize">{countryId}</Link>
              <span>/</span>
              <span className="text-foreground">{currentCity.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative">
          <div 
            className="h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentCity.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
                  {currentCity.name}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl leading-relaxed mb-4">
                  {currentCity.description}
                </p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{currentCity.country}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Best: {currentCity.bestTimeToVisit}</span>
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
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country:</span>
                      <span className="font-medium">{currentCity.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Currency:</span>
                      <span className="font-medium">{currentCity.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium">{currentCity.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Time:</span>
                      <span className="font-medium">{currentCity.bestTimeToVisit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transportation */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Navigation className="h-5 w-5 mr-2" />
                    Getting Around
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Airport:</span>
                      <p className="text-muted-foreground">{currentCity.transportation.airport}</p>
                    </div>
                    <div>
                      <span className="font-medium">Public Transit:</span>
                      <p className="text-muted-foreground">{currentCity.transportation.metro}</p>
                    </div>
                    <div>
                      <span className="font-medium">Taxis:</span>
                      <p className="text-muted-foreground">{currentCity.transportation.taxi}</p>
                    </div>
                    <div>
                      <span className="font-medium">Walking:</span>
                      <p className="text-muted-foreground">{currentCity.transportation.walking}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdSenseSlot adSlot="2222222222" className="bg-muted/20 rounded-lg p-4" />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12">
              {/* Top Attractions */}
              <section>
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                  <Camera className="h-8 w-8 mr-3 text-primary" />
                  Top Attractions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCity.attractions.map((attraction, index) => (
                    <Card key={index} className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                      <div className="relative">
                        <div 
                          className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url(${attraction.image})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <Badge className="absolute top-4 left-4 bg-white/90 text-foreground">
                            {attraction.category}
                          </Badge>
                          <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{attraction.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {attraction.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

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
              <section>
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center">
                  <Utensils className="h-8 w-8 mr-3 text-primary" />
                  Essential Travel Tips
                </h2>
                <Card>
                  <CardContent className="p-8">
                    <ul className="space-y-4">
                      {currentCity.travelTips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-foreground leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Call to Action */}
              <section className="text-center py-12 bg-gradient-subtle rounded-2xl">
                <h2 className="font-display text-3xl font-bold mb-4">Plan Your Trip to {currentCity.name}</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ready to explore {currentCity.name}? Start planning your adventure today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Find Hotels
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Book Tours
                  </Button>
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