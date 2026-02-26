import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />
      
      <main className="px-6 py-12 md:py-20 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase mb-6"
          >
            Contactez-nous
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
            Une question sur nos parfums ? Besoin d'un conseil personnalisé ? 
            Notre équipe est à votre écoute pour vous guider dans l'univers LeBmasqué.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-xl font-serif italic mb-6">Nos Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:contact@lebmasque.com" className="text-gray-600 hover:text-black transition-colors">
                      contact@lebmasque.com
                    </a>
                    <p className="text-xs text-gray-400 mt-1">Réponse sous 24h ouvrées</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                    <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                      +212 6 00 00 00 00
                    </a>
                    <p className="text-xs text-gray-400 mt-1">Du Lundi au Samedi, 9h - 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Siège</p>
                    <p className="text-gray-600">
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-8 rounded-sm">
              <h3 className="text-lg font-serif italic mb-4">FAQ</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Vous avez des questions sur la livraison, les retours ou la composition de nos parfums ? 
                La réponse s'y trouve peut-être déjà.
              </p>
              <Link to="/faq" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity">
                Consulter la FAQ
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest">Sujet</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option value="order">Suivi de commande</option>
                  <option value="product">Conseil produit</option>
                  <option value="partnership">Partenariat / Presse</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 text-green-800 text-sm text-center"
                >
                  Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
