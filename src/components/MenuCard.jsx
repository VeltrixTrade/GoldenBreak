import React from 'react';
import { Plus, Check, Star } from 'lucide-react';

export default function MenuCard({ item, onAddToCart, inCart, lang }) {
  const nameAr = item.nameAr || item.name || '';
  const nameEn = item.nameEn || '';
  const descAr = item.descriptionAr || item.description || '';
  const descEn = item.descriptionEn || '';

  const isAr = lang === 'ar';

  // Helper to resolve category images similar to Qzone
  const getPlaceholderImage = () => {
    switch (item.category) {
      case 'fast-food':
        return '/category/fast_food.jpg';
      case 'mojitos':
        return '/category/mojitos.jpg';
      case 'milkshakes-smoothies':
        return '/category/milkshakes.jpg';
      case 'crepes':
        return '/category/crepes.jpg';
      case 'sweets-snacks':
        return '/category/sweets.jpg';
      case 'cocktails-juices':
        return '/category/juices.jpg';
      case 'hot-drinks':
        return '/category/hot_drinks.jpg';
      case 'mexican-energy':
      case 'energy-drinks':
        return '/category/mexican_energy.jpg';
      case 'soft-drinks':
        return '/category/soft_drinks.jpg';
      case 'shisha':
        return '/category/hookah.jpg';
      case 'billiards':
        return '/category/billiards.jpg';
      default:
        return '/category/fast_food.jpg';
    }
  };

  const imageSrc = item.image || getPlaceholderImage();

  return (
    <div className="w-full flex items-start gap-4 p-3 rounded-2xl hover:bg-dark-800/30 transition-all duration-300 group min-h-[120px]" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Circular Item Image (Styled exactly like Qzone .pq-food-price-img) */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[#e09824]/10 bg-dark-900 relative shadow-lg">
        <img 
          src={imageSrc} 
          alt={isAr ? nameAr : (nameEn || nameAr)} 
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
              <h5 className="text-lg sm:text-xl font-bold text-white tracking-wide truncate">
                {isAr ? nameAr : (nameEn || nameAr)}
              </h5>
              {isAr && nameEn && (
                <span className="block text-xs text-[#e09824] font-medium font-mono uppercase tracking-wider opacity-90 truncate">
                  {nameEn}
                </span>
              )}
              {!isAr && nameAr && nameEn && (
                <span className="block text-xs text-[#e09824] font-medium tracking-wider opacity-90 truncate">
                  {nameAr}
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
              <span className="text-[10px] text-slate-400 font-normal mr-1">{isAr ? 'د.ع' : 'IQD'}</span>
            </div>

          </div>

          {/* Description block */}
          {(isAr ? descAr : (descEn || descAr)) && (
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
              {isAr ? descAr : (descEn || descAr)}
              {isAr && descEn && <span className="block text-[10px] text-slate-500 italic mt-0.5">{descEn}</span>}
              {!isAr && descAr && descEn && <span className="block text-[10px] text-slate-500 italic mt-0.5">{descAr}</span>}
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
                <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isAr ? 'إضافة • Add' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
