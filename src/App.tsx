import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Country from "./pages/Country";
import Countries from "./pages/Countries";
import City from "./pages/City";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Cities from "./pages/Cites";
import NotFound from "./pages/NotFound";
import Disclaimer from "./pages/Disclaimer";
import TermsOfService from "./pages/TermsOfService";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
       <ScrollToTop />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/countries" element={<Countries />} />
          <Route path="/country/:countryId" element={<Country />} />
           {/*
                      <Route path="/cities" element={<Cities />} />
                     <Route path="/country/:countryId/city/:cityId" element={<City />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
           ROUTE */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
