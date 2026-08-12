export type CategoryType = 'All' | 'Toe-Ring Sandals' | 'Criss-Cross Mules' | 'Luxury Slides' | 'Slingback Sandals' | 'Handcrafted Leather';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: CategoryType;
  material: string;
  sole: string;
  features: string[];
  sizes: number[]; // US sizes e.g. 6, 7, 8, 9, 10, 11, 12
  colors: ColorVariant[];
  images: string[];
  description: string;
  inStock: boolean;
  badge?: 'Best Seller' | 'New' | 'Eco-Friendly' | 'Limited Edition';
  careInstructions: string;
  archSupport: 'Standard' | 'Medium Ergonomic' | 'High Orthopedic';
  warmthRating: 'Breathable Lightweight' | 'Cozy All-Season' | 'Maximum Thermal';
}

export interface CartItem {
  cartItemId: string; // unique string for product + size + color
  productId: string;
  name: string;
  price: number;
  selectedSize: number;
  selectedColor: ColorVariant;
  quantity: number;
  image: string;
  maxStock: number;
}

export type OrderStatus = 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface TimelineEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'Standard' | 'Express Air' | 'Carbon Neutral';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  giftWrapCost: number;
  total: number;
  paymentMethod: {
    type: 'credit_card' | 'apple_pay' | 'google_pay' | 'klarna' | 'momo';
    brand?: string;
    last4?: string;
  };
  timeline: TimelineEvent[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  memberTier: 'Silver Cloud' | 'Gold Velvet' | 'Platinum Cashmere';
  points: number;
  savedAddresses: ShippingAddress[];
  savedPaymentMethods: {
    id: string;
    cardBrand: string;
    last4: string;
    expDate: string;
    isDefault: boolean;
  }[];
  wishlistIds: string[];
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'GHS';
