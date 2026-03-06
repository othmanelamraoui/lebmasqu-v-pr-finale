import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  id: string;
  type: 'product' | 'pack';
  product?: Product;
  size?: '50ml';
  quantity: number;
  packDetails?: {
    packId: string;
    name: string;
    selections: Product[];
    price: number;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: '50ml', quantity?: number) => void;
  addPackToCart: (packId: string, name: string, selections: Product[], price: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  hasPack: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: '50ml' = '50ml', quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.type === 'product' && item.product?.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { id: `prod-${product.id}-${size}`, type: 'product', product, size, quantity }];
    });
  };

  const addPackToCart = (packId: string, name: string, selections: Product[], price: number) => {
    setCart((prevCart) => {
      const newId = `pack-${Date.now()}`;
      return [...prevCart, { id: newId, type: 'pack', quantity: 1, packDetails: { packId, name, selections, price } }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== itemId);
      }
      return prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    if (item.type === 'product') {
      return total + 50 * item.quantity; // 50 DHS for 50ml
    } else if (item.type === 'pack' && item.packDetails) {
      return total + item.packDetails.price * item.quantity;
    }
    return total;
  }, 0);

  const hasPack = cart.some(item => item.type === 'pack');

  return (
    <CartContext.Provider value={{ cart, addToCart, addPackToCart, removeFromCart, updateQuantity, clearCart, cartTotal, hasPack }}>
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
