import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    text: "Un parfum d'une élégance rare. La tenue est incroyable, je le porte du matin au soir sans qu'il ne perde de son intensité.",
    author: "Karim B.",
    location: "Casablanca"
  },
  {
    id: 2,
    text: "J'ai enfin trouvé ma signature olfactive. Le service client est aussi impeccable que les produits. Une expérience de luxe absolue.",
    author: "Sofia E.",
    location: "Rabat"
  },
  {
    id: 3,
    text: "Le packaging est sublime et l'odeur est envoûtante. Une vraie fierté de voir une marque marocaine atteindre ce niveau d'excellence.",
    author: "Mehdi A.",
    location: "Marrakech"
  },
  {
    id: 4,
    text: "Des fragrances qui racontent une histoire. Je recommande vivement 'Ombres de Nuit', c'est un chef-d'œuvre.",
    author: "Leila M.",
    location: "Tanger"
  },
  {
    id: 5,
    text: "Qualité digne des plus grandes maisons de parfumerie internationales. Bravo pour ce travail de recherche et de finesse.",
    author: "Youssef T.",
    location: "Fès"
  },
  {
    id: 6,
    text: "C'est devenu mon cadeau préféré pour mes proches. Tout le monde adore l'originalité et la sophistication des jus.",
    author: "Amina S.",
    location: "Agadir"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-white px-6 py-12 relative overflow-hidden">
      
      <div className="text-center mb-12 md:mb-16 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase mb-4 text-black"
        >
          Ils nous ont choisi
        </motion.h2>
        <div className="w-24 h-[1px] bg-black mx-auto mt-6"></div>
      </div>

      {/* Desktop Grid (3x2) */}
      <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-8">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }}
            className="flex flex-col items-center text-center space-y-4 p-6 hover:bg-gray-50 transition-colors duration-300 rounded-sm"
          >
            <div className="text-2xl text-gray-300 font-serif">"</div>
            <p className="text-sm md:text-base text-gray-600 italic font-light leading-relaxed min-h-[80px]">
              {testimonial.text}
            </p>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-black">{testimonial.author}</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{testimonial.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto w-full px-6 gap-4 snap-x snap-mandatory z-10 no-scrollbar pb-8">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={testimonial.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }}
            className="flex-shrink-0 w-[85vw] snap-center flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 border border-gray-100 rounded-xl"
          >
            <div className="text-2xl text-gray-300 font-serif">"</div>
            <p className="text-sm text-gray-600 italic font-light leading-relaxed">
              {testimonial.text}
            </p>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-black">{testimonial.author}</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{testimonial.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
