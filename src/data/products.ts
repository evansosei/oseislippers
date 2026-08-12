import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ryte-braided-toering-01',
    name: 'The Artisan Braided Toe-Ring Sandal',
    tagline: 'Handcrafted white leather with contoured tan leather footbed',
    price: 149.99,
    compareAtPrice: 179.99,
    rating: 4.92,
    reviewCount: 318,
    category: 'Toe-Ring Sandals',
    material: 'Premium White Calfskin Leather & Vegetable-Tanned Footbed',
    sole: 'Hand-Stitched Non-Slip Leather Rubber Sole',
    features: [
      'Ergonomic toe loop prevents foot slippage',
      'Hand-braided leather instep strap for supreme comfort',
      'Cushioned vegetable-tanned leather sole',
      'Handmade by master leather craftsmen'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Pure White & Tan', hex: '#FFFFFF', image: '/src/assets/images/white_braided_toering_sandal_1786541856589.jpg' },
      { name: 'Saddle Tan', hex: '#8B5A2B', image: '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg' }
    ],
    images: [
      '/src/assets/images/white_braided_toering_sandal_1786541856589.jpg',
      '/src/assets/images/white_tstrap_toeloop_sandal_1786541900813.jpg'
    ],
    description: 'A timeless Mediterranean-inspired toe-ring sandal handcrafted from supple white calfskin leather. Features a braided instep band that gracefully cradles your foot while the rich tan leather footbed molds to your footprint with every wear.',
    inStock: true,
    badge: 'Best Seller',
    careInstructions: 'Wipe clean with a soft leather conditioner cloth. Keep out of extreme moisture.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-woven-cross-mule-02',
    name: 'The Nomad Woven Leather Cross Mule',
    tagline: 'Intricate woven leather crossover straps on desert sand tread',
    price: 179.99,
    compareAtPrice: 209.99,
    rating: 4.96,
    reviewCount: 420,
    category: 'Criss-Cross Mules',
    material: 'Hand-Woven Dark Brown Italian Calfskin',
    sole: 'Shock-Absorbing Molded Rubber & Leather Outsole',
    features: [
      'Precision hand-braided criss-cross leather design',
      'Gold dagger pin hardware accent on crossover strap',
      'Anatomically contoured footbed for all-day comfort',
      'Rugged outdoor-ready rubber outsole'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Mahogany Woven', hex: '#4A2E1B', image: '/src/assets/images/woven_brown_cross_mule_1786541873943.jpg' },
      { name: 'Espresso Black', hex: '#1C1C1C', image: '/src/assets/images/black_monogram_luxury_slide_1786541966165.jpg' }
    ],
    images: [
      '/src/assets/images/woven_brown_cross_mule_1786541873943.jpg',
      '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg'
    ],
    description: 'Designed for effortless resort sophistication and daily comfort. The Nomad features rich hand-woven brown calfskin straps over a smooth tan leather footbed. Engineered with a durable tread suited for seaside promenades or indoor relaxation.',
    inStock: true,
    badge: 'New',
    careInstructions: 'Apply organic leather balm periodically to preserve suppleness.',
    archSupport: 'High Orthopedic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-black-horsebit-slide-03',
    name: 'The Venetian Horsebit Leather Slide',
    tagline: 'Lustrous black Nappa leather with antique gold horsebit hardware',
    price: 219.99,
    compareAtPrice: 259.99,
    rating: 4.90,
    reviewCount: 284,
    category: 'Luxury Slides',
    material: 'Full-Grain Black Nappa Leather & Natural Linen Footbed',
    sole: 'Stitched Hand-Cut Goodyear Leather Welt Sole',
    features: [
      'Polished antique gold horsebit buckle embellishment',
      'Breathable natural woven linen footbed inserts',
      'Padded instep arch support for supreme ease',
      'Hand-stitched perimeter detailing'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Nero Black & Gold', hex: '#000000', image: '/src/assets/images/black_horsebit_leather_slide_1786541888011.jpg' }
    ],
    images: [
      '/src/assets/images/black_horsebit_leather_slide_1786541888011.jpg',
      '/src/assets/images/black_monogram_luxury_slide_1786541966165.jpg'
    ],
    description: 'An iconic luxury indoor-outdoor slide crafted from sleek black full-grain Nappa leather. Highlighted by equestrian gold-tone horsebit hardware and a breathable linen cushioned footbed that delivers Italian elegance to every step.',
    inStock: true,
    badge: 'Best Seller',
    careInstructions: 'Clean leather with damp cloth; polish gold hardware with microfiber jewelry towel.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-white-tstrap-sandal-04',
    name: 'The Riviera T-Strap Toe-Loop Sandal',
    tagline: 'Minimalist double-strap white leather with stitched welt',
    price: 159.99,
    compareAtPrice: 189.99,
    rating: 4.88,
    reviewCount: 195,
    category: 'Toe-Ring Sandals',
    material: 'Pure White Italian Calfskin & Hand-Tanned Sole',
    sole: 'Stitched Leather Footbed & Anti-Slip Heel',
    features: [
      'Structural T-strap design for maximum foot stability',
      'Hand-riveted side accents and double instep bands',
      'Molded toe ring loop prevents sliding',
      'Classic Greek island aesthetic'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: 'Chalk White & Tan', hex: '#F7F5F0', image: '/src/assets/images/white_tstrap_toeloop_sandal_1786541900813.jpg' },
      { name: 'Pure White', hex: '#FFFFFF', image: '/src/assets/images/white_braided_toering_sandal_1786541856589.jpg' }
    ],
    images: [
      '/src/assets/images/white_tstrap_toeloop_sandal_1786541900813.jpg',
      '/src/assets/images/white_braided_toering_sandal_1786541856589.jpg'
    ],
    description: 'Embrace sun-drenched coastal style with the Riviera Sandal. Crafted with dual white leather straps and a reinforced T-bar toe anchor, this sandal offers lightweight grace and hand-sewn durability.',
    inStock: true,
    badge: 'Eco-Friendly',
    careInstructions: 'Spot clean white leather with mild neutral cleanser.',
    archSupport: 'Standard',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-tan-hbuckle-slide-05',
    name: 'The Heritage H-Monogram Leather Slide',
    tagline: 'Warm cognac crossover leather with metallic gold H buckle',
    price: 229.99,
    compareAtPrice: 269.99,
    rating: 4.94,
    reviewCount: 310,
    category: 'Luxury Slides',
    material: 'Supple Cognac Leather & Brushed Gold Hardware',
    sole: 'Stacked Leather & High-Density Rubber Outsole',
    features: [
      'Architectural cross-strap silhouette with custom H hardware',
      'Smooth tan leather footbed with arch contouring',
      'Available in Tan Cognac and Greige Stone colors',
      'Beveled edge black rubber protective outsole'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Cognac Tan', hex: '#C67D3B', image: '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg' },
      { name: 'Greige Stone', hex: '#C0B7B1', image: '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg' }
    ],
    images: [
      '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg',
      '/src/assets/images/woven_brown_cross_mule_1786541873943.jpg'
    ],
    description: 'The epitome of quiet luxury loungewear. The Heritage Slide showcases overlapping wide cognac leather bands adorned with a polished gold H emblem. Engineered for both opulent living room lounging and summer garden gatherings.',
    inStock: true,
    badge: 'Best Seller',
    careInstructions: 'Condition leather regularly and store in included dust bag.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-green-crest-slide-06',
    name: 'The Imperial Crest Emerald Leather Slide',
    tagline: 'Rich forest green calfskin featuring gold Medusa crest emblem',
    price: 239.99,
    rating: 4.91,
    reviewCount: 178,
    category: 'Luxury Slides',
    material: 'Smooth Italian Forest Green Leather',
    sole: 'Hand-Finished Black Leather Sole',
    features: [
      'Eye-catching emerald forest green leather finish',
      'Cast brass medallion gold crest hardware',
      'Supple tan leather inner lining',
      'Ultra-sleek low profile silhouette'
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Imperial Emerald', hex: '#2A5A3B', image: '/src/assets/images/green_crest_leather_slide_1786541927268.jpg' }
    ],
    images: [
      '/src/assets/images/green_crest_leather_slide_1786541927268.jpg',
      '/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg'
    ],
    description: 'Bold yet impeccably refined. The Imperial Crest Slide pairs a striking forest green leather crossover with an ornate gold coin emblem. Designed to turn heads while providing supreme comfort.',
    inStock: true,
    badge: 'Limited Edition',
    careInstructions: 'Spot clean only with specialized leather care lotion.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-black-slingback-sandal-07',
    name: 'The Gladiator Double-Strap Slingback',
    tagline: 'Genuine black leather with adjustable ankle buckle & cream welt',
    price: 199.99,
    rating: 4.89,
    reviewCount: 215,
    category: 'Slingback Sandals',
    material: 'Thick Full-Grain Black Harness Leather',
    sole: 'Reinforced Stitched Leather & Rubber Outsole',
    features: [
      'Dual forefoot support bands with riveted harness construction',
      'Adjustable antique steel heel slingback buckle',
      'High-contrast cream perimeter welt stitching',
      'Supple full-grain leather that molds to your ankle'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Midnight Black', hex: '#111111', image: '/src/assets/images/black_slingback_leather_sandal_1786541939295.jpg' }
    ],
    images: [
      '/src/assets/images/black_slingback_leather_sandal_1786541939295.jpg',
      '/src/assets/images/brown_buckle_gladiator_sandal_1786541950932.jpg'
    ],
    description: 'Crafted for rugged durability and timeless Roman gladiator aesthetics. Featuring dual thick black leather instep straps and a secure slingback heel buckle, this sandal is engineered to last for years of journeying.',
    inStock: true,
    badge: 'New',
    careInstructions: 'Apply dark leather wax to maintain rich black finish and stitching integrity.',
    archSupport: 'High Orthopedic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-brown-gladiator-sandal-08',
    name: 'The Artisan Leather Toe-Loop Gladiator',
    tagline: 'Mahogany brown leather with silver buckle & DF metal badge',
    price: 189.99,
    compareAtPrice: 229.99,
    rating: 4.93,
    reviewCount: 260,
    category: 'Slingback Sandals',
    material: 'Waxed Mahogany Italian Leather & Silver Hardware',
    sole: 'Stitched Leather Footbed & Rugged Non-Slip Base',
    features: [
      'Toe-loop anchor with silver brass rivet details',
      'Metallic DF emblem pin on upper ankle band',
      'Contrast white welt perimeter stitching',
      'Adjustable buckle heel strap for custom lock-in fit'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Mahogany Waxed', hex: '#3B2319', image: '/src/assets/images/brown_buckle_gladiator_sandal_1786541950932.jpg' }
    ],
    images: [
      '/src/assets/images/brown_buckle_gladiator_sandal_1786541950932.jpg',
      '/src/assets/images/black_slingback_leather_sandal_1786541939295.jpg'
    ],
    description: 'Exuding old-world craftsmanship, the Artisan Gladiator combines rich mahogany waxed leather with a secure toe-loop structure and silver metallic buckle hardware. Ideal for those who demand authentic handmade character.',
    inStock: true,
    badge: 'Best Seller',
    careInstructions: 'Treat with natural beeswax conditioner annually.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-black-monogram-slide-09',
    name: 'The Maison V-Monogram Leather Slide',
    tagline: 'Ultra-soft matte black Nappa leather with gold V buckle',
    price: 249.99,
    rating: 4.97,
    reviewCount: 388,
    category: 'Luxury Slides',
    material: 'Butter-Soft Nappa Calfskin & Gold-Plated V Emblem',
    sole: 'Dual-Density Cushioned Heel & Rubber Outsole',
    features: [
      'Ultra-plush padded upper band with gold V monogram buckle',
      'Ergonomic memory-cushioned footbed',
      'Presented in luxury red collector presentation packaging',
      'Versatile dressy or lounge styling'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Onyx Black & Gold', hex: '#1C1917', image: '/src/assets/images/black_monogram_luxury_slide_1786541966165.jpg' }
    ],
    images: [
      '/src/assets/images/black_monogram_luxury_slide_1786541966165.jpg',
      '/src/assets/images/black_horsebit_leather_slide_1786541888011.jpg'
    ],
    description: 'Pure high-fashion sophistication. The Maison Slide features butter-soft matte black Nappa leather, an elevated gold V emblem, and a dense memory foam footbed that offers cloud-like comfort from day to night.',
    inStock: true,
    badge: 'Limited Edition',
    careInstructions: 'Clean leather gently with Nappa lotion; buff gold hardware with soft polishing cloth.',
    archSupport: 'Medium Ergonomic',
    warmthRating: 'Breathable Lightweight'
  },
  {
    id: 'ryte-grey-canvas-cross-slide-10',
    name: 'The Kyoto Ribbed Canvas & Leather Crossover',
    tagline: 'Slate grey crossover with textured ribbed strap & leather footbed',
    price: 169.99,
    rating: 4.87,
    reviewCount: 142,
    category: 'Criss-Cross Mules',
    material: 'Tactile Slate Grey Canvas & Full-Grain Black Leather',
    sole: 'Flexible Lightweight Molded Sole',
    features: [
      'Hybrid construction combining breathable ribbed canvas and smooth leather',
      'Crossband silhouette for adaptive instep width',
      'Moisture-wicking interior lining',
      'Modern urban minimalist aesthetic'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Slate Grey & Black', hex: '#708090', image: '/src/assets/images/grey_crossband_canvas_slide_1786541977777.jpg' }
    ],
    images: [
      '/src/assets/images/grey_crossband_canvas_slide_1786541977777.jpg',
      '/src/assets/images/black_monogram_luxury_slide_1786541966165.jpg'
    ],
    description: 'A contemporary architectural slide featuring a dual-material crossover of textured slate grey ribbed canvas and supple black leather. Lightweight, breathable, and designed for versatile everyday wear.',
    inStock: true,
    badge: 'New',
    careInstructions: 'Spot clean canvas with damp sponge and mild soap.',
    archSupport: 'Standard',
    warmthRating: 'Breathable Lightweight'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'ryte-braided-toering-01',
    userName: 'Elena Rostova',
    rating: 5,
    date: 'August 2, 2026',
    title: 'Exquisite craftsmanship & comfortable leather',
    comment: 'The white braided leather is so soft and doesn’t rub or pinch at all. The footbed has molded nicely to my foot after just 3 days of wear!',
    verifiedPurchase: true,
    helpfulCount: 42
  },
  {
    id: 'rev-02',
    productId: 'ryte-woven-cross-mule-02',
    userName: 'Marcus Vance',
    rating: 5,
    date: 'July 28, 2026',
    title: 'Unmatched handmade quality',
    comment: 'The woven leather work is stunning in person. You can tell these are genuine artisan leather sandals. Worth every penny!',
    verifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: 'rev-03',
    productId: 'ryte-black-horsebit-slide-03',
    userName: 'Sophie Lin',
    rating: 5,
    date: 'August 10, 2026',
    title: 'Pure Italian luxury feel',
    comment: 'The gold horsebit buckle and linen footbed give these slides an incredible high-end designer look. Very comfortable for indoor and summer outings.',
    verifiedPurchase: true,
    helpfulCount: 31
  }
];
