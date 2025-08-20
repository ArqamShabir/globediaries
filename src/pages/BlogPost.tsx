import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseSlot from '@/components/AdSenseSlot';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { blogId } = useParams();

  // Sample blog data - in a real app, this would come from an API
  const blogPosts = {
    "paris-hidden-gems": {
      title: "10 Hidden Gems in Paris You've Never Heard Of",
      excerpt: "Discover the secret side of Paris beyond the tourist trails. From hidden courtyards to underground wine bars, these spots will make you fall in love with the city all over again.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "City Guides",
      image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&h=800&fit=crop",
      content: `
        <p>Paris is a city that never stops revealing its secrets. While millions flock to the Eiffel Tower and Louvre each year, there's an entire world of hidden treasures waiting to be discovered by those willing to venture off the beaten path.</p>

        <h2>1. Passage des Panoramas</h2>
        <p>Built in 1800, this covered passage is one of Paris's oldest shopping galleries. Unlike the more famous passages, it retains an authentic old-world charm with vintage stamp shops, traditional bistros, and quirky bookstores.</p>

        <h2>2. Musée de la Chasse et de la Nature</h2>
        <p>This unconventional museum in the Marais district offers a unique perspective on the relationship between humans and nature through hunting and wildlife art. The museum's eclectic collection and thought-provoking exhibitions make it a hidden cultural gem.</p>

        <h2>3. La Coulée Verte (Promenade Plantée)</h2>
        <p>Long before New York's High Line, Paris created this elevated park built on a former railway line. Stretching from Bastille to the Bois de Vincennes, it offers a unique perspective of the city from above the bustling streets.</p>

        <h2>4. Bibliothèque Forney</h2>
        <p>Located in the beautiful Hôtel de Sens, this specialized library focuses on decorative arts and crafts. Even if you're not researching, the building itself is worth visiting for its medieval architecture.</p>

        <h2>5. Marché aux Puces de Saint-Ouen</h2>
        <p>While not exactly hidden, this massive flea market north of Paris remains overlooked by many tourists. With over 2,500 vendors spread across multiple markets, it's a treasure hunter's paradise.</p>

        <h2>6. Rue Crémieux</h2>
        <p>This picturesque cobblestone street near Gare de Lyon looks like something out of a fairy tale with its colorful houses and ivy-covered walls. It's become increasingly popular on Instagram, but still feels like a secret neighborhood.</p>

        <h2>7. Musée de la Parfumerie Fragonard</h2>
        <p>Discover the art of French perfumery in this intimate museum near the Opéra. The collection includes antique perfume bottles, manufacturing equipment, and the history of scent in French culture.</p>

        <h2>8. Jardin Sauvage Saint-Vincent</h2>
        <p>Hidden in Montmartre, this wild garden preserves the natural flora that once covered the hill. It's only open on weekends and offers a peaceful escape from the tourist crowds of Sacré-Cœur.</p>

        <h2>9. La Recyclerie</h2>
        <p>Built in a former railway station, this eco-friendly restaurant and cultural space on the Petite Ceinture promotes sustainable living. It features an urban farm, workshops, and a restaurant serving locally-sourced food.</p>

        <h2>10. Cour Saint-Émilion</h2>
        <p>This hidden courtyard in Bercy was once part of the old wine warehouses. Today, it houses boutiques, restaurants, and cafés in beautifully preserved 19th-century buildings, offering a glimpse into Paris's commercial past.</p>

        <h2>Tips for Exploring Hidden Paris</h2>
        <p>The best way to discover these hidden gems is to walk without a specific destination in mind. Paris rewards the curious traveler who's willing to turn down an unknown street or peek through an open courtyard door.</p>

        <p>Many of these locations have limited hours or require advance booking, so always check before visiting. Also, remember that some of these "hidden" spots are becoming more popular, so visiting early in the day or during off-peak seasons will give you a more authentic experience.</p>
      `,
      tags: ["Paris", "Hidden Gems", "Travel Tips", "France", "City Guide"],
      relatedPosts: ["italy-food-tour", "adventure-turkey", "japan-budget-travel"]
    },
    "italy-food-tour": {
      title: "The Ultimate Food Lover's Guide to Italy",
      excerpt: "From authentic pasta in Bologna to gelato in Florence, embark on a culinary journey through Italy's most delicious regions.",
      author: "Marco Rossini",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Food & Culture",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&h=800&fit=crop",
      content: `
        <p>Italy is not just a country; it's a culinary universe where every region tells its story through food. From the rich ragù of Emilia-Romagna to the fresh seafood of the Amalfi Coast, Italian cuisine offers an incredible diversity that goes far beyond pizza and spaghetti.</p>

        <h2>Northern Italy: Comfort Food Paradise</h2>
        <p>Northern Italy's cuisine reflects its colder climate and Alpine influences. Here, you'll find rich, hearty dishes that warm the soul.</p>

        <h3>Emilia-Romagna: The Food Capital</h3>
        <p>Bologna, the region's capital, is often called Italy's food capital. This is where Parmigiano-Reggiano, Prosciutto di Parma, and traditional Bolognese sauce originate. Don't miss trying tortellini in brodo (tortellini in broth) at a traditional osteria.</p>

        <h3>Lombardy: Risotto and More</h3>
        <p>Milan and the surrounding region are famous for risotto, particularly Risotto alla Milanese with its distinctive saffron flavor. The region also produces excellent wines like Franciacorta and Valtellina.</p>

        <h2>Central Italy: Simplicity at Its Best</h2>
        <p>Central Italian cuisine emphasizes simple, high-quality ingredients that let natural flavors shine.</p>

        <h3>Tuscany: Rustic Elegance</h3>
        <p>Tuscan cuisine is all about simplicity and quality. Try ribollita (vegetable and bread soup), bistecca alla fiorentina (Florentine steak), and pair everything with Chianti wine. Don't forget to visit a traditional enoteca for wine tasting.</p>

        <h3>Rome: Eternal Flavors</h3>
        <p>Roman cuisine features bold, simple flavors. Must-try dishes include carbonara, cacio e pepe, amatriciana, and supplì (fried rice balls). Visit Testaccio market for the most authentic Roman food experience.</p>

        <h2>Southern Italy: Mediterranean Magic</h2>
        <p>Southern Italian cuisine showcases the region's abundant sunshine through fresh vegetables, seafood, and bold flavors.</p>

        <h3>Campania: Pizza's Birthplace</h3>
        <p>Naples is where pizza was born, and experiencing authentic Neapolitan pizza here is a pilgrimage for food lovers. Try Pizza Margherita at L'Antica Pizzeria da Michele or Sorbillo.</p>

        <h3>Sicily: Fusion of Cultures</h3>
        <p>Sicilian cuisine reflects the island's complex history with Arab, Spanish, and Italian influences. Don't miss arancini, caponata, and granita. The street food scene in Palermo's markets is extraordinary.</p>

        <h2>Regional Specialties Not to Miss</h2>

        <h3>Gelato Tour</h3>
        <p>Every region has its gelato traditions. In Rome, try Giolitti or Fatamorgana. In Florence, visit Vivoli. In Sicily, granita is often paired with brioche for breakfast.</p>

        <h3>Wine Regions</h3>
        <p>Pair your food journey with Italy's incredible wines. Visit Tuscany's Chianti region, Piedmont for Barolo, or Veneto for Prosecco. Many vineyards offer tours and tastings.</p>

        <h3>Cheese and Charcuterie</h3>
        <p>Italy produces some of the world's best cheeses. Visit a proper salumeria to try various regional cheeses and cured meats. Learn about the differences between Parmigiano-Reggiano ages and regional salamis.</p>

        <h2>Food Culture Tips</h2>

        <h3>Meal Times</h3>
        <p>Italians eat late compared to many countries. Lunch is typically 1-3 PM, and dinner starts around 8 PM or later in the south.</p>

        <h3>Coffee Culture</h3>
        <p>Coffee is serious business in Italy. Cappuccino is only for breakfast, and espresso is often consumed standing at the bar. Never order a latte – ask for caffè if you want espresso.</p>

        <h3>Local Markets</h3>
        <p>Visit local markets for the freshest ingredients and authentic atmosphere. San Lorenzo market in Florence, Porta Nolana in Naples, and Campo de' Fiori in Rome are excellent starts.</p>

        <h2>Planning Your Food Journey</h2>
        <p>Consider taking cooking classes to learn authentic techniques. Many agritourism properties offer farm-to-table experiences. Book restaurant reservations in advance, especially in tourist areas.</p>

        <p>Remember, Italian food culture is about more than just eating – it's about community, tradition, and taking time to enjoy life's pleasures. Embrace the Italian approach: eat slowly, savor every bite, and enjoy good company.</p>
      `,
      tags: ["Italy", "Food", "Cuisine", "Travel", "Wine", "Culture"],
      relatedPosts: ["paris-hidden-gems", "adventure-turkey", "luxury-maldives"]
    },
    "japan-budget-travel": {
      title: "How to Experience Japan on a Budget",
      excerpt: "Think Japan is expensive? Think again! Learn how to explore the Land of the Rising Sun without breaking the bank.",
      author: "Yuki Tanaka",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Budget Travel",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop",
      content: `
        <p>Japan has a reputation for being expensive, but with careful planning and insider knowledge, you can experience this incredible country without breaking the bank. Here's your complete guide to budget travel in Japan.</p>

        <h2>Transportation: Your Biggest Savings Opportunity</h2>

        <h3>JR Pass: Worth It or Not?</h3>
        <p>The Japan Rail Pass can be expensive upfront but offers incredible value if you're traveling between cities. Calculate your planned trips – if you're taking the shinkansen (bullet train) more than twice, the pass usually pays for itself.</p>

        <h3>Local Transportation Tips</h3>
        <p>In cities, use day passes for unlimited subway and bus travel. Tokyo's 24-hour metro pass costs about ¥1,500 and can save you significant money. Walk when possible – Japanese cities are very walkable and you'll discover hidden gems.</p>

        <h3>Highway Buses</h3>
        <p>For budget-conscious travelers, highway buses are an excellent alternative to trains. Night buses between major cities cost a fraction of shinkansen tickets and save you a night's accommodation.</p>

        <h2>Accommodation: Beyond Expensive Hotels</h2>

        <h3>Hostels and Guesthouses</h3>
        <p>Japan has excellent hostels with traditional Japanese elements. Many offer tatami rooms and communal baths. Expect to pay ¥2,000-4,000 per night in dorms.</p>

        <h3>Capsule Hotels</h3>
        <p>A uniquely Japanese experience that's budget-friendly. Modern capsule hotels offer comfortable pods with entertainment systems, usually around ¥3,000-5,000 per night.</p>

        <h3>Temple Stays (Shukubo)</h3>
        <p>Some temples offer overnight stays that include meals and meditation sessions. This provides cultural immersion at reasonable prices, typically ¥6,000-10,000 including meals.</p>

        <h3>Internet Cafes</h3>
        <p>In a pinch, 24-hour internet cafes offer shower facilities and sleeping pods for around ¥1,500-2,500 per night. It's basic but functional for short stays.</p>

        <h2>Food: Eating Well for Less</h2>

        <h3>Convenience Store Meals</h3>
        <p>Japanese convenience stores (konbini) offer high-quality, affordable meals. A filling meal costs ¥300-600. The food is fresh, tasty, and available 24/7.</p>

        <h3>Chain Restaurants</h3>
        <p>Don't dismiss chain restaurants – many offer excellent value. Yoshinoya (beef bowls), Ichiran (ramen), and Tenya (tempura) provide quality meals for under ¥1,000.</p>

        <h3>Lunch Sets (Teishoku)</h3>
        <p>Many restaurants offer lunch sets that include rice, miso soup, pickles, and a main dish for ¥500-1,000. This is often the same quality as dinner at half the price.</p>

        <h3>Standing Bars and Food Stalls</h3>
        <p>Tachinomi (standing bars) and yatai (food stalls) offer authentic experiences at low prices. You'll interact with locals and enjoy traditional food and drinks.</p>

        <h3>Supermarket Shopping</h3>
        <p>Buy groceries and prepare simple meals. Many accommodations have shared kitchens. Shop late evening for discounted bento boxes and prepared foods.</p>

        <h2>Free and Low-Cost Attractions</h2>

        <h3>Temples and Shrines</h3>
        <p>Most temples and shrines are free to explore. Famous exceptions like Kinkaku-ji charge modest entrance fees (usually ¥300-600).</p>

        <h3>Parks and Gardens</h3>
        <p>Japan's parks are meticulously maintained and often free. Ueno Park in Tokyo, Nara Park (where deer roam freely), and Osaka Castle Park offer beautiful experiences without cost.</p>

        <h3>Free Museum Days</h3>
        <p>Many museums offer free admission days. Tokyo National Museum is free on International Museum Day, and many museums have free admission for students.</p>

        <h3>Walking Tours</h3>
        <p>Many cities offer free walking tours led by volunteers. These provide excellent cultural insights and help you navigate the city.</p>

        <h3>Festivals (Matsuri)</h3>
        <p>If your visit coincides with local festivals, you'll experience Japanese culture at its most vibrant – completely free.</p>

        <h2>Smart Shopping Strategies</h2>

        <h3>100 Yen Shops</h3>
        <p>These stores (like Daiso) offer incredible value for daily necessities, snacks, and even souvenirs. Everything costs ¥100 plus tax.</p>

        <h3>Don Quijote</h3>
        <p>This discount chain store offers everything from snacks to electronics at competitive prices, often open 24 hours.</p>

        <h3>Tax-Free Shopping</h3>
        <p>Foreign tourists can shop tax-free at many stores. Look for "Tax-Free" signs and bring your passport.</p>

        <h2>Technology and Connectivity</h2>

        <h3>Free Wi-Fi</h3>
        <p>Japan has extensive free Wi-Fi coverage. Register for services like "Japan Connected-free Wi-Fi" before arrival for easy access.</p>

        <h3>IC Cards</h3>
        <p>Get a rechargeable IC card (like Suica or Pasmo) for convenient train travel and purchases at convenience stores and vending machines.</p>

        <h2>Seasonal Budget Tips</h2>

        <h3>Off-Peak Travel</h3>
        <p>Avoid Golden Week (late April-early May), Obon (mid-August), and New Year holidays when prices surge and crowds peak.</p>

        <h3>Shoulder Seasons</h3>
        <p>Late autumn and early spring offer great weather, fewer crowds, and lower prices than peak cherry blossom or fall foliage seasons.</p>

        <h2>Cultural Experiences on a Budget</h2>

        <h3>Public Baths (Sento)</h3>
        <p>Experience traditional Japanese bathing culture at public baths for around ¥500. It's a authentic cultural experience at a fraction of the cost of fancy onsen resorts.</p>

        <h3>Karaoke</h3>
        <p>Karaoke is cheaper during daytime hours. Many places offer all-you-can-drink packages that provide good value for groups.</p>

        <h3>Traditional Markets</h3>
        <p>Visit morning markets like Tsukiji Outer Market in Tokyo or Nishiki Market in Kyoto for fresh, affordable food and cultural experiences.</p>

        <h2>Budget Planning Template</h2>
        <p>Daily budget breakdown for budget travelers:</p>
        <ul>
          <li>Accommodation: ¥2,000-4,000</li>
          <li>Food: ¥2,000-3,000</li>
          <li>Transportation: ¥1,000-2,000</li>
          <li>Activities: ¥1,000-2,000</li>
          <li>Total: ¥6,000-11,000 per day (roughly $45-80 USD)</li>
        </ul>

        <p>With these strategies, you can experience Japan's incredible culture, food, and hospitality without the legendary price tag. The key is embracing local customs and looking beyond tourist-focused establishments to discover authentic Japan at local prices.</p>
      `,
      tags: ["Japan", "Budget Travel", "Travel Tips", "Backpacking", "Asia"],
      relatedPosts: ["paris-hidden-gems", "italy-food-tour", "backpacking-europe"]
    },
    "adventure-turkey": {
      title: "Adventure Activities in Cappadocia",
      excerpt: "Hot air ballooning, cave exploring, and hiking through fairy chimneys - Cappadocia is an adventurer's paradise.",
      author: "Mehmet Özkan",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Adventure Travel",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      content: `
        <p>Cappadocia, located in central Turkey, is a landscape that seems almost otherworldly. With its unique geological formations, ancient underground cities, and rich history, it offers some of the most extraordinary adventure experiences on Earth.</p>

        <h2>Hot Air Ballooning: The Ultimate Cappadocia Experience</h2>
        <p>No visit to Cappadocia is complete without experiencing its famous hot air balloon rides. As the sun rises over the fairy chimneys and valleys, hundreds of colorful balloons fill the sky, creating one of the world's most magical travel experiences.</p>

        <h3>Best Time to Fly</h3>
        <p>Flights operate year-round, weather permitting. Summer offers clear skies and warm weather, while winter provides a mystical atmosphere with occasional snow-covered landscapes. Book in advance, especially during peak season (April-October).</p>

        <h3>What to Expect</h3>
        <p>Most flights last 60-90 minutes, departing before sunrise. You'll float over the Göreme Valley, Rose Valley, and Pigeon Valley, seeing cave churches, underground cities, and unique rock formations from a bird's eye view.</p>

        <h3>Choosing a Company</h3>
        <p>Select reputable companies with experienced pilots and good safety records. Prices vary, but expect to pay €150-250 for standard flights. Deluxe options with smaller baskets and champagne service cost more but offer a more intimate experience.</p>

        <h2>Exploring Underground Cities</h2>
        <p>Cappadocia is home to numerous underground cities, carved by ancient civilizations as protection from invaders. These multi-level complexes are engineering marvels that housed thousands of people.</p>

        <h3>Derinkuyu Underground City</h3>
        <p>The largest and deepest underground city, extending 18 levels below ground. It could house up to 20,000 people and includes ventilation systems, wine cellars, chapels, and stables. The narrow passages and low ceilings create an adventurous exploration experience.</p>

        <h3>Kaymaklı Underground City</h3>
        <p>More accessible than Derinkuyu with wider tunnels, making it ideal for those with claustrophobia concerns. It features eight levels and showcases sophisticated ventilation and defense systems.</p>

        <h3>Exploration Tips</h3>
        <p>Wear comfortable shoes with good grip, bring a flashlight for better visibility, and be prepared for tight spaces. If you're claustrophobic, visit during off-peak hours when crowds are smaller.</p>

        <h2>Hiking Adventures</h2>
        <p>Cappadocia's valleys offer incredible hiking opportunities through surreal landscapes of rock formations, ancient cave churches, and hidden villages.</p>

        <h3>Rose Valley (Güllüdere Vadisi)</h3>
        <p>Famous for its pink-hued rock formations that glow magnificently at sunset. The hike takes 2-3 hours and includes visits to several cave churches with preserved frescoes. The trail is well-marked and suitable for most fitness levels.</p>

        <h3>Ihlara Valley</h3>
        <p>A 14-kilometer canyon with a river running through it, offering a green oasis in Cappadocia's arid landscape. The full hike takes 4-5 hours, but you can explore shorter sections. The valley contains over 100 cave churches and offers cooler temperatures in summer.</p>

        <h3>Red Valley</h3>
        <p>Perfect for sunset hikes, this valley offers spectacular views and relatively easy walking paths. The red sandstone formations create a Mars-like landscape that's particularly stunning in late afternoon light.</p>

        <h3>Pigeon Valley</h3>
        <p>Named for the numerous pigeon houses carved into the rock face, this valley connects Göreme to Uçhisar. It's an easy 2-hour walk with beautiful views of Uçhisar Castle and fairy chimneys.</p>

        <h2>Rock Climbing and Via Ferrata</h2>
        <p>Cappadocia's unique rock formations provide excellent opportunities for climbing enthusiasts of all levels.</p>

        <h3>Traditional Rock Climbing</h3>
        <p>The volcanic tuff rock offers unique climbing experiences. Popular areas include Göreme Valley and Ortahisar. Local guides can provide equipment and instruction for beginners.</p>

        <h3>Via Ferrata</h3>
        <p>For those wanting climbing excitement with added safety, via ferrata routes combine hiking and climbing with fixed cables and ladders. It's perfect for beginners or those afraid of heights who want to push their boundaries.</p>

        <h2>Horseback Riding</h2>
        <p>Cappadocia's name means "Land of Beautiful Horses," making horseback riding a historically appropriate adventure. Several ranches offer guided rides through valleys and fairy chimney formations.</p>

        <h3>Sunset Rides</h3>
        <p>Evening rides offer cooler temperatures and spectacular lighting. Most tours last 2-3 hours and cater to all experience levels.</p>

        <h3>Multi-Day Expeditions</h3>
        <p>For experienced riders, multi-day camping expeditions explore remote areas of Cappadocia rarely visited by tourists.</p>

        <h2>ATV and Quad Bike Adventures</h2>
        <p>ATV tours provide an adrenaline-filled way to explore Cappadocia's rugged terrain and reach areas inaccessible on foot.</p>

        <h3>Valley Tours</h3>
        <p>Most ATV tours visit multiple valleys in 2-4 hours, including stops at viewpoints and cave churches. Sunset tours are particularly popular for their dramatic lighting.</p>

        <h3>Safety Considerations</h3>
        <p>Always wear provided safety gear, follow guides closely, and inform operators of any medical conditions. The terrain can be challenging, so basic physical fitness is recommended.</p>

        <h2>Photography Adventures</h2>
        <p>Cappadocia is a photographer's paradise offering endless opportunities for stunning shots.</p>

        <h3>Sunrise and Sunset</h3>
        <p>The golden hour provides magical lighting for the rock formations. Popular sunrise spots include Göreme Panorama and Uçhisar Castle. For sunset, head to Rose Valley or Red Valley.</p>

        <h3>Night Photography</h3>
        <p>Clear skies make Cappadocia excellent for astrophotography. The fairy chimneys create interesting foreground subjects against starry skies.</p>

        <h2>Practical Adventure Tips</h2>

        <h3>Best Time to Visit</h3>
        <p>Spring (April-May) and fall (September-October) offer ideal weather for outdoor activities. Summer can be very hot for hiking, while winter may limit some activities due to weather.</p>

        <h3>What to Pack</h3>
        <p>Comfortable hiking shoes, layered clothing, sun protection, headlamp or flashlight, and a good camera. Weather can change quickly, so be prepared for temperature variations.</p>

        <h3>Staying Safe</h3>
        <p>Always inform someone of your plans when hiking alone, carry sufficient water, and respect restricted areas around historical sites. Some cave churches require special permission to visit.</p>

        <h3>Local Guides</h3>
        <p>Consider hiring local guides for underground cities and hiking trails. They provide valuable historical context and ensure you don't miss hidden gems.</p>

        <p>Cappadocia offers adventures that combine natural beauty, historical significance, and unique geological wonders. Whether you're seeking adrenaline-pumping activities or peaceful exploration, this magical region delivers experiences you'll treasure forever.</p>
      `,
      tags: ["Turkey", "Cappadocia", "Adventure Travel", "Hot Air Balloon", "Hiking"],
      relatedPosts: ["italy-food-tour", "japan-budget-travel", "backpacking-europe"]
    }
  };

  const currentPost = blogPosts[blogId as keyof typeof blogPosts];

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = currentPost.relatedPosts.map(id => ({
    id,
    ...blogPosts[id as keyof typeof blogPosts]
  }));

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="py-4 bg-muted/20">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground">{currentPost.title}</span>
            </nav>
          </div>
        </section>

        {/* Hero Image & Title */}
        <section className="relative">
          <div 
            className="h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentPost.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <Badge className="mb-4 bg-accent text-accent-foreground">
                  {currentPost.category}
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
                  {currentPost.title}
                </h1>
                <div className="flex items-center space-x-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{currentPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{currentPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Ad Space */}
              <AdSenseSlot adSlot="1234567890" className="bg-muted/20 rounded-lg p-4" />
              
              {/* Author Info */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{currentPost.author}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Travel Writer & Photographer</p>
                  <Button variant="outline" size="sm">Follow</Button>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share This Post
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Pinterest
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdSenseSlot adSlot="0987654321" className="bg-muted/20 rounded-lg p-4" />
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9">
              <div className="max-w-4xl">
                {/* Excerpt */}
                <div className="bg-muted/20 rounded-lg p-6 mb-8">
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    {currentPost.excerpt}
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                    className="space-y-6 text-foreground [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>li]:mb-2"
                  />
                </div>

                {/* Ad Space */}
                <div className="my-12">
                  <AdSenseSlot 
                    adSlot="5555555555" 
                    adFormat="fluid"
                    className="bg-muted/20 rounded-lg p-6"
                    style={{ minHeight: '200px' }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                  {currentPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
                  <Link to="/blog" className="flex items-center text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Link>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read More Posts
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Ad Space */}
          <div className="my-12">
            <AdSenseSlot 
              adSlot="7777777777" 
              adFormat="horizontal"
              className="bg-muted/20 rounded-lg p-6"
              style={{ minHeight: '200px' }}
            />
          </div>

          {/* Related Posts */}
          <section className="mt-16">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-0 h-full">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${post.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge 
                          variant="secondary"
                          className="absolute top-4 right-4 bg-white/90 text-foreground"
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;