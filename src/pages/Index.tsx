import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCountries from "@/components/FeaturedCountries";
import PopularCities from "@/components/PopularCities";
import TravelBlogPreview from "@/components/TravelBlogPreview";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <SEO 
          title="GlobeDiaries - Explore the World with Us | Travel Blog & Guides"
          description="Discover amazing destinations worldwide with GlobeDiaries. Get travel guides, city highlights, cultural insights, and adventure tips for your next journey."
        />
        <HeroSection />
        <FeaturedCountries />
        <PopularCities />
        <TravelBlogPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
