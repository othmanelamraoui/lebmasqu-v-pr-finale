import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface FullScreenSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  align?: 'left' | 'center' | 'right';
  textColor?: 'white' | 'black';
  overlay?: boolean;
}

export default function FullScreenSection({
  image,
  title,
  subtitle,
  buttonText = "Découvrir",
  buttonLink = "#",
  align = 'center',
  textColor = 'white',
  overlay = true
}: FullScreenSectionProps) {
  
  const alignClasses = {
    left: 'items-start text-left pl-6 md:pl-24 pr-6',
    center: 'items-center text-center px-6',
    right: 'items-end text-right pr-6 md:pr-24 pl-6'
  };

  const textColors = {
    white: 'text-white',
    black: 'text-black'
  };

  return (
    <section className="relative h-screen w-full overflow-hidden snap-start flex-shrink-0">
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {overlay && <div className="absolute inset-0 bg-black/20" />}
      </div>
      
      <div className={`absolute inset-0 flex flex-col justify-center ${alignClasses[align]} ${textColors[textColor]}`}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] uppercase mb-4 mix-blend-difference"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="text-xs sm:text-sm md:text-lg tracking-[0.2em] uppercase max-w-xs sm:max-w-xl mix-blend-difference mb-8 md:mb-10"
          >
            {subtitle}
          </motion.p>
        )}
        
        {buttonText && (
          <Link to={buttonLink}>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false }}
              className={`px-8 md:px-10 py-3 border ${textColor === 'white' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-colors duration-300 uppercase tracking-widest text-[10px] md:text-xs font-bold`}
            >
              {buttonText}
            </motion.button>
          </Link>
        )}
      </div>
    </section>
  );
}
