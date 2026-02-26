import { motion } from 'motion/react';
import { Product } from '../data/products';
import { useNavigate } from 'react-router-dom';

interface CollectionPreviewSectionProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export default function CollectionPreviewSection({ products, onProductClick }: CollectionPreviewSectionProps) {
  const displayProducts = products.slice(0, 3);
  const navigate = useNavigate();

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-black text-white px-6 py-12 relative overflow-hidden">
      
      <div className="text-center mb-12 md:mb-16 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase mb-4"
        >
          Notre collection de parfums
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 max-w-lg mx-auto"
        >
          Une symphonie olfactive rare, composée avec les essences les plus nobles.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl px-4 md:px-0 z-10 hidden md:grid">
        {displayProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            viewport={{ once: false }}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => onProductClick && onProductClick(product)}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-zinc-900 shadow-sm border border-white/10">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">{product.name}</h3>
            <p className="text-xs text-gray-400 tracking-widest uppercase">{product.category}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll View */}
      <div className="md:hidden flex overflow-x-auto w-full px-6 gap-6 pb-8 snap-x snap-mandatory z-10 no-scrollbar">
        {displayProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            viewport={{ once: false }}
            className="flex-shrink-0 w-[70vw] snap-center flex flex-col items-center group cursor-pointer"
            onClick={() => onProductClick && onProductClick(product)}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 bg-zinc-900 shadow-sm border border-white/10">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center opacity-90"
              />
            </div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">{product.name}</h3>
            <p className="text-xs text-gray-400 tracking-widest uppercase">{product.category}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: false }}
        onClick={() => navigate('/parfums')}
        className="mt-12 md:mt-16 px-10 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-xs font-bold z-10"
      >
        Découvrir notre catalogue
      </motion.button>

      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.1] pointer-events-none flex items-center justify-center overflow-hidden">
        <span className="text-[20vw] font-serif italic font-bold text-white">B</span>
      </div>
    </section>
  );
}
