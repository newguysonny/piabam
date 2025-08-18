// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { restaurantId: null, items: [] };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, restaurantId) => {
    setCart((prev) => {
      // If different restaurant → reset cart
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        return { restaurantId, items: [item] };
      }

      // If item already exists → increment quantity
      const existing = prev.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      // Else add new
      return { ...prev, restaurantId, items: [...prev.items, item] };
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));

  const incrementItem = (id) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));

  const decrementItem = (id) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      ),
    }));

  const clearCart = () => setCart({ restaurantId: null, items: [] });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
