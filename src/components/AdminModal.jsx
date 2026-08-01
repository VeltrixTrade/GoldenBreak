import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, DollarSign, Tag, FileText, Lock, CheckCircle, RefreshCw, Layers, Utensils, X, Image as ImageIcon } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  items,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  onResetData
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState('addItem'); // 'addItem' | 'addCategory' | 'manageItems'

  // New Item Form State (Bilingual)
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState(categories[1]?.id || 'milkshakes-smoothies');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('د.ع');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [popular, setPopular] = useState(false);
  const [itemImage, setItemImage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // New Category Form State
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Utensils');
  const [newCatImage, setNewCatImage] = useState('');

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

  // Base64 File Uploader Helper
  const handleFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
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
      popular,
      image: itemImage
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
    setItemImage('');

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
      icon: newCatIcon,
      image: newCatImage
    };

    onAddCategory(newCatObj);
    setNewCatNameAr('');
    setNewCatNameEn('');
    setNewCatImage('');
    setSuccessMsg(`تمت إضافة القسم "${newCatNameAr}" بنجاح!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-dark-800 border border-amber-500/30 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col text-white shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6 sm:p-8 pb-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                لوحة إدراج الوجبات والأقسام
                <span className="bg-amber-500 text-black text-[10px] px-2.5 py-0.5 rounded-full font-extrabold">ADMIN</span>
              </h2>
              <p className="text-xs text-slate-400">إدارة الوجبات والأسعار والأقسام مع إمكانية رفع وتعديل الصور</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-dark-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pt-4">

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

                {/* Image Upload Widget */}
                <div className="border border-white/5 bg-dark-900/40 p-4 rounded-2xl space-y-3">
                  <span className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    صورة الوجبة (اختياري)
                  </span>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Thumbnail Preview */}
                    <div className="w-16 h-16 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {itemImage ? (
                        <img src={itemImage} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Utensils className="w-6 h-6 text-slate-500" />
                      )}
                    </div>
                    {/* File upload or URL inputs */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex gap-2">
                        <label className="flex-1 flex items-center justify-center px-4 py-2 bg-dark-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-white/5 cursor-pointer transition-all">
                          <span>رفع صورة من الجهاز</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, setItemImage)} 
                          />
                        </label>
                        {itemImage && (
                          <button
                            type="button"
                            onClick={() => setItemImage('')}
                            className="px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs font-bold border border-red-500/20 transition-all"
                          >
                            حذف
                          </button>
                        )}
                      </div>
                      <input 
                        type="text"
                        placeholder="أو ضع رابط صورة مباشر (URL)..."
                        value={itemImage}
                        onChange={(e) => setItemImage(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                      />
                    </div>
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
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:border-amber-500 outline-none mb-3"
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

                  {/* Category Image Upload */}
                  <div className="border border-white/5 bg-dark-900/40 p-4 rounded-2xl space-y-3">
                    <span className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      صورة القسم (اختياري)
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Thumbnail Preview */}
                      <div className="w-16 h-16 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {newCatImage ? (
                          <img src={newCatImage} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <Layers className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                      {/* File upload or URL inputs */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex gap-2">
                          <label className="flex-1 flex items-center justify-center px-4 py-2 bg-dark-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-white/5 cursor-pointer transition-all">
                            <span>رفع صورة القسم</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, setNewCatImage)} 
                            />
                          </label>
                          {newCatImage && (
                            <button
                              type="button"
                              onClick={() => setNewCatImage('')}
                              className="px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs font-bold border border-red-500/20 transition-all"
                            >
                              حذف
                            </button>
                          )}
                        </div>
                        <input 
                          type="text"
                          placeholder="أو رابط صورة القسم (URL)..."
                          value={newCatImage}
                          onChange={(e) => setNewCatImage(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-dark-700 border border-white/10 text-xs text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-extrabold text-sm hover:brightness-110 transition-all mt-3"
                  >
                    إضافة القسم
                  </button>
                </form>

                {/* Existing Categories List */}
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-3">الأقسام الحالية (اضغط على الصورة لتعديلها):</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categories.filter(c => c.id !== 'all').map((cat) => {
                      const getCatPlaceholder = (catId) => {
                        switch (catId) {
                          case 'shisha': return '/category/hookah.jpg';
                          case 'mojitos': return '/category/mojitos.jpg';
                          case 'milkshakes-smoothies': return '/category/milkshakes.jpg';
                          case 'crepes': return '/category/crepes.jpg';
                          case 'sweets-snacks': return '/category/sweets.jpg';
                          case 'cocktails-juices': return '/category/juices.jpg';
                          case 'hot-drinks': return '/category/hot_drinks.jpg';
                          case 'mexican-energy': case 'energy-drinks': return '/category/mexican_energy.jpg';
                          case 'soft-drinks': return '/category/soft_drinks.jpg';
                          case 'billiards': return '/category/billiards.jpg';
                          default: return '/category/milkshakes.jpg';
                        }
                      };

                      return (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-dark-700/60 border border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            {/* Clickable thumbnail to update picture */}
                            <label className="relative w-10 h-10 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer group flex-shrink-0" title="اضغط لتغيير الصورة">
                              <img src={cat.image || getCatPlaceholder(cat.id)} className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" alt="" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Plus className="w-3 h-3 text-white" />
                              </div>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileChange(e, (base64) => onUpdateCategory({ ...cat, image: base64 }))} 
                              />
                            </label>
                            <span className="text-sm font-bold text-white">
                              {cat.nameAr || cat.name} {cat.nameEn ? `(${cat.nameEn})` : ''}
                            </span>
                          </div>
                          <button
                            onClick={() => onDeleteCategory(cat.id)}
                            className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                            title="حذف القسم"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE ITEMS */}
            {activeTab === 'manageItems' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">إجمالي الوجبات في القائمة: {items.length} (اضغط على صورة الوجبة لتغييرها)</p>
                  <button
                    onClick={onResetData}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط القائمة الافتراضية</span>
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                  {items.map((item) => {
                    const getPlaceholderImage = (itemCat) => {
                      switch (itemCat) {
                        case 'mojitos': return '/category/mojitos.jpg';
                        case 'milkshakes-smoothies': return '/category/milkshakes.jpg';
                        case 'crepes': return '/category/crepes.jpg';
                        case 'sweets-snacks': return '/category/sweets.jpg';
                        case 'cocktails-juices': return '/category/juices.jpg';
                        case 'hot-drinks': return '/category/hot_drinks.jpg';
                        case 'mexican-energy': case 'energy-drinks': return '/category/mexican_energy.jpg';
                        case 'soft-drinks': return '/category/soft_drinks.jpg';
                        case 'shisha': return '/category/hookah.jpg';
                        case 'billiards': return '/category/billiards.jpg';
                        default: return '/category/milkshakes.jpg';
                      }
                    };

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-dark-700/60 border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Clickable thumbnail to update picture */}
                          <label className="relative w-11 h-11 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer group flex-shrink-0" title="اضغط لتغيير الصورة">
                            <img src={item.image || getPlaceholderImage(item.category)} className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" alt="" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Plus className="w-3 h-3 text-white" />
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, (base64) => onUpdateItem({ ...item, image: base64 }))} 
                            />
                          </label>
                          <div className="min-w-0">
                            <h5 className="text-sm font-bold text-white truncate">
                              {item.nameAr || item.name} {item.nameEn ? `(${item.nameEn})` : ''}
                            </h5>
                            <p className="text-xs text-slate-400">
                              {item.categoryNameAr || item.categoryName} • <span className="text-amber-400 font-bold font-mono">{typeof item.price === 'number' ? item.price.toLocaleString() : item.price} {item.currency || 'د.ع'}</span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="حذف الوجبة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}
        </div>

      </div>
    </div>
  );
}
