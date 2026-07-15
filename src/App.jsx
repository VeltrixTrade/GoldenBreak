import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import CartDrawer from './components/CartDrawer';
import AdminModal from './components/AdminModal';
import VenueShowcase from './components/VenueShowcase';
import { DEFAULT_CATEGORIES, DEFAULT_ITEMS } from './data/initialData';
import { 
  Gamepad2, Phone, MapPin, Clock, Heart, UtensilsCrossed, Instagram, MessageCircle,
  ArrowLeft, Search, SlidersHorizontal, Layers, Utensils, Drumstick, Pizza, GlassWater,
  Coffee, Dessert, CircleDot, Zap, Flame, Sparkles, ChevronDown
} from 'lucide-react';

const CATEGORY_ICON_MAP = {
  Utensils: Utensils,
  Drumstick: Drumstick,
  Pizza: Pizza,
  GlassWater: GlassWater,
  Coffee: Coffee,
  Dessert: Dessert,
  CircleDot: CircleDot,
  Layers: Layers,
  Zap: Zap,
  Flame: Flame,
  Sparkles: Sparkles
};

export default function App() {
  // Load initial state from LocalStorage or fall back to defaults
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gb_categories_v3');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('gb_items_v3');
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
  });

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySortOrder, setCategorySortOrder] = useState('default');
  const [itemSortOrder, setItemSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'venue'

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Secret Admin Access via Keyboard Shortcut (Ctrl + Shift + A) or URL Hash (#admin)
  useEffect(() => {
    // Check URL Hash on initial load
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    const handleKeyDown = (e) => {
      // Ctrl + Shift + A or Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save to LocalStorage whenever categories or items change
  useEffect(() => {
    localStorage.setItem('gb_categories_v3', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('gb_items_v3', JSON.stringify(items));
  }, [items]);

  // Cart Functions
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Admin Actions
  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    if (selectedCategory === catId) setSelectedCategory(null);
  };

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleResetData = () => {
    setCategories(DEFAULT_CATEGORIES);
    setItems(DEFAULT_ITEMS);
    localStorage.removeItem('gb_categories');
    localStorage.removeItem('gb_items');
    localStorage.removeItem('gb_categories_v2');
    localStorage.removeItem('gb_items_v2');
    localStorage.removeItem('gb_categories_v3');
    localStorage.removeItem('gb_items_v3');
  };

  // Sort and filter categories for home page
  const sortedCategories = useMemo(() => {
    // Filter out the 'all' meta category from the categories grid
    const list = categories.filter((c) => c.id !== 'all');

    if (categorySortOrder === 'alphabetical') {
      return [...list].sort((a, b) => (a.nameAr || '').localeCompare(b.nameAr || '', 'ar'));
    }

    if (categorySortOrder === 'items-count') {
      return [...list].sort((a, b) => {
        const countA = items.filter((item) => item.category === a.id).length;
        const countB = items.filter((item) => item.category === b.id).length;
        return countB - countA; // descending
      });
    }

    return list; // default
  }, [categories, categorySortOrder, items]);

  // Global search results (shown on homepage if search query is typed)
  const globalSearchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      const nameAr = (item.nameAr || item.name || '').toLowerCase();
      const nameEn = (item.nameEn || '').toLowerCase();
      const descAr = (item.descriptionAr || item.description || '').toLowerCase();
      const descEn = (item.descriptionEn || '').toLowerCase();
      return (
        nameAr.includes(query) ||
        nameEn.includes(query) ||
        descAr.includes(query) ||
        descEn.includes(query)
      );
    });
  }, [items, searchQuery]);

  // Category specific items filter & sorting
  const categoryItems = useMemo(() => {
    if (!selectedCategory) return [];
    let list = items.filter((item) => item.category === selectedCategory);

    // Apply search filter if typed inside category page
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter((item) => {
        const nameAr = (item.nameAr || item.name || '').toLowerCase();
        const nameEn = (item.nameEn || '').toLowerCase();
        const descAr = (item.descriptionAr || item.description || '').toLowerCase();
        const descEn = (item.descriptionEn || '').toLowerCase();
        return (
          nameAr.includes(query) ||
          nameEn.includes(query) ||
          descAr.includes(query) ||
          descEn.includes(query)
        );
      });
    }

    // Apply sorting
    if (itemSortOrder === 'price-low') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (itemSortOrder === 'price-high') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (itemSortOrder === 'popular') {
      return [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    if (itemSortOrder === 'name') {
      return [...list].sort((a, b) => (a.nameAr || '').localeCompare(b.nameAr || '', 'ar'));
    }

    return list;
  }, [items, selectedCategory, searchQuery, itemSortOrder]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      
      {/* Top Header Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME (Hero + Categories Grid / Global Search) */}
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreMenu={() => {
                const element = document.getElementById('categories-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {selectedCategory === null ? (
              /* categories list view on home page */
              <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
                
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-white/5 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                      <span className="w-3.5 h-8 bg-amber-500 rounded-full inline-block"></span>
                      <span>أقسام المنيو الفاخرة • Menu Categories</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1.5">اختر القسم الذي تفضله لتصفح أشهى المأكولات والمشروبات والخدمات</p>
                  </div>

                  {/* Controls: Global Search + Categories Sorting */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Global Search Input */}
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="ابحث عن وجبة أو مشروب... / Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 rounded-2xl bg-dark-800 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs bg-dark-700 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-xl transition-all"
                        >
                          مسح
                        </button>
                      )}
                    </div>

                    {/* Categories Sort Dropdown */}
                    {!searchQuery && (
                      <div className="relative w-full sm:w-56">
                        <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select
                          value={categorySortOrder}
                          onChange={(e) => setCategorySortOrder(e.target.value)}
                          className="w-full pl-8 pr-10 py-3 rounded-2xl bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none font-bold cursor-pointer"
                        >
                          <option value="default">الترتيب الافتراضي • Default</option>
                          <option value="alphabetical">أبجدياً (العربية) • A-Z</option>
                          <option value="items-count">حسب عدد العناصر • Popular</option>
                        </select>
                        <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content Render (Global Search Results OR Categories Grid) */}
                {searchQuery ? (
                  /* Global Search Results */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-300">
                        نتائج البحث عن: <span className="text-amber-400 font-black">"{searchQuery}"</span> ({globalSearchResults.length} نتيجة)
                      </h3>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-amber-400 hover:underline"
                      >
                        العودة للأقسام
                      </button>
                    </div>

                    {globalSearchResults.length === 0 ? (
                      <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 space-y-4">
                        <UtensilsCrossed className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                        <h3 className="text-xl font-bold text-slate-300">لم يتم العثور على نتائج • No items found</h3>
                        <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {globalSearchResults.map((item) => (
                          <MenuCard
                            key={item.id}
                            item={item}
                            onAddToCart={handleAddToCart}
                            inCart={cart.some((c) => c.id === item.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Categories Card Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-sans">
                    {sortedCategories.map((cat) => {
                      const IconComponent = CATEGORY_ICON_MAP[cat.icon] || Layers;
                      const itemCount = items.filter((item) => item.category === cat.id).length;
                      const nameAr = cat.nameAr || cat.name || '';
                      const nameEn = cat.nameEn || '';

                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group bg-dark-800/80 border border-white/5 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between h-48 cursor-pointer transform hover:-translate-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                              <IconComponent className="w-6 h-6 stroke-[2]" />
                            </div>
                            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/5 text-slate-400 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                              {itemCount} {itemCount >= 11 ? 'عنصر' : 'عناصر'}
                            </span>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                              {nameAr}
                            </h3>
                            {nameEn && (
                              <p className="text-xs text-slate-400 font-mono font-medium mt-0.5 opacity-80">
                                {nameEn}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-end text-xs text-amber-400/70 group-hover:text-amber-400 font-bold gap-1 mt-2">
                            <span>عرض القسم</span>
                            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ) : (
              /* Specific Category Detail Page */
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
                {/* Back Button */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 border border-white/10 hover:border-amber-500/40 hover:text-white transition-all font-bold text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                    <span>العودة للأقسام الرئيسية • Back to Categories</span>
                  </button>
                </div>

                {/* Category Header */}
                {(() => {
                  const catObj = categories.find((c) => c.id === selectedCategory);
                  const IconComponent = catObj ? (CATEGORY_ICON_MAP[catObj.icon] || Layers) : Layers;
                  return catObj ? (
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-gradient-to-r from-amber-500/10 via-dark-800 to-dark-800 border border-white/5 rounded-3xl p-6 sm:p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
                          <IconComponent className="w-8 h-8 stroke-[2.5]" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-black text-white">
                            {catObj.nameAr}
                          </h2>
                          {catObj.nameEn && (
                            <p className="text-sm text-amber-400 font-mono font-bold mt-0.5 uppercase tracking-wide">
                              {catObj.nameEn}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Controls: Search inside Category + Sort Category Items */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {/* Search in Category */}
                        <div className="relative w-full sm:w-60">
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="ابحث في هذا القسم... / Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-9 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-dark-700 hover:bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded transition-all"
                            >
                              مسح
                            </button>
                          )}
                        </div>

                        {/* Items Sort Dropdown */}
                        <div className="relative w-full sm:w-52 font-bold">
                          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <select
                            value={itemSortOrder}
                            onChange={(e) => setItemSortOrder(e.target.value)}
                            className="w-full pl-8 pr-9 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                          >
                            <option value="default">الترتيب الافتراضي • Default</option>
                            <option value="price-low">السعر: من الأقل للأعلى • Price Low</option>
                            <option value="price-high">السعر: من الأعلى للأقل • Price High</option>
                            <option value="popular">الأكثر شعبية ⭐ Popular</option>
                            <option value="name">ترتيب بالاسم أبجدياً • Name</option>
                          </select>
                          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Items Grid */}
                {categoryItems.length === 0 ? (
                  <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 space-y-4">
                    <UtensilsCrossed className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                    <h3 className="text-xl font-bold text-slate-300">لم يتم العثور على أطباق • No items found</h3>
                    <p className="text-xs text-slate-500">
                      هذا القسم فارغ حالياً أو لم يتم العثور على نتائج بحث مطابقة.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                    {categoryItems.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        inCart={cart.some((c) => c.id === item.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Venue Showcase */}
            <VenueShowcase />
          </>
        )}

        {/* VIEW 2: VENUE SHOWCASE PAGE */}
        {activeTab === 'venue' && (
          <VenueShowcase />
        )}

      </main>

      {/* Slide-over & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        items={items}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onResetData={handleResetData}
      />

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 md:gap-4 pointer-events-auto">
        <a
          href="https://wa.me/9647504596543"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-black shadow-xl shadow-emerald-500/40 hover:scale-110 hover:bg-emerald-400 active:scale-95 transition-all border border-emerald-400/20"
          title="واتساب مباشر"
        >
          <MessageCircle className="w-6 h-6 fill-black stroke-[1.5]" />
        </a>

        <a
          href="https://instagram.com/goldenbreak.dhk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all border border-white/10"
          title="حساب الإنستغرام"
        >
          <Instagram className="w-6 h-6 stroke-[2]" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400 text-sm">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="GOLDENBREAK Logo" 
                className="w-11 h-11 rounded-full object-cover border border-amber-500/20 bg-black shadow-md shadow-amber-500/5"
              />
              <span className="text-2xl font-black gold-text-gradient font-mono">GOLDENBREAK</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              مطعم وصالة بلياردو وسنوكر فاخرة. نضمن لك تجربة ترفيهية وطعام طازج بأعلى المستويات.
            </p>
            <div className="pt-1">
              <a
                href="https://instagram.com/goldenbreak.dhk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>@goldenbreak.dhk</span>
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-base mb-3">أوقات العمل والمعلومات • Info</h4>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>مفتوح يومياً: من 10:00 صباحاً حتى 02:00 ليلاً</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>الخط الرئيسي: 0750 459 6543</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>الخط الثاني: 0751 531 5442</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>الموقع: الشارع الرئيسي، صالة جولدن بريك VIP</span>
            </div>
          </div>

          {/* Direct WhatsApp Action Buttons */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base">الحجز والطلب المباشر • WhatsApp</h4>
            <p className="text-xs leading-relaxed">
              تواصل معنا مباشرة عبر أرقام الواتساب المعتمدة للإدارة:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/9647504596543"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>خط الواتساب 1</span>
                </div>
                <span className="font-mono">0750 459 6543</span>
              </a>

              <a
                href="https://wa.me/9647515315442"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-dark-700 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 font-extrabold text-xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>خط الواتساب 2</span>
                </div>
                <span className="font-mono">0751 531 5442</span>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 GOLDENBREAK Lounge & Restaurant (@goldenbreak.dhk). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>صنع بـ</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </footer>

    </div>
  );
}
