import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import MenuCard from './components/MenuCard';
import CartDrawer from './components/CartDrawer';
import BilliardsBookingModal from './components/BilliardsBookingModal';
import AdminModal from './components/AdminModal';
import VenueShowcase from './components/VenueShowcase';
import { DEFAULT_CATEGORIES, DEFAULT_ITEMS } from './data/initialData';
import { Gamepad2, Phone, MapPin, Clock, Heart, UtensilsCrossed, Instagram, MessageCircle } from 'lucide-react';

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
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'venue' | 'booking'

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
    if (activeCategory === catId) setActiveCategory('all');
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

  // Bilingual Search Filter Items
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const nameAr = (item.nameAr || item.name || '').toLowerCase();
    const nameEn = (item.nameEn || '').toLowerCase();
    const descAr = (item.descriptionAr || item.description || '').toLowerCase();
    const descEn = (item.descriptionEn || '').toLowerCase();

    const matchesSearch =
      nameAr.includes(query) ||
      nameEn.includes(query) ||
      descAr.includes(query) ||
      descEn.includes(query);

    return matchesCategory && matchesSearch;
  });

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
        
        {/* VIEW 1: HOME (Hero + Menu Grid) */}
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreMenu={() => {
                const element = document.getElementById('menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookTable={() => setIsBookingOpen(true)}
            />

            {/* Menu Section */}
            <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Category Filters */}
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 space-y-4">
                  <UtensilsCrossed className="w-16 h-16 text-slate-600 mx-auto stroke-1" />
                  <h3 className="text-xl font-bold text-slate-300">لم يتم العثور على نتائج • No items found</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    جرب البحث باسم آخر بالعربي أو الإنجليزي.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:brightness-110 transition-all"
                  >
                    عرض جميع العناصر • View All
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
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

            {/* Venue Showcase */}
            <VenueShowcase onBookNow={() => setIsBookingOpen(true)} />
          </>
        )}

        {/* VIEW 2: VENUE SHOWCASE PAGE */}
        {activeTab === 'venue' && (
          <VenueShowcase onBookNow={() => setIsBookingOpen(true)} />
        )}

        {/* VIEW 3: BOOKING PAGE */}
        {activeTab === 'booking' && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-dark-800 border border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-center justify-center text-amber-400 mx-auto">
                <Gamepad2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-white">حجز طاولات البلياردو والسنوكر • Booking</h2>
              <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
                استمتع بأجواء التنافس الراقية في صالة GOLDENBREAK. طاولات رسمية مجهزة بالكامل مع إمكانية طلب المأكولات والمشروبات مباشرة للطاولة.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
              >
                افتح نموذج الحجز الفوري
              </button>
            </div>
          </div>
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

      <BilliardsBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
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

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400 text-sm">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black font-extrabold">
                <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
              </div>
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
          <div className="space-y-2">
            <h4 className="text-white font-bold text-base mb-3">أوقات العمل والمعلومات • Info</h4>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>مفتوح يومياً: من 10:00 صباحاً حتى 02:00 ليلاً</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>واتساب والحجوزات: 07502203691</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>الموقع: الشارع الرئيسي، صالة جولدن بريك VIP</span>
            </div>
          </div>

          {/* Direct WhatsApp Action */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base">الحجز والطلب المباشر • WhatsApp</h4>
            <p className="text-xs leading-relaxed">
              تصلك الحجوزات والطلبات مباشرة عبر الواتساب على الرقم المعتمد.
            </p>
            <a
              href="https://wa.me/9647502203691"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>تواصل عبر الواتساب (07502203691)</span>
            </a>
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
