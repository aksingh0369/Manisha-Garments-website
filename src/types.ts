export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Sarees' | 'Lehengas' | 'Kids Wear' | 'Girls Wear' | 'Gents Wear' | 'Wedding' | 'Festive';
  occasion: 'Wedding' | 'Festive' | 'Party' | 'Traditional';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  fabric: string;
  workType: string;
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  careInstructions: string;
  sku: string;
  blouseIncluded?: boolean;
  dupattaLength?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  categoryKey: Product['category'];
  image: string;
  itemCount: number;
  description: string;
  tagline: string;
}

export interface OccasionItem {
  id: string;
  name: string;
  slug: string;
  occasionKey: Product['occasion'];
  image: string;
  description: string;
  outfitCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: string;
  occasion: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  fabrics: string[];
  sortBy: 'recommended' | 'newest' | 'price-low' | 'price-high' | 'best-selling';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  outfitPurchased: string;
  avatar?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  orderDate: string;
  status: string;
}

export type ActiveView = 'home' | 'shop' | 'product-detail' | 'wishlist' | 'about' | 'contact' | 'track-order';
