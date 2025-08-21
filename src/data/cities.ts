export interface CityDetail extends City {
  overview: string;
  attractions: string[];
  tips: string[];
  blogs: BlogReference[];
  bestTime: string;
  population?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface City {
  id: string;
  name: string;
  description: string;
  image: string;
  country: string;
}

interface BlogReference {
  id: string;
  title: string;
  date: string;
}

export const cityDetails: Record<string, CityDetail> = {
  paris: {
    id: "paris",
    name: "Paris",
    description: "The City of Light",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=600&fit=crop",
    country: "france",
    overview: "Paris, the capital of France, is globally renowned for its art, fashion, gastronomy, and culture. The city's 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques.",
    bestTime: "April to June, September to October",
    population: "2.2 million",
    attractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral", 
      "Arc de Triomphe",
      "Champs-Élysées",
      "Sacré-Cœur Basilica",
      "Seine River Cruise",
      "Latin Quarter",
      "Montmartre District",
      "Palace of Versailles (day trip)"
    ],
    tips: [
      "Learn basic French phrases - locals appreciate the effort",
      "Always validate your metro tickets to avoid fines",
      "Book restaurant reservations in advance, especially for dinner",
      "Many museums are free on the first Sunday of each month",
      "Avoid tourist traps near major landmarks - explore local neighborhoods",
      "Tipping is not mandatory but 10% is appreciated for good service"
    ],
    blogs: [
      { id: "paris-hidden-gems", title: "10 Hidden Gems in Paris You've Never Heard Of", date: "2024-01-15" },
      { id: "paris-food-guide", title: "Ultimate Parisian Food Experience", date: "2024-01-12" },
      { id: "paris-museums", title: "Beyond the Louvre: Paris' Best Museums", date: "2024-01-08" }
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  tokyo: {
    id: "tokyo",
    name: "Tokyo",
    description: "Ultra-modern metropolis",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop",
    country: "japan",
    overview: "Tokyo, Japan's bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.",
    bestTime: "March to May, September to November",
    population: "37 million (metropolitan area)",
    attractions: [
      "Senso-ji Temple",
      "Tokyo Skytree",
      "Shibuya Crossing",
      "Meiji Shrine",
      "Tsukiji Outer Market",
      "Imperial Palace",
      "Ginza District",
      "Harajuku",
      "Akihabara Electric Town",
      "Tokyo Disneyland"
    ],
    tips: [
      "Get a JR Pass for unlimited travel on JR trains",
      "Bow slightly when greeting people - it shows respect",
      "Remove shoes when entering homes and some restaurants",
      "Cash is still king - many places don't accept cards",
      "Don't eat or drink while walking",
      "Learn to use chopsticks properly"
    ],
    blogs: [
      { id: "tokyo-neighborhoods", title: "Best Neighborhoods to Explore in Tokyo", date: "2024-01-14" },
      { id: "tokyo-food-guide", title: "Tokyo Food Scene: From Street Food to Michelin Stars", date: "2024-01-10" },
      { id: "tokyo-temples", title: "Sacred Spaces: Tokyo's Most Beautiful Temples", date: "2024-01-06" }
    ],
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  rome: {
    id: "rome",
    name: "Rome",
    description: "The Eternal City",
    image: "https://images.unsplash.com/photo-1552832230-c0197f6f8f95?w=1200&h=600&fit=crop",
    country: "italy",
    overview: "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.",
    bestTime: "April to June, September to October",
    population: "2.8 million",
    attractions: [
      "Colosseum",
      "Roman Forum",
      "Vatican City",
      "Sistine Chapel",
      "Trevi Fountain",
      "Pantheon",
      "Spanish Steps",
      "Palatine Hill",
      "Villa Borghese",
      "Trastevere District"
    ],
    tips: [
      "Book skip-the-line tickets for major attractions in advance",
      "Dress modestly when visiting churches and Vatican",
      "Avoid restaurants with tourist menus near attractions",
      "Many churches close for lunch (12:30-3:30 PM)",
      "Throw a coin in Trevi Fountain to ensure your return to Rome",
      "Walk on ancient Roman roads - they're everywhere!"
    ],
    blogs: [
      { id: "rome-ancient-wonders", title: "Ancient Wonders of Rome: A Historical Journey", date: "2024-01-13" },
      { id: "vatican-guide", title: "Complete Guide to Vatican City", date: "2024-01-09" },
      { id: "rome-food-tour", title: "Eating Like a Roman: Food Tour Guide", date: "2024-01-05" }
    ],
    coordinates: { lat: 41.9028, lng: 12.4964 }
  },
  new_york: {
    id: "new-york",
    name: "New York",
    description: "The Big Apple",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=600&fit=crop",
    country: "usa",
    overview: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
    bestTime: "April to June, September to November",
    population: "8.3 million",
    attractions: [
      "Statue of Liberty",
      "Empire State Building",
      "Central Park",
      "Times Square",
      "Brooklyn Bridge",
      "9/11 Memorial",
      "High Line Park",
      "Metropolitan Museum",
      "Broadway Shows",
      "One World Observatory"
    ],
    tips: [
      "Buy a MetroCard for easy subway travel",
      "Tip 18-20% at restaurants and bars",
      "Walk fast - New Yorkers are always in a hurry",
      "Book Broadway shows in advance",
      "Don't drive - use public transportation or walk",
      "Try authentic ethnic food in various neighborhoods"
    ],
    blogs: [
      { id: "nyc-neighborhoods", title: "Best NYC Neighborhoods to Explore", date: "2024-01-16" },
      { id: "nyc-food-scene", title: "New York's Incredible Food Scene", date: "2024-01-11" },
      { id: "broadway-guide", title: "Ultimate Guide to Broadway Shows", date: "2024-01-07" }
    ],
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  lahore: {
    id: "lahore",
    name: "Lahore",
    description: "Cultural capital of Pakistan",
    image: "https://images.unsplash.com/photo-1589233160947-5c97bf9ac8c8?w=1200&h=600&fit=crop",
    country: "pakistan",
    overview: "Lahore is the cultural capital of Pakistan and the second-largest city. Known for its rich history, Mughal architecture, vibrant food scene, and warm hospitality. The city is often called the 'Heart of Pakistan'.",
    bestTime: "October to March",
    population: "11 million",
    attractions: [
      "Badshahi Mosque",
      "Lahore Fort",
      "Shalimar Gardens",
      "Wazir Khan Mosque",
      "Anarkali Bazaar",
      "Food Street",
      "Pakistan Monument",
      "Lahore Museum",
      "Data Darbar",
      "Liberty Market"
    ],
    tips: [
      "Try the famous Lahori food - it's incredible",
      "Dress modestly, especially when visiting religious sites",
      "Bargain in local markets - it's expected",
      "Visit during winter months to avoid extreme heat",
      "Learn basic Urdu phrases - locals love it",
      "Always carry cash - many places don't accept cards"
    ],
    blogs: [
      { id: "lahore-food-guide", title: "Lahore Food Street: A Culinary Adventure", date: "2024-01-15" },
      { id: "lahore-history", title: "Historical Lahore: Mughal Architecture Guide", date: "2024-01-10" },
      { id: "lahore-culture", title: "Experiencing Lahore's Rich Culture", date: "2024-01-05" }
    ],
    coordinates: { lat: 31.5204, lng: 74.3587 }
  },
  istanbul: {
    id: "istanbul",
    name: "Istanbul",
    description: "Where Europe meets Asia",
    image: "https://images.unsplash.com/photo-1524231757912-21b2faee7707?w=1200&h=600&fit=crop",
    country: "turkey",
    overview: "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
    bestTime: "April to May, September to October",
    population: "15 million",
    attractions: [
      "Hagia Sophia",
      "Blue Mosque",
      "Topkapi Palace",
      "Grand Bazaar",
      "Galata Tower",
      "Bosphorus Bridge",
      "Basilica Cistern",
      "Dolmabahce Palace",
      "Spice Bazaar",
      "Maiden's Tower"
    ],
    tips: [
      "Haggle in the Grand Bazaar - it's part of the experience",
      "Remove shoes when entering mosques",
      "Try Turkish breakfast - it's amazing",
      "Take a Bosphorus cruise to see the city from water",
      "Learn a few Turkish phrases - locals appreciate it",
      "Be prepared for crowds at popular tourist sites"
    ],
    blogs: [
      { id: "istanbul-guide", title: "Complete Guide to Istanbul: East Meets West", date: "2024-01-12" },
      { id: "istanbul-food", title: "Istanbul's Culinary Delights", date: "2024-01-08" },
      { id: "bosphorus-cruise", title: "Best Bosphorus Cruise Experience", date: "2024-01-04" }
    ],
    coordinates: { lat: 41.0082, lng: 28.9784 }
  }
};

export const getCityById = (id: string): CityDetail | undefined => {
  return cityDetails[id];
};