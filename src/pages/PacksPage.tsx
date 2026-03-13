import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PacksPage() {
  const packs = [
    {
      id: 'pack-50ml',
      name: 'Le Pack Personnalisé',
      size: '3 x 50ml',
      price: 199,
      description: 'Créez votre propre collection olfactive. Sélectionnez 3 parfums de votre choix.',
      image: 'https://drive.google.com/thumbnail?id=1dhfpjm0HoC_insm-iyzjnyNcvofb55NT&sz=w2560',
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="px-6 py-12 md:py-20 max-w-[1920px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase mb-6"
          >
            Packs Personnalisés
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-[1px] bg-black mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-gray-500 uppercase tracking-widest max-w-2xl mx-auto"
          >
            Créez votre propre collection olfactive. Sélectionnez 3 parfums de votre choix.
            <br />
            <span className="font-bold text-black mt-2 block">Livraison gratuite sur tous les packs.</span>
          </motion.p>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-16 max-w-2xl mx-auto">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col h-full"
            >
              <Link to={`/compose-pack/${pack.id}`} className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-[#F9F9F9] mb-8 block cursor-pointer flex items-center justify-center">
                <img 
                  src={pack.image} 
                  alt={pack.name}
                  className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </Link>
              
              <div className="text-center flex-grow flex flex-col items-center space-y-4">
                <h3 className="text-2xl font-serif italic">{pack.name}</h3>
                <p className="text-sm font-bold uppercase tracking-widest">{pack.size}</p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  {pack.description}
                </p>
                <div className="mt-auto pt-6 space-y-6 w-full flex flex-col items-center">
                  <p className="text-xl font-bold">{pack.price} DHS</p>
                  <Link 
                    to={`/compose-pack/${pack.id}`}
                    className="inline-block w-full max-w-xs border border-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Choisir ce pack
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
