// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { restaurantId: null, items: [] };
  });

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isSameOptions = (opts1 = [], opts2 = []) => {
    if (opts1.length !== opts2.length) return false;
    return opts1.every((opt, i) => opt === opts2[i]);
  };

  const addToCart = (item, restaurantId) => {
    setCart((prev) => {
      // If different restaurant → reset cart
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        return { restaurantId, items: [item] };
      }

      // If same item + same options exists → increment
      const existing = prev.items.find(
        (i) => i.id === item.id && isSameOptions(i.options, item.options)
      );

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id && isSameOptions(i.options, item.options)
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      // Else add new variant
      return { ...prev, restaurantId, items: [...prev.items, item] };
    });
  };

  const removeFromCart = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => !(i.id === id && isSameOptions(i.options, options))
      ),
    }));

  const incrementItem = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && isSameOptions(i.options, options)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    }));

  const decrementItem = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && isSameOptions(i.options, options)
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
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
