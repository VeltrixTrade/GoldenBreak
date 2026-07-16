import React, { useState } from 'react';

export default function Hero({ onOpenAdmin, currentLang, onLanguageChange }) {
  const [logoClicks, setLogoClicks] = useState(0);

  // Secret Admin Trigger: Triple click on the hero logo
  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 3) {
      onOpenAdmin();
      setLogoClicks(0);
    }
    setTimeout(() => setLogoClicks(0), 1500);
  };

  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Logo Container (Secret Triple-Click to open Admin) */}
        <div 
          className="cursor-pointer select-none mb-6 animate-fadeIn" 
          onClick={handleLogoClick}
          title="GOLDENBREAK - Triple click for Admin"
        >
          <img 
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full object-cover border border-[#e09824]/20 drop-shadow-[0_10px_25px_rgba(224,152,36,0.2)] hover:scale-105 transition-transform duration-500 bg-black" 
            src="/logo.png" 
            alt="GOLDENBREAK" 
          />
        </div>

        {/* Section Title */}
        <div className="text-center space-y-4">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-widest">
            BILLIARDS <span style={{ color: '#e09824' }} className="font-serif italic font-normal">&</span> CAFE
          </h1>
          
          {/* Refresh Shopping Buttons / Language Selector (styled exactly like QZONE) */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button 
              onClick={() => onLanguageChange('ar')}
              className={`px-6 py-1.5 border border-[#e09824] rounded-[17px] transition-all text-base md:text-xl font-medium ${
                currentLang === 'ar' 
                  ? 'bg-[#e09824] text-[#101418] font-bold' 
                  : 'bg-transparent text-white hover:bg-[#e09824]/20'
              }`}
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              العربي
            </button>
            <button 
              onClick={() => onLanguageChange('en')}
              className={`px-6 py-1.5 border border-[#e09824] rounded-[17px] transition-all text-base md:text-xl font-medium ${
                currentLang === 'en' 
                  ? 'bg-[#e09824] text-[#101418] font-bold' 
                  : 'bg-transparent text-white hover:bg-[#e09824]/20'
              }`}
            >
              English
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
