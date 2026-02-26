/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParfumsPage from './pages/ParfumsPage';
import PacksPage from './pages/PacksPage';
import ComposePackPage from './pages/ComposePackPage';
import QuizPage from './pages/QuizPage';
import QuizStartPage from './pages/QuizStartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import WhatsAppButton from './components/WhatsAppButton';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parfums" element={<ParfumsPage />} />
          <Route path="/parfums/:productId" element={<ProductDetailsPage />} />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/compose-pack/:packId" element={<ComposePackPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/start" element={<QuizStartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <WhatsAppButton />
      </Router>
    </CartProvider>
  );
}
