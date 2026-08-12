import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  CategoryType,
  Currency,
  ColorVariant,
  Review
} from '../types';
import { PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { INITIAL_USER, MOCK_ORDERS } from '../data/mockOrders';

export type ViewTab = 'shop' | 'cart' | 'checkout' | 'dashboard' | 'confirmation';

interface ShopContextType {
  products: Product[];
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  quickViewProductId: string | null;
  setQuickViewProductId: (id: string | null) => void;
  
  // Filters
  categoryFilter: CategoryType;
  setCategoryFilter: (category: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  warmthFilter: string;
  setWarmthFilter: (w: string) => void;
  archFilter: string;
  setArchFilter: (a: string) => void;
  
  // Cart & Discounts
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: number, color: ColorVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountPercentage: number;
  isGiftWrapped: boolean;
  setIsGiftWrapped: (wrapped: boolean) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number) => string;

  // User & Dashboard
  user: UserProfile;
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (orderData: Partial<Order>) => Order;
  reorderItems: (orderItems: CartItem[]) => void;

  // Modals & Assistant
  isFitAssistantOpen: boolean;
  setIsFitAssistantOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  activeInvoiceOrder: Order | null;
  setActiveInvoiceOrder: (order: Order | null) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeTab, setActiveTab] = useState<ViewTab>('shop');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [warmthFilter, setWarmthFilter] = useState<string>('All');
  const [archFilter, setArchFilter] = useState<string>('All');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('osei_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [isGiftWrapped, setIsGiftWrapped] = useState<boolean>(false);

  // Currency state
  const [currency, setCurrency] = useState<Currency>('GHS');

  // User & Orders state
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Modals
  const [isFitAssistantOpen, setIsFitAssistantOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  useEffect(() => {
    try {
      localStorage.setItem('osei_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const formatPrice = (amount: number): string => {
    const rates: Record<Currency, { symbol: string; rate: number }> = {
      GHS: { symbol: 'GH₵ ', rate: 1 },
      USD: { symbol: '$', rate: 0.083 },
      EUR: { symbol: '€', rate: 0.076 },
      GBP: { symbol: '£', rate: 0.065 },
      CAD: { symbol: 'CA$', rate: 0.11 }
    };

    const target = rates[currency] || rates.GHS;
    const converted = amount * target.rate;
    return `${target.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product: Product, size: number, color: ColorVariant, quantity: number = 1) => {
    const cartItemId = `${product.id}-${size}-${color.name.replace(/\s+/g, '-').toLowerCase()}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            selectedSize: size,
            selectedColor: color,
            quantity,
            image: color.image || product.images[0],
            maxStock: 10
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setDiscountPercentage(0);
    setIsGiftWrapped(false);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'OSEI10' || clean === 'WELCOME10') {
      setPromoCode(clean);
      setDiscountPercentage(10);
      return { success: true, message: '10% discount applied to your order!' };
    } else if (clean === 'CLOUD15') {
      setPromoCode(clean);
      setDiscountPercentage(15);
      return { success: true, message: '15% Cloud Member discount applied!' };
    } else if (clean === 'FREESHIP') {
      setPromoCode(clean);
      setDiscountPercentage(5);
      return { success: true, message: 'Free express shipping voucher applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try OSEI10 or CLOUD15.' };
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscountPercentage(0);
  };

  const toggleWishlist = (productId: string) => {
    setUser(prev => {
      const exists = prev.wishlistIds.includes(productId);
      const updated = exists
        ? prev.wishlistIds.filter(id => id !== productId)
        : [...prev.wishlistIds, productId];
      return { ...prev, wishlistIds: updated };
    });
  };

  const placeOrder = (orderData: Partial<Order>): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = (subtotal * discountPercentage) / 100;
    const shippingCost = subtotal >= 75 ? 0 : 8.00;
    const giftWrapCost = isGiftWrapped ? 5.00 : 0;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shippingCost + giftWrapCost + tax;

    const newOrderNumber = `OSEI-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      date: dateStr,
      status: 'processing',
      items: [...cart],
      shippingAddress: orderData.shippingAddress || user.savedAddresses[0],
      shippingMethod: orderData.shippingMethod || 'Standard',
      trackingNumber: `1Z${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      carrier: 'UPS Air Express',
      estimatedDelivery: '3-4 Business Days',
      subtotal,
      discount,
      tax,
      shippingCost,
      giftWrapCost,
      total,
      paymentMethod: orderData.paymentMethod || { type: 'credit_card', brand: 'Visa', last4: '4242' },
      timeline: [
        { status: 'processing', label: 'Order Placed', description: 'Order confirmed & secure payment cleared', timestamp: `${dateStr}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
        { status: 'processing', label: 'Quality Check & Packing', description: 'Hand-inspected and wrapped in unbleached linen box', timestamp: 'In progress', completed: true },
        { status: 'shipped', label: 'In Transit', description: 'Carrier pickup from Portland Distribution Facility', timestamp: 'Pending', completed: false },
        { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Assigned to local delivery truck', timestamp: 'Pending', completed: false },
        { status: 'delivered', label: 'Delivered', description: 'Delivered to your front door', timestamp: 'Pending', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    // Earn 1 point per $1 spent
    setUser(prev => ({ ...prev, points: prev.points + Math.round(total) }));
    clearCart();
    setActiveOrder(newOrder);
    setActiveTab('confirmation');
    return newOrder;
  };

  const reorderItems = (orderItems: CartItem[]) => {
    orderItems.forEach(item => {
      const matchedProduct = products.find(p => p.id === item.productId);
      if (matchedProduct) {
        addToCart(matchedProduct, item.selectedSize, item.selectedColor, item.quantity);
      }
    });
    setIsCartOpen(true);
  };

  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0
    };
    setReviews(prev => [rev, ...prev]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        activeTab,
        setActiveTab,
        selectedProductId,
        setSelectedProductId,
        quickViewProductId,
        setQuickViewProductId,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        warmthFilter,
        setWarmthFilter,
        archFilter,
        setArchFilter,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        promoCode,
        applyPromoCode,
        removePromoCode,
        discountPercentage,
        isGiftWrapped,
        setIsGiftWrapped,
        currency,
        setCurrency,
        formatPrice,
        user,
        toggleWishlist,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        reorderItems,
        isFitAssistantOpen,
        setIsFitAssistantOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        activeInvoiceOrder,
        setActiveInvoiceOrder,
        reviews,
        addReview
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
