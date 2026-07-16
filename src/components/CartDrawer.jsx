import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, lang }) {
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Primary WhatsApp number for orders: 07504596543 (+9647504596543)
  const getWhatsAppUrl = () => {
    const itemsListText = cartItems
      .map(item => `• ${isAr ? (item.nameAr || item.name) : (item.nameEn || item.nameAr)} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} IQD`)
      .join('\n');

    const fullMessage =
      (isAr 
        ? `السلام عليكم، طلب جديد من صالة GOLDENBREAK (@goldenbreak.dhk):\n\n` 
        : `Hello, new order from GOLDENBREAK (@goldenbreak.dhk):\n\n`) +
      (isAr ? `📦 الوجبات والمشروبات:\n` : `📦 Items & Drinks:\n`) + `${itemsListText}\n\n` +
      (isAr ? `💰 المجموع الكلي: ` : `💰 Total Amount: `) + `${totalPrice.toLocaleString()} IQD\n` +
      (tableNumber ? (isAr ? `📍 رقم الطاولة / VIP: ${tableNumber}\n` : `📍 Table / VIP Number: ${tableNumber}\n`) : '') +
      (notes ? (isAr ? `📝 ملاحظات: ${notes}` : `📝 Notes: ${notes}`) : '');

    return `https://wa.me/9647504596543?text=${encodeURIComponent(fullMessage)}`;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setOrderSubmitted(true);
    // Automatically open WhatsApp with order details
    window.open(getWhatsAppUrl(), '_blank');
  };

  const resetAndClose = () => {
    onClearCart();
    setOrderSubmitted(false);
    setTableNumber('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 max-w-full flex ${isAr ? 'left-0 pl-10' : 'right-0 pr-10'}`}>
        <div className="w-screen max-w-md bg-dark-800 border-x border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black">{isAr ? 'سلة الطلبات' : 'My Cart'}</h3>
                <p className="text-xs text-slate-400">
                  {cartItems.length} {isAr ? 'عنصر' : 'items'} • @goldenbreak.dhk
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-dark-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-white">
                  {isAr ? 'تم تجهيز طلبك في الواتساب!' : 'Order ready on WhatsApp!'}
                </h4>
                <p className="text-sm text-slate-300">
                  {isAr ? 'تم توجيه تفاصيل طلبك للإدارة على الواتساب:' : 'Order details sent to admin on WhatsApp:'}
                </p>
                <div className="flex flex-col gap-1 text-emerald-400 font-bold font-mono text-sm">
                  <span>0750 459 6543</span>
                  <span>0751 531 5442</span>
                </div>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 text-black font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>{isAr ? 'فتح تطبيق الواتساب مجدداً' : 'Reopen WhatsApp app'}</span>
                </a>

                <div className="p-4 bg-dark-700/60 rounded-xl text-xs text-amber-400 font-medium border border-amber-500/20">
                  {isAr 
                    ? 'شكراً لزيارتك صالة GOLDENBREAK (@goldenbreak.dhk)! نتمنى لك وقتاً ممتعاً.'
                    : 'Thank you for visiting GOLDENBREAK (@goldenbreak.dhk)! Enjoy your time.'
                  }
                </div>

                <button
                  onClick={resetAndClose}
                  className="w-full py-3 rounded-xl bg-dark-700 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-all"
                >
                  {isAr ? 'العودة للقائمة الرئيسية' : 'Return to main menu'}
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                <h4 className="text-lg font-bold text-slate-300">{isAr ? 'سلتك فارغة حالياً' : 'Your cart is empty'}</h4>
                <p className="text-xs text-slate-500">
                  {isAr 
                    ? 'اختر من الوجبات والمشروبات اللذيذة في القائمة لإضافتها هنا.' 
                    : 'Choose delicious food and drinks from the menu to add them here.'
                  }
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const nameAr = item.nameAr || item.name || '';
                const nameEn = item.nameEn || '';

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-dark-700/60 border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-white truncate">{isAr ? nameAr : (nameEn || nameAr)}</h5>
                      {!isAr && nameAr && nameEn && <span className="text-[10px] text-amber-400/90 block">{nameAr}</span>}
                      {isAr && nameEn && <span className="text-[10px] text-amber-400/90 font-mono block">{nameEn}</span>}
                      <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                        {typeof item.price === 'number' ? item.price.toLocaleString() : item.price} <span className="font-sans text-xs">{item.currency || 'د.ع'}</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-dark-900 px-2 py-1 rounded-lg border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-dark-700 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-dark-700 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title={isAr ? 'حذف من السلة' : 'Remove item'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Form */}
          {!orderSubmitted && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-dark-900/90 space-y-4">
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isAr ? 'رقم الطاولة / VIP' : 'Table / VIP Number'}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'طاولة 5' : 'Table 5'}
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isAr ? 'ملاحظات' : 'Notes'}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'سكر قليل، بدون ثلج...' : 'Less sugar, etc...'}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-slate-300">{isAr ? 'المجموع الكلي' : 'Total Amount'}</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {totalPrice.toLocaleString()} <span className="text-sm font-sans text-amber-300">{isAr ? 'د.ع' : 'IQD'}</span>
                </span>
              </div>

              {/* Submit to WhatsApp Button */}
              <button
                onClick={handleSubmitOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-black font-extrabold text-base shadow-xl shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-black stroke-[2]" />
                <span>{isAr ? 'إرسال الطلب عبر الواتساب' : 'Confirm Order on WhatsApp'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
