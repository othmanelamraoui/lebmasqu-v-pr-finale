import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';
import { getCollection, getCollectionLabel } from '../utils/productUtils';

export default function ParfumsPage() {
  const [filter, setFilter] = useState<'all' | 'male' | 'female' | 'unisex'>('all');
  
  // Shuffle products once on mount to avoid "blocks" of categories in "All" view
  const [shuffledProducts] = useState(() => {
    const array = [...products];
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection');
  const searchParam = searchParams.get('search');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset filters when collection or search changes
  useEffect(() => {
    setFilter('all');
    setSearchTerm(searchParam || '');
    setCurrentPage(1);
  }, [collectionParam, searchParam]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const filteredProducts = shuffledProducts.filter(product => {
    const matchesFilter = filter === 'all' || product.gender === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const productCollection = getCollection(product);
    
    let matchesCollection = true;
    if (collectionParam === 'niche-privee') {
      matchesCollection = productCollection === 'niche' || productCollection === 'privee';
    } else if (collectionParam) {
      matchesCollection = productCollection === collectionParam;
    }
    
    return matchesFilter && matchesSearch && matchesCollection;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    { id: 'all', label: 'TOUT' },
    { id: 'male', label: 'HOMMES' },
    { id: 'female', label: 'FEMMES' },
    { id: 'unisex', label: 'UNISEXE' },
  ];

  const pageTitle = collectionParam ? getCollectionLabel(collectionParam) : 'Nos Parfums';

  const clearCollectionFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="px-6 py-12 md:py-20 max-w-[1920px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            key={pageTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase mb-6"
          >
            {pageTitle}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-[1px] bg-black mx-auto"
          />
          
          {collectionParam && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearCollectionFilter}
              className="mt-4 text-xs text-gray-500 hover:text-black underline uppercase tracking-widest"
            >
              Voir tous les parfums
            </motion.button>
          )}
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 mb-8 -mx-6 px-6 border-b border-black/5 transition-all duration-300">
          <div className="max-w-md mx-auto relative">
            <input 
              type="text" 
              placeholder="RECHERCHER UN PARFUM..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 uppercase tracking-widest"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center mb-16 md:mb-24 overflow-x-auto no-scrollbar">
          <div className="flex space-x-8 md:space-x-16 min-w-max px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id as any)}
                className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative pb-2 ${
                  filter === category.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {category.label}
                {filter === category.id && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24"
        >
          <AnimatePresence mode='popLayout'>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 md:mt-24 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm font-bold border transition-colors duration-300 ${
                  currentPage === i + 1
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-200 hover:border-black'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 uppercase tracking-widest text-sm">Aucun parfum trouvé dans cette catégorie.</p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
