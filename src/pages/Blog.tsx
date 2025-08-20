import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      id: "paris-hidden-gems",
      title: "10 Hidden Gems in Paris You've Never Heard Of",
      excerpt: "Discover the secret side of Paris beyond the tourist trails. From hidden courtyards to underground wine bars, these spots will make you fall in love with the city all over again.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "City Guides",
      image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: "italy-food-tour",
      title: "The Ultimate Food Lover's Guide to Italy",
      excerpt: "From authentic pasta in Bologna to gelato in Florence, embark on a culinary journey through Italy's most delicious regions.",
      author: "Marco Rossini",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Food & Culture",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: "japan-budget-travel",
      title: "How to Experience Japan on a Budget",
      excerpt: "Think Japan is expensive? Think again! Learn how to explore the Land of the Rising Sun without breaking the bank.",
      author: "Yuki Tanaka",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Budget Travel",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: "adventure-turkey",
      title: "Adventure Activities in Cappadocia",
      excerpt: "Hot air ballooning, cave exploring, and hiking through fairy chimneys - Cappadocia is an adventurer's paradise.",
      author: "Mehmet Özkan",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Adventure Travel",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: "luxury-maldives",
      title: "Ultimate Luxury Experience in the Maldives",
      excerpt: "Discover overwater villas, private islands, and world-class spas in this tropical paradise.",
      author: "Isabella Martinez",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Luxury Travel",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: "backpacking-europe",
      title: "Backpacking Europe: A Complete Guide",
      excerpt: "Everything you need to know for an epic European backpacking adventure, from route planning to budget tips.",
      author: "Alex Thompson",
      date: "2024-01-03",
      readTime: "15 min read",
      category: "Budget Travel",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { name: "Travel Guides", count: 24 },
    { name: "Food & Culture", count: 18 },
    { name: "Adventure Travel", count: 16 },
    { name: "Budget Travel", count: 22 },
    { name: "Luxury Travel", count: 12 }
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Travel Stories & Guides
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover the world through our curated collection of travel stories, 
              destination guides, and insider tips from experienced travelers.
            </p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search blog posts..."
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3">
                <Badge 
                  variant="default" 
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground cursor-pointer"
                >
                  All Posts
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category.name}
                    variant="outline" 
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${post.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {post.featured && (
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
                            Featured
                          </Badge>
                        )}

                        <Badge 
                          variant="secondary"
                          className="absolute top-4 right-4 bg-white/90 text-foreground"
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="text-primary font-medium group-hover:text-primary-dark transition-colors pt-2">
                        Read More →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8">
                Load More Posts
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;