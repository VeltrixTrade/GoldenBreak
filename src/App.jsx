import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import CartDrawer from './components/CartDrawer';
import AdminModal from './components/AdminModal';
import VenueShowcase from './components/VenueShowcase';
import ParticlesBackground from './components/ParticlesBackground';
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
  const [lang, setLang] = useState('ar'); // 'ar' | 'en'

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

  const handleUpdateCategory = (updatedCat) => {
    setCategories((prev) => prev.map((c) => c.id === updatedCat.id ? updatedCat : c));
  };

  const handleUpdateItem = (updatedItem) => {
    setItems((prev) => prev.map((i) => i.id === updatedItem.id ? updatedItem : i));
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
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <ParticlesBackground />
      
      {/* Top Header Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME (Hero + Categories Grid / Global Search) */}
        {activeTab === 'home' && (
          <>
            <Hero onOpenAdmin={() => setIsAdminOpen(true)} currentLang={lang} onLanguageChange={setLang} />

            {selectedCategory === null ? (
              /* categories list view on home page */
              <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20">
                
                {/* Search & Filter Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-light text-white flex items-center gap-3">
                      <span className="w-3 h-8 bg-[#e09824] rounded-full inline-block"></span>
                      <span>{lang === 'ar' ? 'أقسام المنيو' : 'Menu Categories'}</span>
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      {lang === 'ar' ? 'تصفح أشهى الأطباق والمشروبات بأقسامنا المتنوعة' : 'Browse our premium food and drinks in various categories'}
                    </p>
                  </div>

                  {/* Controls: Global Search + Categories Sorting */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Global Search Input */}
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder={lang === 'ar' ? 'ابحث عن وجبة أو مشروب...' : 'Search for a dish or drink...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-dark-800 border border-white/5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#e09824]/60 focus:ring-1 focus:ring-[#e09824]/20 transition-all font-medium"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] bg-dark-700 hover:bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded transition-all"
                        >
                          {lang === 'ar' ? 'مسح' : 'Clear'}
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
                          className="w-full pl-8 pr-10 py-2.5 rounded-xl bg-dark-800 border border-white/5 text-white text-xs focus:outline-none focus:border-[#e09824]/60 focus:ring-1 focus:ring-[#e09824]/20 transition-all appearance-none font-bold cursor-pointer"
                        >
                          <option value="default">{lang === 'ar' ? 'الترتيب الافتراضي' : 'Default Order'}</option>
                          <option value="alphabetical">{lang === 'ar' ? 'أبجدياً (العربية)' : 'Alphabetical (A-Z)'}</option>
                          <option value="items-count">{lang === 'ar' ? 'حسب عدد العناصر' : 'Popularity (Item Count)'}</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content Render (Global Search Results OR Categories Grid) */}
                {searchQuery ? (
                  /* Global Search Results */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-slate-300">
                        {lang === 'ar' ? 'نتائج البحث عن:' : 'Search results for:'} <span className="text-[#e09824] font-black">"{searchQuery}"</span> ({globalSearchResults.length} {lang === 'ar' ? 'نتيجة' : 'results'})
                      </h3>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-[#e09824] hover:underline"
                      >
                        {lang === 'ar' ? 'العودة للأقسام' : 'Back to Categories'}
                      </button>
                    </div>

                    {globalSearchResults.length === 0 ? (
                      <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 space-y-4">
                        <UtensilsCrossed className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                        <h3 className="text-lg font-bold text-slate-300">{lang === 'ar' ? 'لم يتم العثور على نتائج' : 'No items found'}</h3>
                        <p className="text-xs text-slate-500">{lang === 'ar' ? 'جرب البحث بكلمات أخرى.' : 'Try searching with other words.'}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 max-w-6xl mx-auto">
                        {globalSearchResults.map((item) => (
                          <MenuCard
                            key={item.id}
                            item={item}
                            onAddToCart={handleAddToCart}
                            inCart={cart.some((c) => c.id === item.id)}
                            lang={lang}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Qzone style categories list mapping */
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mt-6">
                    {sortedCategories.map((cat) => {
                      const nameAr = cat.nameAr || cat.name || '';
                      const nameEn = cat.nameEn || '';

                      const getCategoryImg = (catId) => {
                        switch (catId) {
                          case 'shisha':
                            return '/category/hookah_1774332374.png';
                          case 'mojitos':
                            return '/category/mojito.png';
                          case 'milkshakes-smoothies':
                            return '/category/milkshake.png';
                          case 'crepes':
                          case 'sweets-snacks':
                            return '/category/desserts.png';
                          case 'cocktails-juices':
                            return '/category/organic_juice.png';
                          case 'hot-drinks':
                            return '/category/hot_drinks.png';
                          case 'mexican-energy':
                          case 'energy-drinks':
                            return '/category/redbull.png';
                          case 'soft-drinks':
                            return '/category/cold_drinks.png';
                          case 'fast-food':
                            return '/category/food.png';
                          default:
                            return '/category/food.png';
                        }
                      };

                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group cursor-pointer flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2"
                        >
                          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 bg-dark-900/10 border border-white/5 hover:border-[#e09824]/20">
                            <img 
                              src={cat.image || getCategoryImg(cat.id)} 
                              alt={nameEn} 
                              className="w-[90%] h-[90%] object-contain group-hover:scale-115 transition-transform duration-500"
                            />
                          </div>
                          <span className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center mt-4 group-hover:text-[#e09824] transition-colors">
                            {nameEn || nameAr}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ) : (
              /* Specific Category Detail Page styled like QZONE */
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                
                {/* QZONE style back button peeking from left edge */}
                <a
                  href="javascript:void(0);"
                  id="backbtn1"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  title="العودة للأقسام"
                >
                  <img 
                    src="/arrow.png" 
                    style={{ width: '20px', height: '20px', transform: 'rotate(180deg)' }} 
                    alt="Back"
                  />
                </a>

                {/* Spinning top about image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center rounded-full overflow-hidden bg-dark-900/35 border border-white/5">
                    <img 
                      src="/about.png" 
                      alt="about decorator" 
                      className="w-[85%] h-[85%] object-contain opacity-20 animate-[spin_40s_linear_infinite]"
                    />
                  </div>
                </div>

                {/* Category Header */}
                {(() => {
                  const catObj = categories.find((c) => c.id === selectedCategory);
                  return catObj ? (
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                      <span className="text-[#e09824] font-serif italic text-lg block mb-1">Delicious</span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-300 uppercase tracking-widest">
                        {lang === 'ar' ? (catObj.nameAr || catObj.nameEn) : (catObj.nameEn || catObj.nameAr)}
                      </h2>
                      <hr className="border-t border-[#e09824] my-6 max-w-xs mx-auto opacity-70" />

                      {/* Controls inside category detail page */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        {/* Search inside category */}
                        <div className="relative w-full sm:w-60">
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder={lang === 'ar' ? 'ابحث في هذا القسم...' : 'Search inside category...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-9 py-2 rounded-xl bg-dark-800 border border-white/5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#e09824]/60 focus:ring-1 focus:ring-[#e09824]/20 transition-all font-medium"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-dark-700 hover:bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded transition-all"
                            >
                              {lang === 'ar' ? 'مسح' : 'Clear'}
                            </button>
                          )}
                        </div>

                        {/* Items sort dropdown */}
                        <div className="relative w-full sm:w-52 font-bold">
                          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <select
                            value={itemSortOrder}
                            onChange={(e) => setItemSortOrder(e.target.value)}
                            className="w-full pl-8 pr-9 py-2 rounded-xl bg-dark-800 border border-white/5 text-white text-xs focus:outline-none focus:border-[#e09824]/60 focus:ring-1 focus:ring-[#e09824]/20 transition-all appearance-none cursor-pointer"
                          >
                            <option value="default">{lang === 'ar' ? 'الترتيب الافتراضي' : 'Default Order'}</option>
                            <option value="price-low">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                            <option value="price-high">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                            <option value="popular">{lang === 'ar' ? 'الأكثر شعبية' : 'Popularity (Most Active)'}</option>
                            <option value="name">{lang === 'ar' ? 'ترتيب بالاسم أبجدياً' : 'Name (A-Z)'}</option>
                          </select>
                          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Items Grid (Qzone style 2-columns) */}
                {categoryItems.length === 0 ? (
                  <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 space-y-4">
                    <UtensilsCrossed className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                    <h3 className="text-lg font-bold text-slate-300">{lang === 'ar' ? 'لم يتم العثور على أطباق' : 'No items found'}</h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar' 
                        ? 'هذا القسم فارغ حالياً أو لم يتم العثور على نتائج بحث مطابقة.' 
                        : 'This category is empty or no search results matched.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 max-w-6xl mx-auto animate-fadeIn">
                    {categoryItems.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        inCart={cart.some((c) => c.id === item.id)}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Venue Showcase */}
            <VenueShowcase lang={lang} />
          </>
        )}

        {/* VIEW 2: VENUE SHOWCASE PAGE */}
        {activeTab === 'venue' && (
          <VenueShowcase lang={lang} />
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
        lang={lang}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateCategory={handleUpdateCategory}
        items={items}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
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

      {/* QZONE Style Copyright Footer */}
      <footer id="pq-footer" className="bg-dark-900/60 border-t border-white/5 py-10 mt-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3">
            <a 
              href="https://instagram.com/goldenbreak.dhk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#e09824] flex items-center justify-center text-slate-300 hover:text-[#e09824] transition-all bg-dark-800/40"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/9647504596543" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#e09824] flex items-center justify-center text-slate-300 hover:text-[#e09824] transition-all bg-dark-800/40"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>

          {/* Address */}
          <span className="block text-slate-400 text-base md:text-lg font-light tracking-wide pt-2">
            Main Street, VIP Golden Break Lounge, Duhok
          </span>

          {/* Phone Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 pt-1">
            <a 
              href="tel:07504596543" 
              className="text-[#e09824] hover:text-[#f2ae3d] text-2xl font-bold font-mono transition-colors"
            >
              0750 459 6543
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a 
              href="tel:07515315442" 
              className="text-[#e09824] hover:text-[#f2ae3d] text-2xl font-bold font-mono transition-colors"
            >
              0751 531 5442
            </a>
          </div>

          {/* Design Attribution */}
          <span className="block text-slate-600 text-[11px] pt-4 font-mono">
            Designed by Antigravity / VeltrixTrade. © 2026 GOLDENBREAK. All rights reserved.
          </span>

        </div>
      </footer>

    </div>
  );
}
