import React from 'react';
import { Search, Utensils, Drumstick, Pizza, GlassWater, Coffee, Dessert, CircleDot, Layers, Zap, Flame, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Utensils: Utensils,
  Drumstick: Drumstick,
  Pizza: Pizza,
  GlassWater: GlassWater,
  Coffee: Coffee,
  Dessert: Dessert,
  CircleDot: CircleDot,
  Layers: Layers,
  Zap: Zap,
  Flame: Flame,
  Sparkles: Sparkles
};

export default function CategoryFilter({ categories, activeCategory, onSelectCategory, searchQuery, setSearchQuery }) {
  return (
    <div className="space-y-6 my-8">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span className="w-3 h-8 bg-amber-500 rounded-full inline-block"></span>
            <span>قائمة الوجبات والمشروبات بالنكهتين • Menu</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">تصفح أقسام الطعام والنراكيل والمشروبات بالعربية والإنجليزية</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث بالعربي أو الإنجليزي / Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-0.5 rounded"
            >
              مسح
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Layers;
          const isActive = activeCategory === cat.id;
          const nameAr = cat.nameAr || cat.name || '';
          const nameEn = cat.nameEn || '';

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-dark-800/80 text-slate-300 border-white/10 hover:bg-dark-700 hover:text-white hover:border-amber-500/30'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-black' : 'text-amber-400'}`} />
              <span className="flex items-center gap-1">
                <span>{nameAr}</span>
                {nameEn && <span className="opacity-70 text-[11px] font-mono">({nameEn})</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
