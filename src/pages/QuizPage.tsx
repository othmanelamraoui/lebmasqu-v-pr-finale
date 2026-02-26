import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 md:py-20 max-w-4xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Découverte</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight"
        >
          Votre signature olfactive <br/> en quelques questions.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-24 h-[1px] bg-black mx-auto mb-10"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Un quiz de <strong>10 questions</strong>, réalisable en moins de <strong>2 minutes</strong>.
          <br /><br />
          Laissez-nous analyser vos préférences pour révéler votre <strong>profil olfactif unique</strong> et vous recommander une sélection personnalisée de <strong>10 parfums</strong> parfaitement adaptés à votre style et votre personnalité.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/quiz/start">
            <button className="px-12 py-4 bg-black text-white hover:bg-gray-800 transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Passer le quiz
            </button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-20 grid grid-cols-3 gap-8 opacity-50 max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">⏱️</span>
            <span className="text-[10px] uppercase tracking-widest">2 Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🔍</span>
            <span className="text-[10px] uppercase tracking-widest">Analyse</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">✨</span>
            <span className="text-[10px] uppercase tracking-widest">10 Parfums</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
