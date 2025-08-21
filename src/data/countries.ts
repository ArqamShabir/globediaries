export interface Country {
  id: string;
  name: string;
  description: string;
  overview: string;
  image: string;
  capital: string;
  population: string;
  language: string;
  currency: string;
  bestTime: string;
  cities: City[];
  attractions: string[];
  blogs: BlogReference[];
}

export interface City {
  id: string;
  name: string;
  description: string;
  image: string;
  country: string;
  overview?: string;
  attractions?: string[];
  tips?: string[];
}

export interface BlogReference {
  id: string;
  title: string;
  date: string;
}

export const countries: Country[] = [
  {
    id: "france",
    name: "France",
    description: "France, officially the French Republic, is a country located primarily in Western Europe. Known for its rich history, cultural heritage, exquisite cuisine, and iconic landmarks.",
    overview: "From the romantic streets of Paris to the sun-soaked beaches of the French Riviera, France offers an incredible diversity of experiences. The country is renowned for its art, architecture, cuisine, and wine, making it a cultural powerhouse that has influenced the world for centuries.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=600&fit=crop",
    capital: "Paris",
    population: "68 million",
    language: "French",
    currency: "Euro (EUR)",
    bestTime: "April to October",
    cities: [
      { 
        id: "paris", 
        name: "Paris", 
        description: "The City of Light", 
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
        country: "france" 
      },
      { 
        id: "nice", 
        name: "Nice", 
        description: "French Riviera gem", 
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d4b9d6?w=400&h=300&fit=crop",
        country: "france" 
      },
      { 
        id: "lyon", 
        name: "Lyon", 
        description: "Culinary capital", 
        image: "https://images.unsplash.com/photo-1524820197278-540916411e20?w=400&h=300&fit=crop",
        country: "france" 
      },
      { 
        id: "marseille", 
        name: "Marseille", 
        description: "Historic port city", 
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
        country: "france" 
      }
    ],
    attractions: [
      "Eiffel Tower",
      "Louvre Museum", 
      "Notre-Dame Cathedral",
      "Palace of Versailles",
      "Mont-Saint-Michel",
      "Château de Chambord"
    ],
    blogs: [
      { id: "paris-hidden-gems", title: "10 Hidden Gems in Paris", date: "2024-01-15" },
      { id: "provence-lavender", title: "Lavender Fields of Provence", date: "2024-01-10" },
      { id: "french-cuisine-guide", title: "A Guide to French Cuisine", date: "2024-01-05" }
    ]
  },
  {
    id: "italy",
    name: "Italy",
    description: "A country in Southern Europe known for its rich history, art, cuisine, and stunning landscapes from the Alps to the Mediterranean coast.",
    overview: "Italy is a treasure trove of art, history, and culinary delights. From the ancient ruins of Rome to the romantic canals of Venice, and the Renaissance art of Florence, Italy offers an unparalleled cultural experience.",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&h=600&fit=crop",
    capital: "Rome",
    population: "60 million",
    language: "Italian",
    currency: "Euro (EUR)",
    bestTime: "April to October",
    cities: [
      { 
        id: "rome", 
        name: "Rome", 
        description: "The Eternal City", 
        image: "https://images.unsplash.com/photo-1552832230-c0197f6f8f95?w=400&h=300&fit=crop",
        country: "italy" 
      },
      { 
        id: "venice", 
        name: "Venice", 
        description: "City of Canals", 
        image: "https://images.unsplash.com/photo-1534445538805-52f46d86ef60?w=400&h=300&fit=crop",
        country: "italy" 
      },
      { 
        id: "florence", 
        name: "Florence", 
        description: "Renaissance capital", 
        image: "https://images.unsplash.com/photo-1549770442-6b8a63e95b5e?w=400&h=300&fit=crop",
        country: "italy" 
      },
      { 
        id: "milan", 
        name: "Milan", 
        description: "Fashion capital", 
        image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=400&h=300&fit=crop",
        country: "italy" 
      }
    ],
    attractions: [
      "Colosseum",
      "Vatican City",
      "Leaning Tower of Pisa",
      "Trevi Fountain",
      "Amalfi Coast",
      "Sistine Chapel"
    ],
    blogs: [
      { id: "italy-food-tour", title: "The Ultimate Food Lover's Guide to Italy", date: "2024-01-12" },
      { id: "rome-ancient-wonders", title: "Ancient Wonders of Rome", date: "2024-01-08" },
      { id: "tuscan-countryside", title: "Exploring the Tuscan Countryside", date: "2024-01-03" }
    ]
  },
  {
    id: "japan",
    name: "Japan",
    description: "An island nation in East Asia, famous for its unique blend of ancient traditions and cutting-edge technology, stunning natural beauty, and rich cultural heritage.",
    overview: "Japan seamlessly blends the ultra-modern with the traditional, from neon-lit skyscrapers to serene temples. Experience the cherry blossoms, bullet trains, incredible cuisine, and the warm hospitality of the Japanese people.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop",
    capital: "Tokyo",
    population: "125 million",
    language: "Japanese",
    currency: "Japanese Yen (JPY)",
    bestTime: "March to May, September to November",
    cities: [
      { 
        id: "tokyo", 
        name: "Tokyo", 
        description: "Ultra-modern metropolis", 
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
        country: "japan" 
      },
      { 
        id: "kyoto", 
        name: "Kyoto", 
        description: "Ancient capital", 
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
        country: "japan" 
      },
      { 
        id: "osaka", 
        name: "Osaka", 
        description: "Kitchen of Japan", 
        image: "https://images.unsplash.com/photo-1590253230532-5de71835e1b8?w=400&h=300&fit=crop",
        country: "japan" 
      },
      { 
        id: "hiroshima", 
        name: "Hiroshima", 
        description: "City of peace", 
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop",
        country: "japan" 
      }
    ],
    attractions: [
      "Mount Fuji",
      "Senso-ji Temple",
      "Golden Pavilion",
      "Fushimi Inari Shrine",
      "Arashiyama Bamboo Grove",
      "Hiroshima Peace Memorial"
    ],
    blogs: [
      { id: "japan-budget-travel", title: "How to Experience Japan on a Budget", date: "2024-01-10" },
      { id: "cherry-blossom-guide", title: "Complete Cherry Blossom Guide", date: "2024-01-07" },
      { id: "japanese-cuisine", title: "Journey Through Japanese Cuisine", date: "2024-01-02" }
    ]
  },
  {
    id: "usa",
    name: "United States",
    description: "A vast country offering incredible diversity from coast to coast, with iconic cities, stunning national parks, and diverse cultural experiences.",
    overview: "From the bright lights of New York City to the natural wonders of the Grand Canyon, the USA offers endless possibilities. Experience diverse landscapes, vibrant cities, and the melting pot of cultures that makes America unique.",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=600&fit=crop",
    capital: "Washington D.C.",
    population: "331 million",
    language: "English",
    currency: "US Dollar (USD)",
    bestTime: "Varies by region",
    cities: [
      { 
        id: "new-york", 
        name: "New York", 
        description: "The Big Apple", 
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop",
        country: "usa" 
      },
      { 
        id: "los-angeles", 
        name: "Los Angeles", 
        description: "City of Angels", 
        image: "https://images.unsplash.com/photo-1544413275-d9fd516aefe8?w=400&h=300&fit=crop",
        country: "usa" 
      },
      { 
        id: "san-francisco", 
        name: "San Francisco", 
        description: "Golden Gate City", 
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        country: "usa" 
      },
      { 
        id: "miami", 
        name: "Miami", 
        description: "Magic City", 
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        country: "usa" 
      }
    ],
    attractions: [
      "Statue of Liberty",
      "Golden Gate Bridge",
      "Grand Canyon",
      "Yellowstone National Park",
      "Times Square",
      "Hollywood Sign"
    ],
    blogs: [
      { id: "usa-road-trip", title: "Ultimate USA Road Trip Guide", date: "2024-01-14" },
      { id: "national-parks-guide", title: "Best National Parks to Visit", date: "2024-01-09" },
      { id: "american-cities", title: "Top American Cities to Explore", date: "2024-01-01" }
    ]
  },
  {
    id: "pakistan",
    name: "Pakistan",
    description: "A country in South Asia with diverse landscapes from the Karakoram mountains to the Arabian Sea, rich in history, culture, and natural beauty.",
    overview: "Pakistan offers breathtaking mountain ranges, ancient civilizations, vibrant culture, and warm hospitality. From the peaks of K2 to the historic cities of Lahore and Karachi, Pakistan is a land of incredible diversity.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    capital: "Islamabad",
    population: "230 million",
    language: "Urdu, English",
    currency: "Pakistani Rupee (PKR)",
    bestTime: "October to April",
    cities: [
      { 
        id: "lahore", 
        name: "Lahore", 
        description: "Cultural capital", 
        image: "https://images.unsplash.com/photo-1589233160947-5c97bf9ac8c8?w=400&h=300&fit=crop",
        country: "pakistan" 
      },
      { 
        id: "karachi", 
        name: "Karachi", 
        description: "City of lights", 
        image: "https://images.unsplash.com/photo-1591252838994-e41b4bd3b8b4?w=400&h=300&fit=crop",
        country: "pakistan" 
      },
      { 
        id: "islamabad", 
        name: "Islamabad", 
        description: "Capital beauty", 
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        country: "pakistan" 
      },
      { 
        id: "gilgit", 
        name: "Gilgit", 
        description: "Gateway to mountains", 
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
        country: "pakistan" 
      }
    ],
    attractions: [
      "K2 Base Camp",
      "Badshahi Mosque",
      "Hunza Valley",
      "Skardu",
      "Fairy Meadows",
      "Deosai Plains"
    ],
    blogs: [
      { id: "pakistan-mountains", title: "Exploring Pakistan's Majestic Mountains", date: "2024-01-11" },
      { id: "lahore-food-guide", title: "Lahore Food Street Guide", date: "2024-01-06" },
      { id: "northern-areas", title: "Adventures in Northern Pakistan", date: "2024-01-01" }
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    description: "A transcontinental country bridging Europe and Asia, known for its rich history, stunning landscapes, and unique cultural blend.",
    overview: "Turkey offers a fascinating blend of East and West, with ancient ruins, beautiful coastlines, and vibrant bazaars. From the fairy chimneys of Cappadocia to the historic sites of Istanbul, Turkey is a treasure trove of experiences.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    capital: "Ankara",
    population: "84 million",
    language: "Turkish",
    currency: "Turkish Lira (TRY)",
    bestTime: "April to October",
    cities: [
      { 
        id: "istanbul", 
        name: "Istanbul", 
        description: "Where Europe meets Asia", 
        image: "https://images.unsplash.com/photo-1524231757912-21b2faee7707?w=400&h=300&fit=crop",
        country: "turkey" 
      },
      { 
        id: "cappadocia", 
        name: "Cappadocia", 
        description: "Land of fairy chimneys", 
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        country: "turkey" 
      },
      { 
        id: "antalya", 
        name: "Antalya", 
        description: "Turkish Riviera", 
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop",
        country: "turkey" 
      },
      { 
        id: "pamukkale", 
        name: "Pamukkale", 
        description: "Cotton Castle", 
        image: "https://images.unsplash.com/photo-1564859117892-a8138e4f5b83?w=400&h=300&fit=crop",
        country: "turkey" 
      }
    ],
    attractions: [
      "Hagia Sophia",
      "Blue Mosque",
      "Cappadocia Hot Air Balloons",
      "Pamukkale Thermal Pools",
      "Ephesus Ancient City",
      "Grand Bazaar"
    ],
    blogs: [
      { id: "adventure-turkey", title: "Adventure Activities in Cappadocia", date: "2024-01-08" },
      { id: "istanbul-guide", title: "Complete Guide to Istanbul", date: "2024-01-04" },
      { id: "turkish-cuisine", title: "Flavors of Turkish Cuisine", date: "2023-12-30" }
    ]
  }
];

export const getCountryById = (id: string): Country | undefined => {
  return countries.find(country => country.id === id);
};

export const getCitiesByCountry = (countryId: string): City[] => {
  const country = getCountryById(countryId);
  return country ? country.cities : [];
};

export const getAllCities = (): City[] => {
  return countries.flatMap(country => country.cities);
};