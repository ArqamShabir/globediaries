import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCountries from "@/components/FeaturedCountries";
import PopularCities from "@/components/PopularCities";
import TravelBlogPreview from "@/components/TravelBlogPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
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