import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=2000&auto=format&fit=crop" 
              alt="LeBmasqué Philosophy" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase mb-6"
            >
              L'Élégance n'a pas de visage
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-light tracking-widest uppercase opacity-90"
            >
              LeBmasqué : L'art du parfum, dépouillé du superflu.
            </motion.p>
          </div>
        </section>

        {/* Introduction Narrative */}
        <section className="py-20 md:py-32 px-6 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif italic mb-8">Je suis LeBmasqué.</h2>
            <p className="text-lg leading-relaxed font-light text-gray-800">
              Vous me connaissez peut-être déjà, ou peut-être pas. Peu importe. 
              Dans un monde où l'image est reine et où l'ego prend souvent le pas sur le fond, 
              j'ai fait le choix radical de l'effacement. Ce masque n'est pas un artifice de scène, 
              c'est une décision stratégique : celle de séparer mon image publique de ce projet qui me tient à cœur, 
              pour laisser toute la place à l'essentiel.
            </p>
            <div className="w-16 h-[1px] bg-black mx-auto opacity-20" />
          </motion.div>
        </section>

        {/* Le Déclic (Market Problem) */}
        <section className="py-20 bg-[#F9F9F9] px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop" 
                alt="Luxury Perfume" 
                className="w-full aspect-[4/5] object-cover grayscale"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-left"
            >
              <h3 className="text-2xl font-bold tracking-widest uppercase">Le Constat</h3>
              <p className="text-lg leading-relaxed font-light text-gray-600">
                Le parfum est l'une des formes d'art les plus intimes, mais l'industrie en a fait un luxe souvent inaccessible.
              </p>
              <p className="text-lg leading-relaxed font-light text-gray-600">
                J'ai réalisé une vérité simple : trop souvent, nous ne payons pas pour l'odeur, mais pour le rêve qu'on nous vend autour. 
                Le flacon bijou, l'égérie hollywoodienne, les campagnes marketing pharaoniques... tout cela a un prix, et c'est vous qui le payez.
                L'émotion olfactive, elle, ne devrait pas être réservée à une élite.
              </p>
            </motion.div>
          </div>
        </section>

        {/* La Naissance (Mission) */}
        <section className="py-20 md:py-32 px-6 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold tracking-widest uppercase mb-4">La Naissance de LeBmasqué</h3>
            <p className="text-lg leading-relaxed font-light text-gray-800">
              C'est de cette volonté de justesse qu'est né <strong>LeBmasqué</strong>. 
              Notre mission est claire : démocratiser l'élégance olfactive.
            </p>
            <p className="text-lg leading-relaxed font-light text-gray-800">
              Nous ne cherchons pas à réinventer la roue, mais à la rendre accessible. 
              Nos créations sont des <strong>parfums d'inspiration</strong>, des hommages aux plus grands chefs-d'œuvre de la parfumerie de niche et de luxe. 
              Nous sélectionnons nos jus avec une exigence obsessionnelle sur trois critères : la qualité des matières premières, l'équilibre de la composition, et une tenue irréprochable.
            </p>
          </motion.div>
        </section>

        {/* Le Sens du Nom */}
        <section className="py-20 bg-black text-white px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-serif italic"
            >
              Pourquoi "LeBmasqué" ?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed font-light opacity-80"
            >
              Le masque est un symbole de focus. En cachant le visage, on oblige le regard à se détourner de l'apparence pour se concentrer sur l'autre sens majeur : l'odorat.
              Le masque est aussi un gage de vérité. Il n'y a pas d'influenceur, pas de star, pas de distraction. 
              Il ne reste que le sillage. C'est une invitation à juger le parfum pour ce qu'il est vraiment, et non pour qui le porte.
            </motion.p>
          </div>
        </section>

        {/* Les Valeurs */}
        <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                title: "Accessibilité Sans Compromis",
                text: "Le luxe n'est pas un prix, c'est une qualité. Nous rendons l'excellence accessible sans jamais sacrifier l'expérience."
              },
              {
                title: "Honnêteté Radicale",
                text: "Nous ne vendons pas de magie, nous proposons une expertise. Des parfums inspirés, assumés, et maîtrisés."
              },
              {
                title: "Élégance Minimaliste",
                text: "Du flacon à la communication, nous privilégions l'épure. Le style se trouve dans la soustraction, pas dans l'accumulation."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-black/10 pb-4 inline-block">{value.title}</h4>
                <p className="text-gray-600 font-light leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-20 bg-[#F5F5F5] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed">
              "Le masque tombe, le parfum reste. <br/>
              Bienvenue dans l'univers de la vérité olfactive."
            </p>
            
            <div className="pt-8">
              <Link 
                to="/parfums" 
                className="inline-block px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
              >
                Découvrir la collection
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
