import React from 'react';
import { Gamepad2, Coffee, Sparkles, Shield, Trophy, Users } from 'lucide-react';

export default function VenueShowcase({ onBookNow }) {
  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>صالة فخمة تجمع بين اللعب والضيافة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            جولة في صالة <span className="gold-text-gradient font-mono">GOLDENBREAK</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            تجهيزات عالمية من طاولات البلياردو والسنوكر ذات القماش والأبعاد الرسمية للبطولات، مع صالة كافيه ومطعم راقية لتقديم المأكولات والمشروبات.
          </p>
        </div>

        {/* Image Grid with uploaded venue photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="group relative rounded-2xl overflow-hidden h-72 border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
            <img
              src="/venue_main.jpg"
              alt="صالة البلياردو الرئيسية"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-amber-400 text-xs font-extrabold font-mono">01. MAIN HALL</span>
              <h3 className="text-lg font-bold text-white">طاولات Mr-Sung الاحترافية</h3>
              <p className="text-xs text-slate-300 mt-0.5">إضاءة حلقة دائرية وتكييف عالي الجودة</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden h-72 border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
            <img
              src="/venue_coffee.jpg"
              alt="ركن الكافيه والإسبريسو"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-amber-400 text-xs font-extrabold font-mono">02. COFFEE BAR</span>
              <h3 className="text-lg font-bold text-white">ركن القهوة والمشروبات</h3>
              <p className="text-xs text-slate-300 mt-0.5">إسبريسو، عصائر وكوكتيلات فاخرة</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden h-72 border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
            <img
              src="/venue_snooker.jpg"
              alt="طاولة السنوكر العالمية"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-amber-400 text-xs font-extrabold font-mono">03. SNOOKER ARENA</span>
              <h3 className="text-lg font-bold text-white">طاولات السنوكر الرسمية</h3>
              <p className="text-xs text-slate-300 mt-0.5">كريات وقماش احترافي ومساحة هادئة</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden h-72 border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
            <img
              src="/venue_billiards.jpg"
              alt="خدمة الضيافة في الطاولات"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-amber-400 text-xs font-extrabold font-mono">04. VIP SERVICE</span>
              <h3 className="text-lg font-bold text-white">خدمة المأكولات والمشروبات</h3>
              <p className="text-xs text-slate-300 mt-0.5">تقديم الوجبات مباشرة إلى طاولتك</p>
            </div>
          </div>

        </div>

        {/* Features Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">معايير البطولات</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              جميع الطاولات في صالة GOLDENBREAK مجهزة بأعلى مواصفات الإتحاد الدولي للبلياردو والسنوكر.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">كافيه ومطعم متكامل</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              وجبات طازجة، بيتزا وبرجر متبل، مع تشكيلة واسعة من المشروبات الساخنة والباردة.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">أجواء عائلية وشبابية</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              إمكانية حجز طاولات VIP خاصة للأصدقاء والمجموعات لضمان أقصى درجات الخصوصية والراحة.
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">ترغب في تجربة لعب مميزة؟</h3>
            <p className="text-sm text-slate-300 mt-1">احجز طاولتك المفضلة الآن واستمتع بقضاء أجمل الأوقات معنا.</p>
          </div>

          <button
            onClick={onBookNow}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            حجز طاولة بلياردو الآن
          </button>
        </div>

      </div>
    </section>
  );
}
