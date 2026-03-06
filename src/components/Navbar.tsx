import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isParfumsHovered, setIsParfumsHovered] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const parfumSubLinks = [
    { name: 'LES CLASSIQUES', path: '/parfums?collection=classique' },
    { name: 'NICHES & COLLECTIONS PRIVÉES', path: '/parfums?collection=niche-privee' }
  ];

  const leftLinks = [
    { name: 'PACKS PERSONNALISÉS', path: '/packs' },
    { name: 'QUIZ PROFIL OLFACTIF', path: '/quiz' }
  ];
  const rightLinks = [
    { name: 'NOTRE HISTOIRE', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  const searchResults = searchQuery.length > 2
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.notes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/parfums?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Mobile Menu Button (Hidden on Desktop) */}
          <div className="lg:hidden flex items-center w-1/3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="hover:opacity-60 transition-opacity"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Left Links */}
          <div className="hidden lg:flex items-center justify-start gap-10 w-5/12">
            {/* Parfums Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsParfumsHovered(true)}
              onMouseLeave={() => setIsParfumsHovered(false)}
            >
              <Link 
                to="/parfums" 
                className="text-xs font-bold tracking-[0.15em] uppercase hover:text-gray-500 transition-colors flex items-center gap-1"
              >
                PARFUMS
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isParfumsHovered ? 'rotate-180' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {isParfumsHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-6 w-56"
                  >
                    <div className="bg-white border border-black/5 shadow-lg p-4 flex flex-col gap-3">
                      {parfumSubLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          className="text-[10px] font-bold tracking-[0.15em] uppercase hover:text-gray-500 transition-colors"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {leftLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-xs font-bold tracking-[0.15em] uppercase hover:text-gray-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="w-1/3 lg:w-2/12 flex justify-center">
            <Link to="/" className="flex flex-col items-center group">
              {!imageError ? (
                <img 
                  src="https://drive.google.com/thumbnail?id=1jKPwrqGOoNkWb20wE4IysMWRcI7VvBRW&sz=w1000" 
                  alt="Le B Masqué" 
                  className="h-20 w-auto object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex items-center gap-2 group-hover:opacity-80 transition-opacity">
                  <span className="font-serif text-xl tracking-[0.2em] uppercase">Le</span>
                  <span className="font-serif text-3xl italic font-bold">B</span>
                  <span className="font-serif text-xl tracking-[0.2em] uppercase">Masqué</span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Right Links & Icons */}
          <div className="hidden lg:flex items-center justify-end gap-10 w-5/12">
             {rightLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-xs font-bold tracking-[0.15em] uppercase hover:text-gray-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-6 ml-4 pl-6 border-l border-black/10">
               <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-60 transition-opacity"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/checkout')}
                className="hover:opacity-60 transition-opacity relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-black text-[8px] text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="lg:hidden flex items-center justify-end gap-4 w-1/3">
             <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-60 transition-opacity"
              >
                <Search className="w-5 h-5" />
              </button>
            <button 
              onClick={() => navigate('/checkout')}
              className="hover:opacity-60 transition-opacity relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-black text-[8px] text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-md"
          >
            <div className="max-w-4xl mx-auto px-6 pt-32">
              <div className="flex justify-end mb-8">
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <form onSubmit={handleSearchSubmit} className="relative mb-16">
                <input
                  type="text"
                  placeholder="RECHERCHER UN PARFUM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-2xl md:text-4xl font-bold uppercase tracking-widest border-b-2 border-black py-4 outline-none bg-transparent placeholder-gray-300"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-60 transition-opacity"
                >
                  <Search className="w-8 h-8" />
                </button>
              </form>

              {/* Quick Results */}
              {searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {searchResults.map(product => (
                    <Link 
                      key={product.id}
                      to={`/parfums/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 group"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover bg-gray-50"
                      />
                      <div>
                        <h4 className="font-bold uppercase tracking-wider group-hover:underline">{product.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {searchQuery.length > 2 && searchResults.length === 0 && (
                <p className="text-center text-gray-500 uppercase tracking-widest">
                  Aucun résultat trouvé
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Menu Overlay (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="min-h-full flex flex-col items-center justify-center py-12 space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <Link 
                  to="/parfums" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-light tracking-tight hover:italic transition-all cursor-pointer uppercase"
                >
                  PARFUMS
                </Link>
                <div className="flex flex-col items-center space-y-3">
                  {parfumSubLinks.map((subLink) => (
                    <Link
                      key={subLink.name}
                      to={subLink.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-bold tracking-[0.15em] text-gray-500 uppercase hover:text-black transition-colors"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>

              {leftLinks.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-light tracking-tight hover:italic transition-all cursor-pointer uppercase"
                >
                  {item.name}
                </Link>
              ))}
              
              {rightLinks.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-light tracking-tight hover:italic transition-all cursor-pointer uppercase"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
