import React from 'react';
import { Plus, Check, Star, Tag, Utensils } from 'lucide-react';

export default function MenuCard({ item, onAddToCart, inCart }) {
  const nameAr = item.nameAr || item.name || '';
  const nameEn = item.nameEn || '';
  const catAr = item.categoryNameAr || item.categoryName || 'وجبة';
  const catEn = item.categoryNameEn || '';

  return (
    <div className="group relative glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 hover:border-amber-500/50 transition-all duration-300 space-y-4">
      
      {/* Card Header: Category Tag & Popular Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-dark-900/90 border border-white/10 text-amber-400 text-xs font-bold flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-500" />
          <span>{catAr}</span>
          {catEn && <span className="text-[10px] text-slate-400 font-mono">({catEn})</span>}
        </span>

        {item.popular && (
          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[11px] font-black flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-black" />
            <span>الأكثر طلباً • Popular</span>
          </span>
        )}
      </div>

      {/* Bilingual Dish Title & Description */}
      <div className="space-y-1.5 flex-1">
        <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors leading-snug">
          {nameAr}
        </h3>
        
        {nameEn && (
          <p className="text-xs font-bold text-amber-400/90 font-mono tracking-wide">
            {nameEn}
          </p>
        )}

        <p className="text-slate-400 text-xs leading-relaxed pt-1.5 border-t border-white/5 line-clamp-2">
          {item.descriptionAr || item.description || ''}
          {item.descriptionEn && (
            <span className="block text-[11px] text-slate-500 italic mt-0.5">
              {item.descriptionEn}
            </span>
          )}
        </p>
      </div>

      {/* Price & Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">السعر / Price</span>
          <span className="text-xl font-black text-amber-400 font-mono">
            {typeof item.price === 'number' ? item.price.toLocaleString() : item.price} <span className="text-xs font-sans text-amber-300 font-normal">{item.currency || 'د.ع'}</span>
          </span>
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            inCart
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black hover:brightness-110 shadow-md shadow-amber-500/20 active:scale-95'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>في السلة</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إضافة • Add</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
