import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TravelBlogPreview = () => {
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
    }
  ];

  const categories = ["Travel Guides", "Food & Culture", "Adventure Travel", "Budget Travel", "Luxury Travel"];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Travel Stories & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get inspired by real travel experiences, practical tips, and insider knowledge 
            from our community of passionate travelers.
          </p>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Link key={category} to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {category}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                <div className="relative">
                  <div 
                    className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
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
                
                <CardContent className="p-6 space-y-4 flex-1">
                  <div className="space-y-3">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
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

                  <div className="flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors pt-2">
                    <span>Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-nature text-accent-foreground rounded-full hover:opacity-90 transition-all duration-300 shadow-card"
          >
            Explore All Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelBlogPreview;