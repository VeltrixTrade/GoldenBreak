import React, { useState } from 'react';
import { Gamepad2, Calendar, Clock, User, CheckCircle2, X } from 'lucide-react';

export default function BilliardsBookingModal({ isOpen, onClose }) {
  const [tableType, setTableType] = useState('billiards');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setDate('');
    setTime('');
    setDuration('1');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-800 border border-white/15 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-dark-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">تم حجز الطاولة بنجاح!</h3>
            <p className="text-sm text-slate-300">
              أهلاً بك عزيزي <span className="text-amber-400 font-bold">{name}</span>، تمت إضافة حجزك لطاولة ({tableType === 'billiards' ? 'بلياردو VIP' : 'سنوكر فاخرة'}) بتاريخ {date} الساعة {time}.
            </p>
            <div className="p-4 bg-dark-700/60 rounded-xl text-xs text-amber-300 border border-amber-500/20">
              يرجى التواجد قبل موعد الحجز بـ 10 دقائق لضمان تجهيز الطاولة والمشروبات.
            </div>
            <button
              onClick={resetAndClose}
              className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-extrabold text-sm hover:brightness-110 transition-all mt-4"
            >
              موافق
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black">حجز طاولة لعب VIP</h3>
                <p className="text-xs text-slate-400">اختر نوع الطاولة والوقت المناسب لك</p>
              </div>
            </div>

            {/* Table Type Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTableType('billiards')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                  tableType === 'billiards'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                    : 'bg-dark-700/60 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                🎱 طاولة بلياردو
              </button>
              <button
                type="button"
                onClick={() => setTableType('snooker')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                  tableType === 'snooker'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                    : 'bg-dark-700/60 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                🟢 طاولة سنوكر VIP
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  required
                  placeholder="07xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">التاريخ</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">وقت الحضور</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عدد الساعات المطلوبة</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                >
                  <option value="1">ساعة واحدة (50 د.ع / $)</option>
                  <option value="2">ساعتان (100 د.ع / $)</option>
                  <option value="3">3 ساعات (140 د.ع / $)</option>
                  <option value="4">أكثر من 3 ساعات (حساب VIP)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all mt-4"
            >
              تأكيد حجز الطاولة
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
