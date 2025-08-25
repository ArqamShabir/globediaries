import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogCategories, fetchWordPressPosts, formatBlogPost } from "@/data/blogs";
import AdSenseSlot from "@/components/AdSenseSlot";
import { useState, useEffect } from "react";

const TravelBlogPreview = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchWordPressPosts('', '', 1, 3);
        const formattedPosts = posts.map(formatBlogPost);
        setFeaturedBlogs(formattedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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
          {blogCategories.slice(1).map((category) => (
            <Link key={category.name} to={`/blog?category=${category.slug}`}>
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured Blog Posts */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading latest blog posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${blog.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold">
                        Latest
                      </Badge>
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                       
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{blog.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime}</span>
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
        )}

        <div className="text-center mt-12">
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