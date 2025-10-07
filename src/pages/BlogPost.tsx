import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseSlot from "@/components/AdSenseSlot";
import { fetchWordPressPost, fetchWordPressPostBySlug, formatBlogPost, fetchWordPressPosts } from "@/data/blogs";
import SEO from "@/components/SEO";
import WordPressContent from "@/components/WordPressContent";

const BlogPost = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!blogId) return;
      
      try {
        const isNumericId = /^\d+$/.test(blogId);
        const postData = isNumericId ? await fetchWordPressPost(parseInt(blogId)) : await fetchWordPressPostBySlug(blogId);
        if (postData) {
          const formattedPost = formatBlogPost(postData);
          setBlog(formattedPost);
          
          // Load related posts
          const related = await fetchWordPressPosts('', '', 1, 3);
          const filteredRelated = related
            .filter(p => (isNumericId ? p.id !== parseInt(blogId) : true))
            .map(formatBlogPost)
            .slice(0, 3);
          setRelatedPosts(filteredRelated);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [blogId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Header />
        <SEO title="Loading post... | GlobeDiaries" description="Reading travel story" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Header />
        <SEO title="Post not found | GlobeDiaries" noindex />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
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
      <SEO 
        title={`${blog.title} | GlobeDiaries`}
        description={blog.excerpt}
        image={blog.image}
      />
     
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8 h-64 md:h-96 rounded-lg overflow-hidden">
          <img src={blog.image_full || blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                {blog.category}
              </Badge>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                {blog.title}
              </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <WordPressContent content={blog.content} />
            </article>

            <AdSenseSlot 
              adSlot="3456789012"
              adFormat="horizontal"
              className="my-12"
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <AdSenseSlot 
              adSlot="4567890123"
              adFormat="vertical"
              className="sticky top-8"
            />
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Related Posts</h2>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedBlog) => (
                  <Link key={relatedBlog.id} to={`/blog/${relatedBlog.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-0">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedBlog.image || '/placeholder.svg'}
                        srcSet={relatedBlog.image_srcset}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        alt={`${relatedBlog.title} image`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedBlog.author}</span>
                        <span>{relatedBlog.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No related posts available.</p>
          )}
        </section>

        <AdSenseSlot 
          adSlot="5678901234"
          adFormat="horizontal"
          className="mt-16"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
