import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F5F5F5]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Placeholder for a high-fashion minimalist image */}
        <img 
          src="https://drive.google.com/thumbnail?id=1JkeCxNwUq88pL3nEYkbBGeb7Rb5JwZhH&sz=w2560" 
          alt="Le Masqué Campaign" 
          className="w-full h-full object-cover object-[35%_center] md:object-center opacity-90 grayscale-[20%]"
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] uppercase mb-4 md:mb-6 mix-blend-difference"
        >
          L’essentiel. Rien de plus.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase max-w-xs sm:max-w-md mix-blend-difference px-4"
        >
          Parfums inspirés, travaillés pour l’équilibre et la tenue.
        </motion.p>
        
        <Link to="/parfums">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-12 px-8 md:px-12 py-3 md:py-4 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-widest text-[10px] md:text-xs font-bold"
          >
            DÉCOUVRIR NOS PARFUMS
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
