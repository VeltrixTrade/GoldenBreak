import React from 'react';
import { Plus, Check, Star } from 'lucide-react';

export default function MenuCard({ item, onAddToCart, inCart }) {
  const nameAr = item.nameAr || item.name || '';
  const nameEn = item.nameEn || '';
  const descAr = item.descriptionAr || item.description || '';
  const descEn = item.descriptionEn || '';

  // Helper to resolve category images similar to Qzone
  const getPlaceholderImage = () => {
    switch (item.category) {
      case 'fast-food':
        return '/category/food.png';
      case 'mojitos':
        return '/category/mojito.png';
      case 'milkshakes-smoothies':
        return '/category/milkshake.png';
      case 'crepes':
      case 'sweets-snacks':
        return '/category/desserts.png';
      case 'cocktails-juices':
        return '/category/organic_juice.png';
      case 'hot-drinks':
        return '/category/hot_drinks.png';
      case 'mexican-energy':
      case 'energy-drinks':
        return '/category/redbull.png';
      case 'soft-drinks':
        return '/category/cold_drinks.png';
      case 'shisha':
        return '/category/hookah_1774332374.png';
      default:
        return '/category/food.png';
    }
  };

  const imageSrc = item.image || getPlaceholderImage();

  return (
    <div className="w-full flex items-start gap-4 p-3 rounded-2xl hover:bg-dark-800/30 transition-all duration-300 group min-h-[120px]">
      
      {/* Circular Item Image (Styled exactly like Qzone .pq-food-price-img) */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-white/5 bg-dark-900 relative shadow-md">
        <img 
          src={imageSrc} 
          alt={nameAr} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = getPlaceholderImage();
          }}
        />
        {item.popular && (
          <div className="absolute top-0 right-0 bg-[#e09824] text-[#101418] p-0.5 rounded-full" title="⭐ Popular">
            <Star className="w-3 h-3 fill-current" />
          </div>
        )}
      </div>

      {/* Item Details (Title, Line, Price, Description, Add Action) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        
        {/* Top Title & Price row */}
        <div>
          <div className="flex items-end justify-between gap-2">
            
            {/* Title block */}
            <div className="flex-shrink-0">
              <h5 className="text-base sm:text-lg font-bold text-white tracking-wide truncate">
                {nameAr}
              </h5>
              {nameEn && (
                <span className="block text-xs text-[#e09824] font-medium font-mono uppercase tracking-wider opacity-90 truncate">
                  {nameEn}
                </span>
              )}
            </div>
            
            {/* Dotted Connecting Line (stretches to fill space) */}
            <div className="flex-1 border-b border-dotted border-white/10 mx-2 mb-1.5 min-w-[20px]" />
            
            {/* Price block */}
            <div className="flex-shrink-0 text-right">
              <span className="text-base sm:text-lg font-bold text-[#e09824] font-mono">
                {typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
              </span>
              <span className="text-[10px] text-slate-400 font-normal mr-1">د.ع</span>
            </div>

          </div>

          {/* Description block */}
          {(descAr || descEn) && (
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
              {descAr}
              {descEn && <span className="block text-[10px] text-slate-500 italic mt-0.5">{descEn}</span>}
            </p>
          )}
        </div>

        {/* Add to Cart Action Trigger */}
        <div className="flex justify-end mt-2">
          <button
            onClick={() => onAddToCart(item)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              inCart
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-dark-800 hover:bg-[#e09824] text-slate-300 hover:text-black border border-white/5 hover:border-transparent active:scale-95'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>تمت الإضافة</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>إضافة • Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
