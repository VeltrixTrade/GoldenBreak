import React, { useState } from 'react';
import { ShoppingBag, Gamepad2, UtensilsCrossed, Instagram, MessageCircle } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, activeTab, setActiveTab, lang }) {
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

  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/40 backdrop-blur-md border-b border-white/5" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand (Secret Triple-Click to open Admin) */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group" onClick={handleLogoClick} title="GOLDENBREAK @goldenbreak.dhk">
          <img 
            src="/logo.png" 
            alt="GOLDENBREAK Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-[#e09824]/30 group-hover:scale-105 transition-transform duration-300 bg-black shadow-md shadow-[#e09824]/10"
          />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm sm:text-xl tracking-wider gold-text-gradient font-mono">
                GOLDENBREAK
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-800/40 p-1 rounded-full border border-white/5">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-[#e09824] text-black shadow-md shadow-[#e09824]/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{isAr ? 'قائمة الطعام • Menu' : 'Menu'}</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('venue')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'venue'
                ? 'bg-[#e09824] text-black shadow-md shadow-[#e09824]/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'جولة في الصالة' : 'Venue Tour'}</span>
            </div>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* WhatsApp Direct Button */}
          <a
            href="https://wa.me/9647504596543"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 active:scale-95 transition-all"
            title="تواصل معنا عبر واتساب"
          >
            <MessageCircle className="w-5 h-5 fill-black stroke-[1.5]" />
          </a>

          {/* Instagram Button */}
          <a
            href="https://instagram.com/goldenbreak.dhk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10 hover:brightness-110 active:scale-95 transition-all"
            title="حساب إنستغرام"
          >
            <Instagram className="w-5 h-5 stroke-[2]" />
          </a>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#e09824] text-black font-bold shadow-lg shadow-[#e09824]/20 hover:brightness-110 active:scale-95 transition-all"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#101418] animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
