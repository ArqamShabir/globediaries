import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, Users, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Travel Writer & Photographer",
      bio: "Passionate about capturing the beauty of destinations through words and images.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop"
    },
    {
      name: "Marco Rossini",
      role: "Culture & Food Expert",
      bio: "Dedicated to exploring culinary traditions and cultural heritage worldwide.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "Yuki Tanaka",
      role: "Adventure Travel Specialist",
      bio: "Expert in outdoor adventures and off-the-beaten-path destinations.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    }
  ];

  const stats = [
    { icon: Globe, number: "195+", label: "Countries Covered" },
    { icon: MapPin, number: "1000+", label: "Cities Explored" },
    { icon: Users, number: "50K+", label: "Monthly Readers" },
    { icon: Heart, number: "500+", label: "Travel Guides" }
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <SEO 
          title="About GlobeDiaries"
          description="Learn about GlobeDiaries' mission, team, and how we create helpful travel guides and stories."
        />
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About GlobeDiaries
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're passionate travelers sharing authentic experiences and practical 
              insights to help you explore the world with confidence.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="font-display text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At GlobeDiaries, we believe that travel has the power to transform lives, 
                broaden perspectives, and create lasting memories. Our mission is to inspire 
                and empower travelers of all backgrounds to explore the world through 
                authentic stories, practical guides, and insider knowledge.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Authentic Stories</h3>
                  <p className="text-muted-foreground">Real experiences from real travelers sharing genuine insights.</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Practical Guides</h3>
                  <p className="text-muted-foreground">Detailed information to help you plan your perfect trip.</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Passion for Travel</h3>
                  <p className="text-muted-foreground">Every story is written with love and enthusiasm for exploration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <stat.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>             

        {/* Story Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="font-display text-4xl font-bold text-foreground text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  GlobeDiaries was born from a simple idea: travel should be accessible, 
                  inspiring, and transformative for everyone. Founded by a group of passionate 
                  travelers who met during their own adventures, we noticed a gap in travel 
                  content that truly reflected the authentic experience of exploring new destinations.
                </p>
                <p>
                  Starting as a personal travel blog, GlobeDiaries has grown into a comprehensive 
                  platform featuring destination guides, cultural insights, practical tips, and 
                  inspiring stories from travelers around the world. We've visited over 195 countries 
                  and countless cities, always with the goal of bringing you honest, helpful, and 
                  inspiring content.
                </p>
                <p>
                  Today, our community includes writers, photographers, local experts, and fellow 
                  travelers who share our vision of making the world more accessible through 
                  meaningful travel experiences. Whether you're planning your first international 
                  trip or you're a seasoned explorer looking for your next adventure, we're here 
                  to guide and inspire you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-card border-0 shadow-card">
                <CardContent className="p-0 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We share real experiences, honest opinions, and genuine insights 
                    from our travels, never compromising on truth for popularity.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-card border-0 shadow-card">
                <CardContent className="p-0 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We promote responsible travel practices that respect local 
                    communities, cultures, and the environment.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-card border-0 shadow-card">
                <CardContent className="p-0 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Travel is for everyone. We strive to make our content accessible 
                    and relevant to travelers of all backgrounds and budgets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
