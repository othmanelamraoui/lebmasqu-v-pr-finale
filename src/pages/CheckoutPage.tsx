import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, updateQuantity, removeFromCart, hasPack } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
  });
  const [lastOrder, setLastOrder] = useState<{
    cart: typeof cart;
    formData: typeof formData;
    total: number;
  } | null>(null);

  const shippingCost = (hasPack || cartTotal > 199) ? 0 : 25;
  const grandTotal = cartTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Sending order to server...', { ...formData, cart, total: grandTotal });
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cart,
          total: grandTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Server error:', result);
        alert(`Erreur lors de l'enregistrement: ${result.details || result.error || 'Erreur inconnue'}`);
      } else {
        console.log('Order saved successfully:', result);
        alert('Commande enregistrée avec succès !');
        
        setLastOrder({
          cart: [...cart],
          formData: { ...formData },
          total: grandTotal
        });
        clearCart();
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (lastOrder) {
    return (
      <div className="min-h-screen bg-white text-black pt-24">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold uppercase mb-4">Commande Confirmée</h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci {lastOrder.formData.name}, votre commande a bien été enregistrée.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg text-left mb-8">
              <h2 className="font-bold uppercase mb-4 border-b pb-2">Détails de la commande</h2>
              <ul className="space-y-3 mb-4">
                {lastOrder.cart.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    {item.type === 'product' ? (
                      <span>{item.quantity}x {item.product?.name} ({item.size})</span>
                    ) : (
                      <span>{item.quantity}x {item.packDetails?.name} ({item.packDetails?.selections.map(p => p.name).join(', ')})</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold border-t pt-3">
                <span>Total</span>
                <span>{lastOrder.total} DHS</span>
              </div>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <p className="text-lg mb-2">Important</p>
              <p>
                Nous allons vous appeler sur le <span className="font-bold text-xl block my-2">{lastOrder.formData.phone}</span> pour confirmer votre commande et organiser la livraison.
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="bg-white border border-black text-black px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Retour à l'accueil
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold uppercase mb-8 text-center">Confirmer votre commande</h1>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">Votre panier est vide.</p>
            <button 
              onClick={() => navigate('/parfums')}
              className="bg-black text-white px-6 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
            >
              Retourner à la boutique
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-bold uppercase mb-6">Résumé de la commande</h2>
              <ul className="space-y-6 mb-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex flex-col border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm uppercase">
                          {item.type === 'product' ? item.product?.name : item.packDetails?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.type === 'product' ? item.size : item.packDetails?.selections.map(p => p.name).join(', ')}
                        </p>
                      </div>
                      <span className="font-bold text-sm">
                        {(item.type === 'product' ? 50 : (item.packDetails?.price || 0)) * item.quantity} DHS
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Sous-total</span>
                  <span>{cartTotal} DHS</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? 'Gratuite' : `${shippingCost} DHS`}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t pt-4 mt-2">
                  <span>Total</span>
                  <span>{grandTotal} DHS</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h2 className="text-xl font-bold uppercase mb-6">Informations de livraison</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase mb-1">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase mb-1">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-xs font-bold uppercase mb-1">Ville</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Enregistrement...' : 'Confirmer la commande'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
