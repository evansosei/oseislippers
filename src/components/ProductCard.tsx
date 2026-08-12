import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ColorVariant } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    user,
    toggleWishlist,
    setQuickViewProductId,
    setSelectedProductId
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [showSizePicker, setShowSizePicker] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const isWishlisted = user.wishlistIds.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showSizePicker) {
      setShowSizePicker(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setShowSizePicker(false);
    }, 1500);
  };

  const handleCardClick = () => {
    setSelectedProductId(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative bg-[#FAF9F5] rounded-2xl border border-[#E7E5E0] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#F4F1EA] overflow-hidden">
        
        {/* Product Image */}
        <img
          src={selectedColor.image || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#1C1917] text-[#FAF9F5] text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full font-medium">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow'
              : 'bg-white/70 text-[#6B645C] hover:bg-white hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProductId(product.id);
            }}
            className="flex-1 bg-[#FAF9F5]/90 hover:bg-[#FAF9F5] text-[#1C1917] text-xs font-medium py-2 rounded-xl backdrop-blur-sm shadow flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5 mb-2">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-offset-1 ring-[#1C1917] scale-110'
                    : 'border-stone-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[11px] text-stone-500 ml-1.5 font-mono">{selectedColor.name}</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-base font-serif font-medium text-[#1C1917] group-hover:text-[#8C7A6B] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Rating and Price Row */}
        <div className="pt-2 border-t border-[#F2EFE9] flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-[#1C1917]">{product.rating}</span>
            <span className="text-stone-400 font-light">({product.reviewCount})</span>
          </div>

          <div className="text-right">
            <span className="text-sm font-semibold text-[#1C1917] font-mono">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through ml-1.5 font-mono">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Size Picker Panel */}
        {showSizePicker ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="pt-2 border-t border-[#E7E5E0] space-y-2 animate-fadeIn"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B645C]">
              <span>Select Size (US):</span>
              <button
                onClick={() => setShowSizePicker(false)}
                className="text-stone-400 hover:text-[#1C1917] underline"
              >
                Cancel
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs rounded font-mono ${
                    selectedSize === size
                      ? 'bg-[#1C1917] text-[#FAF9F5] font-bold'
                      : 'bg-[#F2EFE9] text-[#6B645C] hover:bg-[#E7E3DA]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              id={`confirm-add-${product.id}`}
              onClick={handleQuickAdd}
              className="w-full mt-2 bg-[#1C1917] text-[#FAF9F5] py-2 rounded-xl text-xs font-medium hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Size {selectedSize} to Bag</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="w-full bg-[#F2EFE9] hover:bg-[#1C1917] text-[#2C2723] hover:text-[#FAF9F5] py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select Size & Add</span>
          </button>
        )}

      </div>
    </div>
  );
};
