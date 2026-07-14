import React, { useState } from 'react';
import { ShoppingBag, Gamepad2, Sparkles, UtensilsCrossed, Instagram } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, activeTab, setActiveTab }) {
  const [logoClicks, setLogoClicks] = useState(0);

  // Secret Admin Trigger: Triple click on the logo
  const handleLogoClick = () => {
    setActiveTab('home');
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 3) {
      onOpenAdmin();
      setLogoClicks(0);
    }
    setTimeout(() => setLogoClicks(0), 1500);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand (Secret Triple-Click to open Admin) */}
        <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={handleLogoClick} title="GOLDENBREAK @goldenbreak.dhk">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-7 h-7 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider gold-text-gradient font-mono">
                GOLDENBREAK
              </span>
              <a
                href="https://instagram.com/goldenbreak.dhk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20 font-bold flex items-center gap-1 transition-all"
              >
                <Instagram className="w-3 h-3" />
                <span>goldenbreak.dhk</span>
              </a>
            </div>
            <p className="text-xs text-slate-400 font-medium">صالة ومطعم بلياردو & كافيه فاخر</p>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-800/80 p-1.5 rounded-full border border-white/5">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span>قائمة الطعام • Menu</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('venue')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'venue'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              <span>جولة في الصالة</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'booking'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>حجز طاولة بلياردو</span>
            </div>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#090A0F] animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
