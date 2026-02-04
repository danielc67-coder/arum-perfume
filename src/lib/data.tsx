// src/lib/data.ts

export type Occasion = 'All' | 'Daily' | 'Formal' | 'Night Out' | 'Office';

export interface Perfume {
  id: number;
  name: string;
  brand: string;
  type: 'Local' | 'Arab';
  concentration: 'Extrait' | 'EDP';
  price: string;
  image: string;
  occasion: Occasion;
  rating: number;
  notes: { top: string; mid: string; base: string };
  spl: { sillage: string; longevity: string; projection: string; score: number };
  description: string;
}

export const PERFUMES: Perfume[] = [
  {
    id: 1, name: "Khamrah", brand: "Lattafa", type: "Arab", price: "IDR 480.000", concentration: "EDP",
    image: "https://cdn-ilboccp.nitrocdn.com/SDkrODIaeNZRdZfqHcJERwUgHcFSfjDQ/assets/images/optimized/rev-866cd5f/lattafa.com/wp-content/uploads/2024/05/2-60.jpg", 
    occasion: "Night Out", rating: 4.9,
    notes: { top: "Cinnamon, Nutmeg, Bergamot", mid: "Dates, Praline, Tuberose, Mahonial", base: "Vanilla, Tonka Bean, Amberwood, Myrrh, Benzoin, Akigalawood" },
    spl: { sillage: "Heavy", longevity: "10h+", projection: "3m", score: 9.5 },
    description: "Viral sensation. A boozy, sweet, and spicy masterpiece often compared to Angels' Share."
  },
  {
    id: 2, name: "Farhampton", brand: "HMNS", type: "Local", price: "IDR 395.000", concentration: "Extrait",
    image: "https://madeforhmns.com/cdn/shop/files/Farhampton-2_b34f5a74-225a-48a7-8a4f-767e230cbd09.png?v=1739790947",
    occasion: "Formal", rating: 4.8,
    notes: { top: "Bergamot and Ripe Fruit", mid: "Lavender, Orange Blossom Flower", base: "Labdanum, Cedar Wood, Tonka Bean" },
    spl: { sillage: "Moderate", longevity: "6-8h", projection: "1.5m", score: 7.5 },
    description: "Indonesia's best-selling extrait. Warm, spicy, and deeply masculine."
  },
  {
    id: 3, name: "Turathi Blue", brand: "Afnan", type: "Arab", price: "IDR 450.000", concentration: "EDP",
    image: "https://afnan.com/cdn/shop/files/Turathi_Blue-1.png?v=1742203702&width=800",
    occasion: "Office", rating: 4.7,
    notes: { top: "Bergamot, Mandarin", mid: "Amber, Woody", base: "Musk, Patchouli, Fresh Spicy" },
    spl: { sillage: "Strong", longevity: "8h+", projection: "2m", score: 8.5 },
    description: "The 'Blue' fragrance killer. Sharp luxury citrus on top of sophisticated musk."
  },
  {
    id: 4, name: "Alexandra", brand: "Layr", type: "Local", price: "IDR 319.000", concentration: "Extrait",
    image: "https://layrfragrance.com/cdn/shop/files/LAYR-SKUALEXANDRA01_900x.jpg?v=1748817394",
    occasion: "Daily", rating: 4.6,
    notes: { top: "Bergamot, Saffron, Clove, Glazed Fruit", mid: "Rose, Caramel, Heliotrope, Frankincense", base: "Tonka Bean, Amber, Musky, Moss" }, 
    spl: { sillage: "Intimate", longevity: "8-9h", projection: "2m", score: 9.0 },
    description: "For the ones time couldn't erase."
  },
  {
    id: 5, name: "Summer On The Beach", brand: "SaffnCo", type: "Local", price: "IDR 319.000", concentration: "Extrait",
    image: "http://saffnco.com/cdn/shop/files/box-_-botol-background-putih.png?v=1764310886&width=900",
    occasion: "Night Out", rating: 5,
    notes: { top: "Mandarin, Galbanum, Ylang", mid: "Tuberose, Jasmine, Orange Flower", base: "Vanila, Tonka Bean, Musk" }, 
    spl: { sillage: "Strong", longevity: "8-9h", projection: "2m", score: 9.0 },
    description: "Captures the perfect summer dream like no other"
  },
  {
    id: 6, name: "Supremacy Collector Edition", brand: "Afnan", type: "Arab", price: "IDR 900.000", concentration: "EDP",
    image: "https://afnan.com/cdn/shop/files/STILL_Afnan_Collectors_04_SQUARE_01.png?v=1731326556&width=800",
    occasion: "Daily", rating: 4.6,
    notes: { top: "Pineapple, Bergamot, Apple and White Floral", mid: "Orange Blossom, Birch and Amber", base: "Oak Moss, Musk and Ambergris" }, 
    spl: { sillage: "Strong", longevity: "8-12h+", projection: "2m", score: 10.0 },
    description: "Exquisite scent combines the classic allure of a timeless classic with a refreshing twist of white floral and amber notes, creating a sophisticated and invigorating scent experience perfect for special occasions."
  },
  {
    id: 7, name: "Vulcan Feu", brand: "French Avenue", type: "Arab", price: "IDR 400.000", concentration: "EDP",
    image: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.105520.2x.avif",
    occasion: "Daily", rating: 4.6,
    notes: { top: "Ginger, Mango, Lemon, Rhubarb", mid: "Jasmine, Violet, Praline, Pink Pepper", base: "Cedarwood, Ambergris Scented, Tonka Beans, Moss" }, 
    spl: { sillage: "Intimate", longevity: "8-12h+", projection: "2m", score: 9.1 },
    description: "Oriental - Woody"
  },
  {
    id: 8, name: "Somewhere In August", brand: "TitikNadi", type: "Local", price: "IDR 160.000", concentration: "EDP",
    image: "https://api.wangiloka.com/images/perfume/4689389874044573973/id-11134207-7rbkb-mau1jfmeeof8a9-resize-w900-nl.webp",
    occasion: "Daily", rating: 5,
    notes: { top: "Passionfruit, Citrusy", mid: "Cassis, Sand", base: "Musk, Sandalwood, Patchouli" }, 
    spl: { sillage: "Intimate", longevity: "6-8h", projection: "1m", score: 9.0 },
    description: "Fresh fruits and the warmth of the gentle sea breeze come together, evoking joy and positivity. The refreshing scent is inspiring and uplifting, making every moment unforgettable."
  },
];
