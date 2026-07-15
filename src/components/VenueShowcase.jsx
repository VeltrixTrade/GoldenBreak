import React from 'react';
import { Sparkles } from 'lucide-react';

export default function VenueShowcase() {
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

      </div>
    </section>
  );
}
