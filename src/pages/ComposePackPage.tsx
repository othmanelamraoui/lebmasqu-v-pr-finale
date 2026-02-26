import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products, Product } from '../data/products';
import { Check, X, Search } from 'lucide-react';
import { getCollection } from '../utils/productUtils';

export default function ComposePackPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'male' | 'female' | 'unisex'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const packDetails = packId === 'pack-30ml' 
    ? { name: 'Le Pack Découverte', size: '3 x 30ml', price: 199 }
    : { name: 'Le Pack Prestige', size: '3 x 50ml', price: 279 };

  const handleProductToggle = (product: Product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  const isSelected = (productId: string) => selectedProducts.some(p => p.id === productId);
  const isFull = selectedProducts.length === 3;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || product.gender === filter;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = () => {
    // Here you would typically add the pack to a cart context
    alert(`Pack ajouté au panier : ${selectedProducts.map(p => p.name).join(', ')}`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24 pb-32">
      <Navbar />
      
      <main className="px-6 py-12 max-w-[1920px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif italic mb-4">Composez votre {packDetails.name}</h1>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{packDetails.size} — {packDetails.price} DHS</p>
          <p className="text-xs font-bold uppercase tracking-widest">
            {selectedProducts.length} / 3 Sélectionnés
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto h-1 bg-gray-100 mb-12 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${(selectedProducts.length / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { id: 'all', label: 'TOUT' },
            { id: 'male', label: 'HOMMES' },
            { id: 'female', label: 'FEMMES' },
            { id: 'unisex', label: 'UNISEXE' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`text-xs font-bold tracking-widest transition-colors ${
                filter === item.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 mb-16 -mx-6 px-6 border-b border-black/5 transition-all duration-300">
          <div className="max-w-md mx-auto relative">
            <input 
              type="text" 
              placeholder="Rechercher un parfum ou une note..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => {
              const selected = isSelected(product.id);
              const disabled = !selected && isFull;
              const collection = getCollection(product);
              const showCollectionBadge = collection === 'niche' || collection === 'privee';

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: disabled ? 0.5 : 1 }}
                  className={`relative group cursor-pointer ${disabled ? 'pointer-events-none' : ''}`}
                  onClick={() => handleProductToggle(product)}
                >
                  <div className={`relative w-full aspect-[3/4] overflow-hidden mb-4 bg-[#F9F9F9] transition-all duration-300 ${selected ? 'ring-2 ring-black ring-offset-4' : ''}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center mix-blend-multiply"
                    />
                    
                    {/* Selection Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${selected ? 'bg-black/10 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {selected ? (
                        <div className="bg-black text-white p-3 rounded-full">
                          <Check className="w-6 h-6" />
                        </div>
                      ) : (
                        !isFull && (
                          <div className="bg-white text-black p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <span className="text-xs font-bold uppercase tracking-widest">Ajouter</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Collection Badge */}
                    {showCollectionBadge && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 border border-black/5 shadow-sm z-10">
                        <span className="text-[8px] font-bold uppercase tracking-widest">
                          {collection === 'niche' ? 'Niche' : 'Collection Privée'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-sm font-bold tracking-widest uppercase">{product.name}</h3>
                    <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">{product.notes.join(', ')}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun parfum ne correspond à votre recherche.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-32 gap-2">
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

      </main>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Selected Items Preview */}
              <div className="flex items-center gap-4 overflow-x-auto max-w-full md:max-w-2xl no-scrollbar">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 bg-gray-50 pl-2 pr-4 py-2 rounded-full flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs font-bold uppercase tracking-wider">{product.name}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProductToggle(product); }}
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-10 h-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-300 text-xs font-bold">{i + 1 + selectedProducts.length}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
                <div className="block md:block text-left md:text-right">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Total</p>
                  <p className="text-base md:text-lg font-bold">{packDetails.price} DHS</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!isFull}
                  className={`flex-grow md:flex-grow-0 py-3 md:py-4 px-6 md:px-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isFull 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isFull ? 'Ajouter' : `Choisir ${3 - selectedProducts.length}`}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
