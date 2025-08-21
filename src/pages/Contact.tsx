import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AdSenseSlot from "@/components/AdSenseSlot";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      {/* SEO Meta Tags */}
      <title>Contact Us - GlobeDiaries | Get in Touch</title>
      <meta name="description" content="Contact GlobeDiaries for travel inquiries, partnerships, or general questions. We'd love to hear from you and help plan your next adventure." />
      <meta name="keywords" content="contact GlobeDiaries, travel inquiries, travel help, customer support" />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Have a question, suggestion, or just want to share your travel story? 
              We'd love to hear from you!
            </p>
          </div>
        </section>

        <AdSenseSlot 
          adSlot="1234567890"
          adFormat="horizontal"
          className="my-8"
        />

        {/* Contact Form & Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <Card className="bg-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-bold text-foreground flex items-center">
                    <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          type="text" 
                          placeholder="John" 
                          required 
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          type="text" 
                          placeholder="Doe" 
                          required 
                          className="bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        type="text" 
                        placeholder="What's this about?" 
                        required 
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..." 
                        rows={6}
                        required 
                        className="bg-background resize-none"
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Email Us</h4>
                          <p className="text-muted-foreground">hello@globediaries.com</p>
                          <p className="text-muted-foreground">support@globediaries.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Call Us</h4>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                          <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Visit Us</h4>
                          <p className="text-muted-foreground">
                            123 Travel Street<br />
                            Adventure City, AC 12345<br />
                            United States
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AdSenseSlot 
                  adSlot="0987654321"
                  adFormat="square"
                />

                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground">For Press Inquiries</h4>
                        <p className="text-sm text-muted-foreground">press@globediaries.com</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">For Partnerships</h4>
                        <p className="text-sm text-muted-foreground">partnerships@globediaries.com</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">For Technical Issues</h4>
                        <p className="text-sm text-muted-foreground">tech@globediaries.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">Response Time</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We typically respond to all inquiries within 24-48 hours during business days. 
                      For urgent matters, please call us directly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Quick answers to common questions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">How can I submit a travel story?</h3>
                    <p className="text-muted-foreground text-sm">
                      We welcome guest contributions! Send your story ideas to 
                      submissions@globediaries.com with a brief outline.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Do you offer travel planning services?</h3>
                    <p className="text-muted-foreground text-sm">
                      Currently, we provide travel information and guides. For personalized 
                      planning, contact us for partner recommendations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Can I use your photos?</h3>
                    <p className="text-muted-foreground text-sm">
                      Our photos are copyrighted. For usage rights, please contact 
                      our team with specific requests.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">How often is content updated?</h3>
                    <p className="text-muted-foreground text-sm">
                      We publish new content weekly and regularly update existing 
                      guides to ensure accuracy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <AdSenseSlot 
          adSlot="5678901234"
          adFormat="horizontal"
          className="my-8"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;