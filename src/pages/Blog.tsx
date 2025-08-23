import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseSlot from "@/components/AdSenseSlot";
import { blogCategories, fetchWordPressPosts, formatBlogPost } from "@/data/blogs";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const categorySlug = selectedCategory === "All" ? "" : blogCategories.find(cat => cat.name === selectedCategory)?.slug || "";
        const posts = await fetchWordPressPosts(categorySlug, searchTerm, 1, 12);
        const formattedPosts = posts.map(formatBlogPost);
        setBlogs(formattedPosts);
        setHasMore(posts.length === 12);
        setPage(1);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(loadPosts, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  const loadMorePosts = async () => {
    try {
      const categorySlug = selectedCategory === "All" ? "" : blogCategories.find(cat => cat.name === selectedCategory)?.slug || "";
      const nextPage = page + 1;
      const posts = await fetchWordPressPosts(categorySlug, searchTerm, nextPage, 12);
      const formattedPosts = posts.map(formatBlogPost);
      setBlogs(prev => [...prev, ...formattedPosts]);
      setPage(nextPage);
      setHasMore(posts.length === 12);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

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

        <AdSenseSlot 
          adSlot="1234567890"
          adFormat="horizontal"
          className="my-8"
        />

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3">
                {blogCategories.map((category) => (
                  <Badge 
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading blog posts...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts found. Please try a different search term or category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
                      <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                        <div className="relative">
                          <div 
                            className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${blog.image})` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            
                            <Badge 
                              variant="secondary"
                              className="absolute top-4 right-4 bg-white/90 text-foreground"
                            >
                              {blog.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="p-6 space-y-4">
                          <div className="space-y-3">
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{blog.author}</span>
                              </div>
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

                          <div className="text-primary font-medium group-hover:text-primary-dark transition-colors pt-2">
                            Read More →
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                {hasMore && (
                  <div className="text-center mt-12">
                    <Button 
                      onClick={loadMorePosts}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      Load More Posts
                    </Button>
                  </div>
                )}
              </>
            )}

            <AdSenseSlot 
              adSlot="2345678901"
              adFormat="square"
              className="mt-12 flex justify-center"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;