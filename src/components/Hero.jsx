import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, Gamepad2, Utensils, Award, Clock } from 'lucide-react';

export default function Hero({ onExploreMenu, onBookTable }) {
  const photos = [
    { src: '/venue_main.jpg', title: 'صالة البلياردو الرئيسية', subtitle: 'طاولات Mr-Sung وإضاءات سقفية فاخرة' },
    { src: '/venue_coffee.jpg', title: 'كافيه ومشروبات مختصة', subtitle: 'إسبريسو، عصائر وكوكتيلات منعشة' },
    { src: '/venue_snooker.jpg', title: 'طاولات السنوكر الاحترافية', subtitle: 'أعلى معايير الجودة والهدوء للبطولات' },
    { src: '/venue_billiards.jpg', title: 'أجواء صالة VIP', subtitle: 'خدمة طعام وضيافة ملكية أثناء اللعب' }
  ];

  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Text Details */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المكان الأنسب للترويق، اللعب، والوجبات الشهية</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            عالم الفخامة والتسلية في <br />
            <span className="gold-text-gradient font-mono">GOLDENBREAK</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
            استمتع بأشهر الوجبات السريعة والمشروبات الساخنة والباردة المنعشة، جنباً إلى جنب مع أفضل طاولات البلياردو والسنوكر الفاخرة بأجواء VIP مذهلة.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreMenu}
              className="flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Utensils className="w-5 h-5 stroke-[2.5]" />
              <span>تصفح قائمة الطعام</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onBookTable}
              className="flex items-center gap-3 px-7 py-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-white border border-white/15 font-bold text-base hover:border-amber-500/50 transition-all"
            >
              <Gamepad2 className="w-5 h-5 text-amber-400" />
              <span>حجز طاولة لعب</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="bg-dark-800/60 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 font-bold text-sm mb-1">
                <Award className="w-4 h-4" />
                <span>جودة عالية</span>
              </div>
              <p className="text-xs text-slate-400">طاولات سنوكر وبلياردو عالمية</p>
            </div>

            <div className="bg-dark-800/60 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 font-bold text-sm mb-1">
                <Utensils className="w-4 h-4" />
                <span>مأكولات متنوعة</span>
              </div>
              <p className="text-xs text-slate-400">برجر، ستيك ومشروبات</p>
            </div>

            <div className="bg-dark-800/60 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 font-bold text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>خدمة متواصلة</span>
              </div>
              <p className="text-xs text-slate-400">طوال اليوم لراحتكم</p>
            </div>
          </div>
        </div>

        {/* Image Showcase Slider */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl border border-white/15">
            <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activePhoto ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-black rounded-md w-fit mb-2">
                      GOLDENBREAK LOUNGE
                    </span>
                    <h3 className="text-2xl font-black text-white">{photo.title}</h3>
                    <p className="text-sm text-slate-300">{photo.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Nav */}
            <div className="flex justify-center gap-2 py-3 bg-dark-900/80 rounded-b-2xl">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activePhoto ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
