import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products, Product } from '../data/products';
import { ChevronLeft, ShoppingBag, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<'30ml' | '50ml'>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Recommendation Logic
      const otherProducts = products.filter(p => p.id !== foundProduct.id);
      
      const scoredProducts = otherProducts.map(p => {
        let score = 0;
        
        // Gender match (High priority)
        if (p.gender === foundProduct.gender) score += 10;
        else if (p.gender === 'unisex' || foundProduct.gender === 'unisex') score += 5;
        
        // Profile match
        if (p.profile === foundProduct.profile) score += 3;
        
        // Notes match
        const commonNotes = p.notes.filter(note => foundProduct.notes.includes(note));
        score += commonNotes.length * 2;
        
        return { product: p, score };
      });
      
      // Sort by score and take top 3
      scoredProducts.sort((a, b) => b.score - a.score);
      setRecommendations(scoredProducts.slice(0, 3).map(item => item.product));
      
    } else {
      // Handle not found - redirect or show error
      navigate('/parfums');
    }
  }, [productId, navigate]);

  if (!product) return null;

  const price = size === '30ml' ? 69 : 99;

  const handleAddToCart = () => {
    addToCart(product, size, quantity);
    // Optional: Show a toast or notification
    console.log('Added to cart:', product.name, size, quantity);
  };

  const handleOrderNow = () => {
    addToCart(product, size, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-6rem)]">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] lg:h-auto bg-[#F9F9F9] overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center mix-blend-multiply"
            />
            <Link 
              to="/parfums"
              className="absolute top-8 left-8 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </motion.div>

          {/* Details Section */}
          <div className="flex flex-col justify-center px-6 py-12 lg:px-24 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 block">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 underline decoration-gray-300 underline-offset-4">
                  4.9 (128 avis)
                </span>
              </div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                {product.description}
              </p>

              {/* Notes */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Notes Olfactives</h3>
                <div className="flex flex-wrap gap-3">
                  {product.notes.map((note) => (
                    <span key={note} className="px-4 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-wider">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Format</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSize('30ml')}
                    className={`flex-1 py-4 border text-center transition-all duration-300 ${
                      size === '30ml' 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                    }`}
                  >
                    <span className="block text-sm font-bold uppercase tracking-widest mb-1">30 ML</span>
                    <span className="block text-xs opacity-80">Découverte</span>
                  </button>
                  <button 
                    onClick={() => setSize('50ml')}
                    className={`flex-1 py-4 border text-center transition-all duration-300 ${
                      size === '50ml' 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                    }`}
                  >
                    <span className="block text-sm font-bold uppercase tracking-widest mb-1">50 ML</span>
                    <span className="block text-xs opacity-80">Standard</span>
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Quantité</h3>
                <div className="flex items-center border border-gray-200 w-max">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-8 border-t border-gray-100">
                <div className="text-2xl font-bold mb-6">
                  {price} DHS
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 border border-black text-black py-4 px-8 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300 group"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Ajouter au panier</span>
                  </button>
                  <button 
                    onClick={handleOrderNow}
                    className="flex-1 bg-black text-white py-4 px-8 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Commander maintenant</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="px-6 py-20 lg:px-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold tracking-[0.1em] uppercase mb-4">
                Vous aimeriez aussi
              </h2>
              <div className="w-16 h-[1px] bg-black mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((recProduct) => (
                <ProductCard key={recProduct.id} product={recProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
