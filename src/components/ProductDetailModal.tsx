import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Ruler,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ThumbsUp
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ColorVariant } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    quickViewProductId,
    setQuickViewProductId,
    formatPrice,
    addToCart,
    user,
    toggleWishlist,
    setIsSizeGuideOpen,
    setIsFitAssistantOpen,
    reviews,
    addReview,
    setActiveTab,
    setIsCartOpen
  } = useShop();

  const activeId = selectedProductId || quickViewProductId;
  const product = products.find(p => p.id === activeId);

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(() => product ? product.colors[0] : { name: '', hex: '', image: '' });
  const [selectedSize, setSelectedSize] = useState<number>(() => product ? product.sizes[2] || product.sizes[0] : 8);
  const [activeImage, setActiveImage] = useState<string>(() => product ? product.images[0] : '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTabSection, setActiveTabSection] = useState<'details' | 'materials' | 'arch' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Review form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  if (!product) return null;

  const currentImage = selectedColor.image || activeImage || product.images[0];
  const isWishlisted = user.wishlistIds.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleClose = () => {
    setSelectedProductId(null);
    setQuickViewProductId(null);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    handleClose();
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;
    addReview({
      productId: product.id,
      userName: user.name,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      verifiedPurchase: true
    });
    setNewTitle('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1C1917]/10 hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF9F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Gallery Column */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-[#F4F1EA] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E5E0] overflow-y-auto">
          <div className="space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-[#E2DDD5]">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#1C1917] text-[#FAF9F5] text-xs font-mono uppercase px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? 'border-[#1C1917]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-6 pt-6 border-t border-[#E2DDD5] grid grid-cols-2 gap-3 text-xs text-[#6B645C]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8C7A6B]" />
              <span>Free Shipping over {formatPrice(75)}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8C7A6B]" />
              <span>30-Day Home Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C7A6B]" />
              <span>Lifetime Craftsmanship</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C7A6B]" />
              <span>Japanese Design</span>
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between bg-[#FAF9F5]">
          <div className="space-y-6">
            
            {/* Header Title & Rating */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C7A6B]">
                  {product.category} Slipper
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
                    isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-[#E7E5E0] text-[#6B645C]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1C1917] mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 font-light mt-1">
                {product.tagline}
              </p>

              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#1C1917] ml-1">{product.rating}</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-mono">{productReviews.length + product.reviewCount} Reviews</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-2xl font-serif font-bold text-[#1C1917] font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Variant Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B645C]">
                Color: <strong className="text-[#1C1917]">{selectedColor.name}</strong>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.image) setActiveImage(color.image);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#1C1917] bg-[#F2EFE9] ring-1 ring-[#1C1917]'
                        : 'border-[#E7E5E0] hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium text-[#1C1917] pr-1">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#6B645C]">
                <span>Select US Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#8C7A6B] hover:text-[#1C1917] underline font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide & Conversion</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                      selectedSize === size
                        ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917] shadow'
                        : 'bg-[#F2EFE9] text-[#2C2723] border-[#E2DDD5] hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E2DDD5] rounded-xl bg-[#F2EFE9] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-[#E2DDD5]"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-bold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-[#E2DDD5]"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1C1917] text-[#FAF9F5] py-3.5 rounded-2xl text-xs font-medium uppercase tracking-wider hover:bg-[#38332E] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                id="modal-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full bg-[#8C7A6B] text-white py-3.5 rounded-2xl text-xs font-medium uppercase tracking-wider hover:bg-[#726255] transition-all shadow-sm"
              >
                Buy Now (Express Checkout)
              </button>
            </div>

            {/* Tabs Section */}
            <div className="pt-4 border-t border-[#E7E5E0]">
              <div className="flex border-b border-[#E7E5E0] space-x-6 text-xs font-medium overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setActiveTabSection('details')}
                  className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTabSection === 'details' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent text-stone-500'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTabSection('materials')}
                  className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTabSection === 'materials' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent text-stone-500'
                  }`}
                >
                  Materials & Care
                </button>
                <button
                  onClick={() => setActiveTabSection('arch')}
                  className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTabSection === 'arch' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent text-stone-500'
                  }`}
                >
                  Arch & Warmth
                </button>
                <button
                  onClick={() => setActiveTabSection('reviews')}
                  className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTabSection === 'reviews' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent text-stone-500'
                  }`}
                >
                  Reviews ({productReviews.length})
                </button>
              </div>

              <div className="py-4 text-xs text-[#2C2723] space-y-3 leading-relaxed">
                {activeTabSection === 'details' && (
                  <>
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activeTabSection === 'materials' && (
                  <div className="space-y-2">
                    <p><strong>Upper & Lining:</strong> {product.material}</p>
                    <p><strong>Outsole:</strong> {product.sole}</p>
                    <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
                  </div>
                )}

                {activeTabSection === 'arch' && (
                  <div className="space-y-2">
                    <p><strong>Arch Support:</strong> {product.archSupport}</p>
                    <p><strong>Warmth Level:</strong> {product.warmthRating}</p>
                    <p className="text-stone-500">Designed to alleviate pressure on hardwood or ceramic tile surfaces.</p>
                  </div>
                )}

                {activeTabSection === 'reviews' && (
                  <div className="space-y-4">
                    {/* Write Review Form */}
                    <form onSubmit={handleReviewSubmit} className="bg-[#F4F1EA] p-4 rounded-2xl space-y-3 border border-[#E2DDD5]">
                      <h4 className="font-semibold text-[#1C1917]">Write a Verified Review</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-stone-600">Rating:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="p-1"
                            >
                              <Star className={`w-4 h-4 ${star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Review title (e.g. Supremely comfortable)"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3 py-2 text-xs text-[#1C1917]"
                        required
                      />
                      <textarea
                        placeholder="Share your experience with fit, comfort, and warmth..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3 py-2 text-xs text-[#1C1917] h-20"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#38332E]"
                      >
                        Submit Review
                      </button>
                      {reviewSubmitted && (
                        <p className="text-emerald-600 text-xs font-semibold">Thank you! Your review has been posted.</p>
                      )}
                    </form>

                    {/* Review List */}
                    <div className="space-y-3 pt-2">
                      {productReviews.map(rev => (
                        <div key={rev.id} className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E5E0] space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                              ))}
                              <span className="font-semibold text-[#1C1917] ml-2">{rev.userName}</span>
                            </div>
                            <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                          </div>
                          <p className="font-medium text-[#1C1917]">{rev.title}</p>
                          <p className="text-stone-600 font-light">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
