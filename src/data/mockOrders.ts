import { Order, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Alexander Wright',
  email: 'a.wright@oseiliving.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  memberTier: 'Gold Velvet',
  points: 420,
  savedAddresses: [
    {
      fullName: 'Alexander Wright',
      addressLine1: '742 Evergreen Terrace',
      addressLine2: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'United States',
      phone: '+1 (503) 555-0182',
      email: 'a.wright@oseiliving.com'
    }
  ],
  savedPaymentMethods: [
    {
      id: 'card-01',
      cardBrand: 'Visa',
      last4: '4242',
      expDate: '08/28',
      isDefault: true
    }
  ],
  wishlistIds: ['ryte-braided-toering-01', 'ryte-black-horsebit-slide-03']
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-2026-8891',
    orderNumber: 'OSEI-88912',
    date: 'August 09, 2026',
    status: 'shipped',
    items: [
      {
        cartItemId: 'item-88912-1',
        productId: 'ryte-braided-toering-01',
        name: 'The Artisan Braided Toe-Ring Sandal',
        price: 149.99,
        selectedSize: 42,
        selectedColor: { name: 'Pure White & Tan', hex: '#FFFFFF', image: '/assets/images/slippers1.jpg' },
        quantity: 1,
        image: '/assets/images/slippers1.jpg',
        maxStock: 10
      }
    ],
    shippingAddress: INITIAL_USER.savedAddresses[0],
    shippingMethod: 'Express Air',
    trackingNumber: '1Z9999999999999999',
    carrier: 'UPS Air Express',
    estimatedDelivery: 'Tomorrow, Aug 13 by 7:00 PM',
    subtotal: 149.99,
    discount: 15.00,
    tax: 10.80,
    shippingCost: 0,
    giftWrapCost: 0,
    total: 145.79,
    paymentMethod: {
      type: 'credit_card',
      brand: 'Visa',
      last4: '4242'
    },
    timeline: [
      { status: 'processing', label: 'Order Placed', description: 'Payment verified & order queued for fulfillment', timestamp: 'Aug 09, 09:14 AM', completed: true },
      { status: 'processing', label: 'Handcrafted & Packed', description: 'Inspected and wrapped in eco-friendly linen paper', timestamp: 'Aug 09, 02:30 PM', completed: true },
      { status: 'shipped', label: 'In Transit', description: 'Depleted from Portland Fulfillment Hub', timestamp: 'Aug 10, 08:00 AM', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Courier assigned to local route', timestamp: 'Aug 13, 08:30 AM (Est)', completed: false },
      { status: 'delivered', label: 'Delivered', description: 'Front porch drop-off', timestamp: 'Aug 13, 02:00 PM (Est)', completed: false }
    ]
  },
  {
    id: 'ord-2026-7210',
    orderNumber: 'OSEI-72104',
    date: 'June 14, 2026',
    status: 'delivered',
    items: [
      {
        cartItemId: 'item-72104-1',
        productId: 'ryte-black-horsebit-slide-03',
        name: 'The Venetian Horsebit Leather Slide',
        price: 219.99,
        selectedSize: 42,
        selectedColor: { name: 'Nero Black & Gold', hex: '#000000', image: '/assets/images/slippers3.jpg' },
        quantity: 1,
        image: '/assets/images/slippers3.jpg',
        maxStock: 5
      }
    ],
    shippingAddress: INITIAL_USER.savedAddresses[0],
    shippingMethod: 'Standard',
    trackingNumber: '9400100000000000000000',
    carrier: 'USPS Priority',
    estimatedDelivery: 'June 17, 2026',
    subtotal: 219.99,
    discount: 22.00,
    tax: 15.84,
    shippingCost: 0,
    giftWrapCost: 5.00,
    total: 218.83,
    paymentMethod: {
      type: 'apple_pay',
      brand: 'Apple Pay'
    },
    timeline: [
      { status: 'processing', label: 'Order Placed', description: 'Order confirmed', timestamp: 'Jun 14, 10:15 AM', completed: true },
      { status: 'shipped', label: 'In Transit', description: 'In transit with carrier', timestamp: 'Jun 15, 09:00 AM', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Out for delivery with courier', timestamp: 'Jun 17, 08:00 AM', completed: true },
      { status: 'delivered', label: 'Delivered', description: 'Delivered to recipient address', timestamp: 'Jun 17, 01:22 PM', completed: true }
    ]
  }
];
