import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdSenseSlot from "@/components/AdSenseSlot";
import { blogPosts, getBlogsByCategory } from "@/data/blogs";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const categories = [
    { name: "City Guides", count: blogPosts.filter(p => p.category === "City Guides").length },
    { name: "Food & Culture", count: blogPosts.filter(p => p.category === "Food & Culture").length },
    { name: "Adventure Travel", count: blogPosts.filter(p => p.category === "Adventure Travel").length },
    { name: "Budget Travel", count: blogPosts.filter(p => p.category === "Budget Travel").length },
    { name: "Luxury Travel", count: blogPosts.filter(p => p.category === "Luxury Travel").length }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterPosts(searchQuery, selectedCategory);
  };

  const filterPosts = (query: string, category: string | null) => {
    let filtered = blogPosts;

    if (category) {
      filtered = getBlogsByCategory(category);
    }

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredPosts(filtered);
  };

  const handleCategoryClick = (categoryName: string) => {
    const newCategory = selectedCategory === categoryName ? null : categoryName;
    setSelectedCategory(newCategory);
    filterPosts(searchQuery, newCategory);
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
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </form>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleCategoryClick("")}
                >
                  All Posts ({blogPosts.length})
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
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
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
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
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  No posts found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all categories.
                </p>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <>
                <AdSenseSlot 
                  adSlot="2345678901"
                  adFormat="square"
                  className="mt-12 flex justify-center"
                />
                
                {/* Load More Button */}
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline" className="px-8">
                    Load More Posts
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;