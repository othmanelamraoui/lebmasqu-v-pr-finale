import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FullScreenSection from '../components/FullScreenSection';
import CollectionPreviewSection from '../components/CollectionPreviewSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { products, Product } from '../data/products';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
    message: '',
    isVisible: false,
  });

  const handleProductClick = (product: Product) => {
    navigate('/parfums');
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white text-black selection:bg-black selection:text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="h-screen w-full snap-start">
          <Hero />
        </div>

        {/* Philosophy Section */}
        <section className="h-screen w-full snap-start flex items-center justify-center bg-[#F5F5F5] px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl md:text-5xl font-light italic font-serif leading-tight">
              "Le parfum est l'accessoire invisible, inoubliable et ultime qui annonce votre arrivée et prolonge votre départ."
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest">
              — Notre Philosophie
            </p>
          </div>
        </section>
        
        {/* Featured Section 1 */}
        <FullScreenSection 
          image="https://drive.google.com/thumbnail?id=11zOTRkj_ENZFvFHyWAVZ83mRlgSMyk-8&sz=w2560"
          title="Construit ton pack personnalisé"
          subtitle="Sélectionnez vos fragrances favorites pour une expérience unique."
          buttonText="Créer mon pack"
          buttonLink="/packs"
          align="left"
        />

        {/* Collection Preview */}
        <CollectionPreviewSection 
          products={products}
          onProductClick={handleProductClick}
        />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Quiz Invitation Section */}
        <FullScreenSection 
          image="https://drive.google.com/thumbnail?id=1gXEGFP7ammqwkiP7HvGyb3JIpBJUyXeR&sz=w2560"
          title="Votre Signature Olfactive"
          subtitle="Répondez à quelques questions pour découvrir les parfums qui vous correspondent."
          buttonText="Commencer le Quiz"
          buttonLink="/quiz"
          align="center"
          textColor="white"
        />

        {/* Footer */}
        <div className="min-h-screen snap-start flex flex-col justify-end bg-black">
           {/* We can make the footer take up a full screen or just be at the bottom of a content section. 
               For Xerjoff style, often the footer is just at the bottom. 
               Let's make a "Contact/Footer" full screen section. */}
           <div className="flex-grow bg-black text-white flex items-center justify-center py-20">
              <div className="text-center space-y-6">
                 <h2 className="text-4xl font-serif italic">Rejoignez notre univers</h2>
                 <p className="uppercase tracking-widest text-sm text-gray-400">Abonnez-vous à notre newsletter</p>
                 <div className="flex border-b border-white pb-2 w-64 mx-auto">
                    <input 
                      type="email" 
                      placeholder="Adresse email" 
                      className="w-full bg-transparent outline-none text-center text-white placeholder-gray-500"
                    />
                 </div>
              </div>
           </div>
           <Footer />
        </div>

      </main>
      
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
