export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
        
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Newsletter</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Abonnez-vous pour recevoir les dernières nouvelles, accès aux offres exclusives, et plus encore.
          </p>
          <form className="flex border-b border-white pb-2">
            <input 
              type="email" 
              placeholder="Adresse email" 
              className="w-full bg-transparent outline-none text-sm placeholder-gray-500 text-white"
            />
            <button type="submit" className="text-xs font-bold uppercase tracking-widest hover:opacity-60 text-white">
              Rejoindre
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Service Client</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Livraisons & Retours</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Nous Contacter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Suivre ma commande</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Légal</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessibilité</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Suivez-nous</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="https://www.instagram.com/lebmasque_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@lebmasque_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
            <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 Le B Masqué Parfumeur</p>
        <p className="text-xs text-gray-500 uppercase tracking-widest">Paris • Stockholm • New York</p>
      </div>
    </footer>
  );
}
