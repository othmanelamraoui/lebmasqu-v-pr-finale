import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem extends Product {
  size: '30ml' | '50ml';
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: '30ml' | '50ml', quantity?: number) => void;
  removeFromCart: (productId: string, size: '30ml' | '50ml') => void;
  updateQuantity: (productId: string, size: '30ml' | '50ml', quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: '30ml' | '50ml', quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: '30ml' | '50ml') => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: '30ml' | '50ml', quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => !(item.id === productId && item.size === size));
      }
      return prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.size === '30ml' ? 69 : 99;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
