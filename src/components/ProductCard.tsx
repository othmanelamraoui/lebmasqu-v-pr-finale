import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { getCollection, getCollectionLabel } from '../utils/productUtils';

export default function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<'30ml' | '50ml'>('50ml');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const price = size === '30ml' ? 69 : 99;
  
  const collection = getCollection(product);
  const showCollectionBadge = collection === 'niche' || collection === 'privee';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, quantity);
    // Optional: Show a toast or notification
    console.log('Added to cart:', product.name, size, quantity);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, quantity);
    navigate('/checkout');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer flex flex-col items-center"
      onClick={() => navigate(`/parfums/${product.id}`)}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-[#F9F9F9]">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        {showCollectionBadge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 border border-black/5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {collection === 'niche' ? 'Niche' : 'Collection Privée'}
            </span>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2 w-full">
        <h3 className="text-sm md:text-base font-bold tracking-widest uppercase">{product.name}</h3>
        <p className="text-xs text-gray-500 tracking-widest uppercase">{product.category}</p>
        
        <div className="flex justify-center gap-3 mt-3 mb-2">
           <button 
             onClick={(e) => { e.stopPropagation(); setSize('30ml'); }}
             className={`text-[10px] uppercase tracking-widest px-3 py-1 border transition-all duration-300 ${size === '30ml' ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
           >
             30ml
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); setSize('50ml'); }}
             className={`text-[10px] uppercase tracking-widest px-3 py-1 border transition-all duration-300 ${size === '50ml' ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
           >
             50ml
           </button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2" onClick={(e) => e.stopPropagation()}>
           <button 
             onClick={() => setQuantity(Math.max(1, quantity - 1))} 
             className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black transition-colors text-xs"
           >
             -
           </button>
           <span className="text-xs font-bold w-4 text-center">{quantity}</span>
           <button 
             onClick={() => setQuantity(quantity + 1)} 
             className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black transition-colors text-xs"
           >
             +
           </button>
        </div>

        <p className="text-sm font-bold">{price * quantity} DHS</p>

        <div className="flex flex-col gap-2 w-full mt-4 px-4 md:px-8">
          <button 
            onClick={handleAddToCart}
            className="w-full py-3 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Ajouter au panier
          </button>
          <button 
            onClick={handleOrderNow}
            className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-md"
          >
            Commander maintenant
          </button>
        </div>
      </div>
    </motion.div>
  );
}
