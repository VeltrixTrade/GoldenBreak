import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, DollarSign, Tag, FileText, Lock, CheckCircle, RefreshCw, Layers, Utensils, X } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  items,
  onAddItem,
  onDeleteItem,
  onResetData
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState('addItem'); // 'addItem' | 'addCategory' | 'manageItems'

  // New Item Form State (Bilingual)
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState(categories[1]?.id || 'fast-food');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('د.ع');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [popular, setPopular] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // New Category Form State
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Utensils');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'GoldemBreak_Admin2026') {
      setAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!nameAr || !price) return;

    const selectedCategoryObj = categories.find((c) => c.id === category);

    const newItem = {
      id: `item-${Date.now()}`,
      nameAr,
      nameEn,
      category,
      categoryNameAr: selectedCategoryObj?.nameAr || selectedCategoryObj?.name || 'وجبة',
      categoryNameEn: selectedCategoryObj?.nameEn || '',
      price: parseFloat(price),
      currency,
      descriptionAr,
      descriptionEn,
      popular
    };

    onAddItem(newItem);
    setSuccessMsg(`تمت إضافة "${nameAr}" بنجاح!`);
    
    // Reset form
    setNameAr('');
    setNameEn('');
    setPrice('');
    setDescriptionAr('');
    setDescriptionEn('');
    setPopular(false);

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatNameAr) return;

    const newCatId = `cat-${Date.now()}`;
    const newCatObj = {
      id: newCatId,
      nameAr: newCatNameAr,
      nameEn: newCatNameEn,
      icon: newCatIcon
    };

    onAddCategory(newCatObj);
    setNewCatNameAr('');
    setNewCatNameEn('');
    setSuccessMsg(`تمت إضافة القسم "${newCatNameAr}" بنجاح!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-dark-800 border border-amber-500/30 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-black flex items-center gap-2">
                لوحة إدراج الوجبات والأقسام
                <span className="bg-amber-500 text-black text-[10px] px-2.5 py-0.5 rounded-full font-extrabold">ADMIN</span>
              </h2>
              <p className="text-xs text-slate-400">إدارة الوجبات بالنكهتين العربية والإنجليزية وبدون صور طعام</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-dark-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Form if not logged in */}
        {!authenticated ? (
          <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">تسجيل دخول الإدارة</h3>
              <p className="text-xs text-slate-400 mt-1">أدخل كلمة المرور الخاصة بالإدارة للدخول إلى لوحة التحكم</p>
            </div>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="كلمة المرور..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-center text-white text-base outline-none focus:border-amber-500"
              />
              {passError && (
                <p className="text-xs text-red-400 font-bold">كلمة المرور غير صحيحة!</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-black text-base hover:brightness-110 transition-all"
              >
                الدخول فوراً
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/* Admin Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-dark-900 rounded-2xl border border-white/5">
              <button
                onClick={() => setActiveTab('addItem')}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'addItem'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>إضافة وجبة / مشروب</span>
              </button>

              <button
                onClick={() => setActiveTab('addCategory')}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'addCategory'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>إضافة قسم جديد</span>
              </button>

              <button
                onClick={() => setActiveTab('manageItems')}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'manageItems'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>إدارة القائمة ({items.length})</span>
              </button>
            </div>

            {/* Notification Banner */}
            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* TAB 1: ADD MEAL OR DRINK */}
            {activeTab === 'addItem' && (
              <form onSubmit={handleCreateItem} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Arabic Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">الاسم بالعربي *</label>
                    <div className="relative">
                      <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="مثلاً: وجبة كريسبي..."
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* English Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">الاسم بالإنجليزي (English Name)</label>
                    <input
                      type="text"
                      placeholder="e.g. Crispy Meal..."
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">اختر القسم *</label>
                    <div className="relative">
                      <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                      >
                        {categories.filter(c => c.id !== 'all').map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nameAr || cat.name} {cat.nameEn ? `(${cat.nameEn})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">السعر (مثال: 5000) *</label>
                    <div className="relative">
                      <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="number"
                        step="500"
                        required
                        placeholder="مثلاً: 5000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                </div>

                {/* Description Arabic & English */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">الوصف بالعربي</label>
                    <textarea
                      rows={2}
                      placeholder="وصف مختصر بالعربي..."
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">الوصف بالإنجليزي (English Description)</label>
                    <textarea
                      rows={2}
                      placeholder="Short English description..."
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Popular Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="popular-check"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="popular-check" className="text-xs font-bold text-slate-300 cursor-pointer">
                    تمييز كـ "الأكثر طلباً ⭐ Popular"
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all mt-4"
                >
                  حفظ وإضافة الوجبة فوراً
                </button>
              </form>
            )}

            {/* TAB 2: ADD NEW CATEGORY */}
            {activeTab === 'addCategory' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateCategory} className="space-y-4 p-4 bg-dark-900/60 rounded-2xl border border-white/5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    إضافة قسم جديد
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">اسم القسم بالعربي *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثلاً: معجنات..."
                        value={newCatNameAr}
                        onChange={(e) => setNewCatNameAr(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">اسم القسم بالإنجليزي (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. Pastries..."
                        value={newCatNameEn}
                        onChange={(e) => setNewCatNameEn(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">أيقونة القسم</label>
                    <select
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none"
                    >
                      <option value="Utensils">🍴 وجبات عامة (Utensils)</option>
                      <option value="Drumstick">🍗 فاست فود ولحوم (Drumstick)</option>
                      <option value="Pizza">🍕 بيتزا ومعجنات (Pizza)</option>
                      <option value="GlassWater">🍹 عصائر وسموزي (GlassWater)</option>
                      <option value="Coffee">☕ مشروبات ساخنة (Coffee)</option>
                      <option value="Dessert">🍰 حلويات وكريب (Dessert)</option>
                      <option value="Zap">⚡ طاقة ومكسيكيات (Zap)</option>
                      <option value="Flame">🔥 نراكيل وشيشة (Flame)</option>
                      <option value="Sparkles">✨ موهيتو وسبيشل (Sparkles)</option>
                      <option value="CircleDot">🎱 بلياردو وألعاب (CircleDot)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 text-black font-extrabold text-sm hover:brightness-110 transition-all"
                  >
                    إضافة القسم
                  </button>
                </form>

                {/* Existing Categories List */}
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-3">الأقسام الحالية:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-dark-700/60 border border-white/5"
                      >
                        <span className="text-sm font-bold text-white">
                          {cat.nameAr || cat.name} {cat.nameEn ? `(${cat.nameEn})` : ''}
                        </span>
                        <button
                          onClick={() => onDeleteCategory(cat.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          title="حذف القسم"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE ITEMS */}
            {activeTab === 'manageItems' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">إجمالي الوجبات في القائمة: {items.length}</p>
                  <button
                    onClick={onResetData}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط القائمة الافتراضية</span>
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-dark-700/60 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-bold text-white truncate">
                          {item.nameAr || item.name} {item.nameEn ? `(${item.nameEn})` : ''}
                        </h5>
                        <p className="text-xs text-slate-400">
                          {item.categoryNameAr || item.categoryName} • <span className="text-amber-400 font-bold font-mono">{typeof item.price === 'number' ? item.price.toLocaleString() : item.price} {item.currency || 'د.ع'}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="حذف الوجبة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
