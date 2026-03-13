import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'shipping' | 'products';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: "Qu'est-ce qu'un parfum inspiré ?",
    answer: "Un parfum inspiré (ou générique) est une création originale qui reprend la structure olfactive d'un grand parfum connu. Chez LeBmasqué, nous sélectionnons des jus de haute qualité qui offrent une expérience olfactive similaire à 98% aux originaux, avec une excellente tenue, mais à un prix beaucoup plus accessible car vous ne payez pas le marketing de la grande marque."
  },
  {
    category: 'general',
    question: "Les parfums sont-ils des copies ?",
    answer: "Non, ce ne sont pas des contrefaçons. Nous ne copions pas les flacons ni les noms déposés. Nos parfums sont des créations propres, vendues sous notre marque LeBmasqué, dans nos propres flacons minimalistes. C'est une alternative légale et éthique."
  },
  {
    category: 'products',
    question: "Quelle est la tenue de vos parfums ?",
    answer: "La tenue est l'une de nos priorités absolues. Nos parfums sont des Eaux de Parfum concentrées entre 15% et 20%, garantissant une tenue longue durée (6h à 12h selon les peaux et les fragrances). Nous testons rigoureusement chaque jus avant de le proposer."
  },
  {
    category: 'products',
    question: "Comment choisir mon parfum sans le sentir ?",
    answer: "Nous avons mis en place un Quiz Olfactif pour vous guider vers les parfums qui correspondent à vos goûts. De plus, chaque fiche produit détaille les notes olfactives et le style du parfum. Vous pouvez également opter pour notre Pack Personnalisé (3x50ml) pour tester plusieurs fragrances."
  },
  {
    category: 'shipping',
    question: "Quels sont les délais de livraison ?",
    answer: "Nous expédions les commandes sous 24h à 48h ouvrées. La livraison au Maroc prend généralement 1 à 3 jours ouvrables selon votre ville. Vous recevrez un numéro de suivi dès l'expédition."
  },
  {
    category: 'shipping',
    question: "Puis-je retourner un parfum ?",
    answer: "Pour des raisons d'hygiène, nous ne pouvons pas accepter les retours de parfums ouverts ou utilisés. Si le produit est encore scellé et dans son emballage d'origine, vous disposez de 7 jours pour nous le retourner. Contactez notre service client pour la procédure."
  },
  {
    category: 'shipping',
    question: "Livrez-vous à l'international ?",
    answer: "Pour le moment, nous livrons exclusivement au Maroc. Nous travaillons à l'ouverture des livraisons internationales prochainement."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="px-6 py-12 md:py-20 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase mb-6"
          >
            Questions Fréquentes
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-[1px] bg-black mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 font-light max-w-xl mx-auto"
          >
            Tout ce que vous devez savoir sur LeBmasqué, nos parfums et nos services.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b border-gray-100 last:border-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left group hover:bg-gray-50/50 transition-colors px-4 rounded-sm"
              >
                <span className="text-sm md:text-base font-bold uppercase tracking-wide pr-8">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-gray-400 group-hover:text-black transition-colors">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-4 text-gray-600 font-light leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-20 text-center bg-[#F9F9F9] p-10 rounded-sm">
          <h3 className="text-xl font-serif italic mb-4">Vous ne trouvez pas votre réponse ?</h3>
          <p className="text-gray-600 mb-8 font-light">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
          >
            Nous contacter
          </a>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
