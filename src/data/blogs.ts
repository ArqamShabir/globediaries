export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  relatedPosts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "paris-hidden-gems",
    title: "10 Hidden Gems in Paris You've Never Heard Of",
    excerpt: "Discover the secret side of Paris beyond the tourist trails. From hidden courtyards to underground wine bars, these spots will make you fall in love with the city all over again.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "City Guides",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
    featured: true,
    tags: ["Paris", "Hidden Gems", "Local Experience", "France"],
    content: `
# 10 Hidden Gems in Paris You've Never Heard Of

Paris is undoubtedly one of the world's most visited cities, but beyond the iconic landmarks lies a treasure trove of hidden gems waiting to be discovered. These secret spots offer authentic Parisian experiences away from the crowds.

## 1. Passage des Panoramas

This historic covered passage from 1800 is one of Paris's best-kept secrets. Located in the 2nd arrondissement, it houses vintage boutiques, cozy cafés, and traditional restaurants that locals frequent.

## 2. Musée de la Chasse et de la Nature

A quirky museum in the Marais district that combines art with nature in unexpected ways. The museum's eclectic collection includes taxidermy, contemporary art, and historical artifacts.

## 3. Promenade Plantée

Long before New York's High Line, Paris had the Promenade Plantée - an elevated park built on former railway tracks. This 4.7-kilometer green walkway offers stunning views and peaceful gardens.

## 4. Rue Crémieux

This cobblestone street in the 12th arrondissement is lined with pastel-colored houses that look straight out of a fairy tale. It's one of the most photogenic spots in Paris.

## 5. La Recyclerie

A unique café-restaurant built in a former railway station. This eco-friendly space combines dining with urban farming and hosts various cultural events.

## 6. Bibliothèque Mazarine

One of France's oldest public libraries, dating back to 1643. The reading room is absolutely stunning with its baroque architecture and peaceful atmosphere.

## 7. Square du Vert-Galant

A tiny triangular park at the tip of Île de la Cité. It's the perfect spot for a romantic picnic with views of the Seine and Pont Neuf.

## 8. Musée des Arts Forains

Step into a magical world of vintage fairground attractions. This private museum can only be visited by guided tour, making it truly special.

## 9. Jardin Anne Frank

A hidden garden tucked behind buildings in the Marais. This peaceful memorial garden offers a moment of reflection in the bustling city.

## 10. Le Comptoir Général

Hidden in a courtyard in the 10th arrondissement, this eclectic bar feels like stepping into a different world with its tropical décor and vintage artifacts.

These hidden gems showcase Paris's diversity and charm beyond the typical tourist circuit. Each offers a unique glimpse into the city's rich culture and history.
    `,
    relatedPosts: ["french-cuisine-guide", "paris-food-guide", "paris-museums"]
  },
  {
    id: "italy-food-tour",
    title: "The Ultimate Food Lover's Guide to Italy",
    excerpt: "From authentic pasta in Bologna to gelato in Florence, embark on a culinary journey through Italy's most delicious regions.",
    author: "Marco Rossini",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Food & Culture",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",
    featured: false,
    tags: ["Italy", "Food", "Culinary Travel", "Gastronomy"],
    content: `
# The Ultimate Food Lover's Guide to Italy

Italy's culinary landscape is as diverse as its regions, each offering unique flavors, traditions, and specialties that have been perfected over centuries. This guide will take you on a gastronomic journey through the boot-shaped peninsula.

## Northern Italy: Rich and Creamy

### Lombardy - Milan
- **Risotto alla Milanese**: Creamy saffron risotto
- **Cotoletta alla Milanese**: Breaded veal cutlet
- **Panettone**: Traditional Christmas cake

### Emilia-Romagna - Bologna
Home to some of Italy's most famous foods:
- **Tagliatelle al Ragù**: The original Bolognese sauce
- **Tortellini**: Hand-folded pasta parcels
- **Parmigiano Reggiano**: The king of cheeses

## Central Italy: Simple Perfection

### Tuscany - Florence
- **Bistecca alla Fiorentina**: Massive T-bone steak
- **Ribollita**: Hearty vegetable soup
- **Gelato**: Florence claims to have invented it

### Lazio - Rome
- **Carbonara**: Eggs, cheese, pancetta, and pepper
- **Cacio e Pepe**: Cheese and pepper pasta
- **Supplì**: Fried rice balls with mozzarella

## Southern Italy: Bold and Bright

### Campania - Naples
The birthplace of pizza:
- **Pizza Margherita**: Tomato, mozzarella, basil
- **Sfogliatelle**: Flaky pastry with ricotta
- **Limoncello**: Lemon liqueur

### Sicily
- **Arancini**: Stuffed rice balls
- **Cannoli**: Crispy shells with ricotta cream
- **Granita**: Sicilian slush with fresh fruit

## Food Markets to Visit

1. **Mercato Centrale (Florence)**: Gourmet food hall
2. **Quadrilatero (Bologna)**: Historic food market
3. **Testaccio Market (Rome)**: Local Roman experience
4. **La Pescheria (Catania)**: Famous fish market

## Essential Food Experiences

- Take a pasta-making class in Bologna
- Join a truffle hunt in Umbria
- Visit a Parmigiano Reggiano factory
- Experience aperitivo culture in Milan
- Go wine tasting in Tuscany

Italy's food culture is about more than just eating - it's about family, tradition, and taking time to savor life's pleasures.
    `,
    relatedPosts: ["rome-ancient-wonders", "tuscan-countryside", "italian-wine-regions"]
  },
  {
    id: "japan-budget-travel",
    title: "How to Experience Japan on a Budget",
    excerpt: "Think Japan is expensive? Think again! Learn how to explore the Land of the Rising Sun without breaking the bank.",
    author: "Yuki Tanaka",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    featured: false,
    tags: ["Japan", "Budget Travel", "Money Saving", "Tips"],
    content: `
# How to Experience Japan on a Budget

Japan has a reputation for being expensive, but with smart planning and local knowledge, you can explore this incredible country without breaking the bank.

## Transportation Savings

### JR Pass Strategy
- Buy a 7-day JR Pass for ¥29,650 (about $270)
- Pays for itself with one Tokyo-Kyoto round trip
- Includes local JR trains in major cities

### Alternative Transport
- **Highway buses**: Much cheaper than trains for long distances
- **Local trains**: Use non-JR lines for city travel
- **Cycling**: Rent bikes in most cities (¥500-1000/day)

## Accommodation Hacks

### Budget Options
- **Hostels**: ¥2,000-4,000 per night
- **Capsule hotels**: ¥3,000-5,000 per night
- **Manga cafes**: ¥1,500-2,500 per night (emergency option)
- **Ryokans**: Some budget options under ¥6,000

### Money-Saving Tips
- Book accommodations outside city centers
- Look for hotels near train stations
- Consider longer stays for discounts

## Food on a Budget

### Cheap Eats (Under ¥1,000)
- **Conveyor belt sushi**: ¥100-300 per plate
- **Ramen shops**: ¥500-800 per bowl
- **Convenience stores**: Amazing quality, very cheap
- **Standing bars**: Drinks and snacks from ¥300

### Lunch Specials
Many restaurants offer lunch sets (teishoku) for ¥500-1,000

## Free Activities

### Tokyo
- Senso-ji Temple visits
- Meiji Shrine exploration
- Imperial Palace East Gardens
- Tsukiji Outer Market wandering

### Kyoto
- Fushimi Inari Shrine hike
- Philosopher's Path walk
- Bamboo Grove in Arashiyama
- Temple hopping in Higashiyama

## Shopping Smart

### Where to Save
- **100-yen shops**: Japanese dollar stores
- **Don Quijote**: Discount chain store
- **Outlet malls**: Designer goods at lower prices
- **Tax-free shopping**: Get 8% back on purchases over ¥5,000

## Sample Daily Budgets

### Ultra Budget: ¥3,000-5,000 ($27-45)
- Hostel: ¥2,500
- Food: ¥1,500
- Transport: ¥1,000

### Comfortable Budget: ¥8,000-12,000 ($72-108)
- Nice hotel: ¥6,000
- Food: ¥3,000
- Transport: ¥2,000
- Activities: ¥1,000

## Money-Saving Apps
- **Hyperdia**: Find cheapest train routes
- **Tabelog**: Restaurant reviews and prices
- **Google Translate**: Camera feature for menus

With these tips, you can experience Japan's incredible culture, food, and hospitality without the hefty price tag!
    `,
    relatedPosts: ["tokyo-neighborhoods", "cherry-blossom-guide", "japanese-cuisine"]
  },
  {
    id: "adventure-turkey",
    title: "Adventure Activities in Cappadocia",
    excerpt: "Hot air ballooning, cave exploring, and hiking through fairy chimneys - Cappadocia is an adventurer's paradise.",
    author: "Mehmet Özkan",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Adventure Travel",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    featured: true,
    tags: ["Turkey", "Adventure", "Cappadocia", "Hot Air Balloon"],
    content: `
# Adventure Activities in Cappadocia

Cappadocia's otherworldly landscape of fairy chimneys, cave churches, and volcanic valleys makes it one of the world's premier adventure destinations.

## Hot Air Ballooning

### The Main Event
- **Best time**: Sunrise flights for optimal weather
- **Season**: April to November
- **Duration**: 60-90 minutes
- **Cost**: $150-300 per person

### What to Expect
Floating over the fairy chimneys as the sun rises is truly magical. You'll see the landscape from a unique perspective while sharing the sky with dozens of other colorful balloons.

## Underground Cities

### Derinkuyu Underground City
- 18 levels deep (8 open to public)
- Could house 20,000 people
- Built in 8th-7th centuries BC

### Kaymaklı Underground City
- 8 levels connected by tunnels
- Ventilation shafts still functional
- Wine cellars and storage rooms

## Hiking Adventures

### Red Valley Trail
- **Difficulty**: Moderate
- **Duration**: 2-3 hours
- **Highlights**: Rock churches, fairy chimneys
- **Best time**: Sunset for amazing colors

### Ihlara Valley
- **Distance**: 14 km gorge
- **Duration**: Full day
- **Features**: River walk, Byzantine frescoes
- **Churches**: 100+ rock-cut churches

## ATV Tours

### Valley Exploration
- Access remote valleys
- Perfect for photography
- Suitable for beginners
- 2-4 hour tours available

### Popular Routes
- Sword Valley
- Love Valley
- Devrent Valley (Imagination Valley)

## Rock Climbing

### Unique Features
- Volcanic tuff rock formations
- Routes for all skill levels
- Multi-pitch climbs available
- Professional guides recommended

## Horseback Riding

### Historical Connection
Cappadocia's name comes from "Katpatuka" meaning "Land of Beautiful Horses"

### Popular Trails
- Rose Valley at sunset
- Red Valley exploration
- Village-to-village rides

## Photography Tours

### Best Spots
- Göreme Panorama
- Uçhisar Castle
- Pigeon Valley
- Love Valley

### Golden Hours
- Sunrise: 6:00-8:00 AM
- Sunset: 6:00-8:00 PM
- Blue hour for fairy chimney silhouettes

## Practical Tips

### Getting Around
- Rent a car for maximum flexibility
- Book tours through reputable companies
- Stay in Göreme for central location

### What to Pack
- Comfortable hiking shoes
- Layers for temperature changes
- Camera with extra batteries
- Headlamp for underground cities

Cappadocia offers adventures that you simply can't experience anywhere else on Earth!
    `,
    relatedPosts: ["istanbul-guide", "turkish-cuisine", "pamukkale-guide"]
  },
  {
    id: "luxury-maldives",
    title: "Ultimate Luxury Experience in the Maldives",
    excerpt: "Discover overwater villas, private islands, and world-class spas in this tropical paradise.",
    author: "Isabella Martinez",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Luxury Travel",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    featured: false,
    tags: ["Maldives", "Luxury", "Overwater Villas", "Spa"],
    content: `
# Ultimate Luxury Experience in the Maldives

The Maldives represents the pinnacle of tropical luxury, where crystal-clear lagoons meet pristine white sand beaches and overwater villas offer unparalleled privacy and comfort.

## Top Luxury Resorts

### Soneva Fushi
- **Location**: Baa Atoll UNESCO Biosphere Reserve
- **Highlight**: Largest overwater villas in the world
- **Unique**: Observatory with resident astronomer
- **Price**: $2,000+ per night

### Conrad Maldives Rangali Island
- **Famous for**: Underwater restaurant Ithaa
- **Features**: Two islands connected by bridge
- **Accommodation**: Overwater and beach villas
- **Experience**: Whale shark encounters

### One&Only Reethi Rah
- **Setting**: Private island with 12 beaches
- **Villas**: Up to 4 bedrooms with private pools
- **Activities**: World-class spa and water sports
- **Dining**: Multiple gourmet restaurants

## Overwater Villa Experience

### What to Expect
- Direct lagoon access from your bedroom
- Glass floor panels for fish watching
- Private butler service
- Outdoor shower and bathtub
- Infinity pools with ocean views

### Best Features
- **Sunrise villas**: Wake up to spectacular sunrises
- **Sunset villas**: Perfect for romantic evenings
- **Water slides**: Direct access to lagoon
- **Private decks**: Ultimate privacy

## Exclusive Experiences

### Private Island Dining
- Sandbank picnics prepared by resort chefs
- Candlelit dinners on secluded beaches
- Personal chef experiences
- Underwater dining at select resorts

### Yacht Charters
- Traditional dhoni boat trips
- Luxury yacht day cruises
- Sunset dolphin watching
- Big game fishing excursions

### Spa Treatments
- **Underwater spa treatments**: At Huvafen Fushi
- **Overwater spa pavilions**: Massage with ocean views
- **Ayurvedic treatments**: Traditional healing practices
- **Couples' treatments**: Synchronized massages

## Water Activities

### World-Class Diving
- Manta ray encounters at Hanifaru Bay
- Whale shark swimming experiences
- Pristine coral reef exploration
- Night diving adventures

### Water Sports
- Jet skiing in crystal waters
- Parasailing with panoramic views
- Stand-up paddleboarding
- Catamaran sailing

## Culinary Excellence

### Michelin-Level Dining
- Resort restaurants by celebrity chefs
- Fresh seafood prepared multiple ways
- International cuisine with local influences
- Private beach BBQs

### Local Experiences
- Maldivian cooking classes
- Traditional fishing trips
- Local island cultural visits
- Sunset cocktails on traditional boats

## Best Time to Visit

### High Season (December - April)
- Dry season with minimal rainfall
- Perfect for water activities
- Higher prices but guaranteed weather

### Shoulder Season (May - July, October - November)
- Good weather with occasional rain
- Better prices
- Fewer crowds

## Getting There

### Seaplane Transfers
- Scenic 45-minute flights from Malé
- Bird's eye view of atolls
- Direct resort transfers
- Weather dependent

### Speedboat Transfers
- Faster option for nearby resorts
- Less weather dependent
- Can operate at night
- More affordable

## Planning Tips

### Booking Strategy
- Book 6-12 months in advance
- Consider all-inclusive packages
- Check cancellation policies
- Verify transfer arrangements

### What to Pack
- Reef-safe sunscreen
- Light, breathable clothing
- Underwater camera
- Formal wear for dinner

The Maldives offers a luxury experience unlike anywhere else, where every detail is designed for ultimate relaxation and indulgence.
    `,
    relatedPosts: ["luxury-travel-tips", "tropical-destinations", "spa-retreats"]
  },
  {
    id: "backpacking-europe",
    title: "Backpacking Europe: A Complete Guide",
    excerpt: "Everything you need to know for an epic European backpacking adventure, from route planning to budget tips.",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "15 min read",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    featured: false,
    tags: ["Europe", "Backpacking", "Budget Travel", "Hostels"],
    content: `
# Backpacking Europe: A Complete Guide

Backpacking through Europe is a rite of passage for many travelers. With its diverse cultures, historic cities, and excellent transport connections, Europe offers the perfect playground for budget-conscious adventurers.

## Planning Your Route

### Popular Routes

#### The Classic Route (4-6 weeks)
- London → Paris → Amsterdam → Berlin → Prague → Vienna → Budapest → Rome

#### Eastern Europe Adventure (3-4 weeks)
- Berlin → Prague → Krakow → Budapest → Belgrade → Sofia → Istanbul

#### Scandinavian Explorer (2-3 weeks)
- Copenhagen → Stockholm → Oslo → Helsinki

### Route Planning Tips
- Don't try to see everything
- Allow 2-3 days minimum per city
- Consider geographical proximity
- Check visa requirements

## Transportation

### Eurail Pass
- **Types**: Consecutive days or flexible
- **Duration**: 15 days to 3 months
- **Coverage**: 33 countries
- **Best for**: Long distances and multiple countries

### Budget Airlines
- **Ryanair**: Ultra-low cost, basic service
- **EasyJet**: Good European coverage
- **Wizz Air**: Eastern European specialist
- **Book early**: Prices increase closer to travel

### FlixBus
- Extensive European network
- Very budget-friendly
- Overnight routes save accommodation
- Free WiFi on most buses

## Accommodation

### Hostels
- **Dorm beds**: €10-30 per night
- **Private rooms**: €30-60 per night
- **Book through**: Hostelworld, Booking.com
- **Tips**: Read reviews, check location

### Alternative Options
- **Couchsurfing**: Free stays with locals
- **Work exchanges**: Workaway, Worldpackers
- **Camping**: Popular in Scandinavia
- **House sitting**: Free accommodation

## Budgeting

### Daily Budgets by Region

#### Western Europe (€40-60/day)
- Accommodation: €20-25
- Food: €15-20
- Transport: €5-10
- Activities: €5-10

#### Eastern Europe (€25-40/day)
- Accommodation: €10-15
- Food: €8-12
- Transport: €3-8
- Activities: €4-8

### Money-Saving Tips
- Cook your own meals
- Take advantage of free walking tours
- Visit free museums on designated days
- Travel during shoulder season

## Packing Essentials

### Backpack
- **Size**: 40-60 liters
- **Features**: Good harness system, rain cover
- **Weight**: Keep total weight under 20% of body weight

### Clothing
- 1 week's worth maximum
- Layers for varying climates
- One nice outfit for going out
- Comfortable walking shoes

### Electronics
- Universal adapter
- Portable charger
- Camera
- Phone with offline maps

## Safety Tips

### General Safety
- Keep copies of important documents
- Register with your embassy
- Share itinerary with family/friends
- Trust your instincts

### Money Safety
- Use multiple cards
- Don't carry all cash in one place
- Be aware of common scams
- Use ATMs inside banks when possible

## Cultural Etiquette

### Western Europe
- Tipping: 10-15% at restaurants
- Greeting: Handshake or cheek kisses
- Punctuality: Very important

### Eastern Europe
- More conservative dress codes
- Some areas still prefer cash
- Learning basic phrases appreciated

## Food Experiences

### Must-Try Dishes
- **France**: Croissants, coq au vin, cheese
- **Italy**: Pizza, pasta, gelato
- **Germany**: Currywurst, pretzels, beer
- **Czech Republic**: Goulash, beer, dumplings
- **Hungary**: Paprikash, langos, chimney cake

### Budget Eating
- Supermarket shopping
- Street food
- Lunch specials
- Happy hour deals

## Top Destinations for Backpackers

### Must-Visit Cities
1. **Prague**: Stunning architecture, cheap beer
2. **Budapest**: Thermal baths, ruin pubs
3. **Berlin**: History, nightlife, alternative culture
4. **Amsterdam**: Canals, museums, coffee shops
5. **Barcelona**: Beaches, architecture, tapas

### Hidden Gems
- **Ljubljana, Slovenia**: Charming capital
- **Tallinn, Estonia**: Medieval old town
- **Porto, Portugal**: Wine and river views
- **Bratislava, Slovakia**: Budget-friendly charm

## Seasonal Considerations

### Summer (June-August)
- **Pros**: Best weather, long days
- **Cons**: Crowds, high prices, heat

### Shoulder Season (April-May, September-October)
- **Pros**: Good weather, fewer crowds, moderate prices
- **Cons**: Some seasonal closures

### Winter (November-March)
- **Pros**: Low prices, Christmas markets
- **Cons**: Cold weather, short days, some closures

Europe's diversity means every backpacker can create their own unique adventure, whether seeking history, nightlife, culture, or natural beauty.
    `,
    relatedPosts: ["budget-travel-tips", "european-cities", "hostel-guide"]
  }
];

export const getBlogById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getFeaturedBlogs = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getBlogsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRelatedBlogs = (blogId: string): BlogPost[] => {
  const blog = getBlogById(blogId);
  if (!blog || !blog.relatedPosts) return [];
  
  return blog.relatedPosts
    .map(id => getBlogById(id))
    .filter(Boolean) as BlogPost[];
};