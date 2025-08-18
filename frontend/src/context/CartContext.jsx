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

  const normalizeItem = (item) => {
    return {
      ...item,
      options: item.options || item.customizations || [], // normalize
    };
  };

  const addToCart = (item, restaurantId) => {
    const normalized = normalizeItem(item);

    setCart((prev) => {
      // If different restaurant → reset cart
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        return { restaurantId, items: [normalized] };
      }

      // Check if same item (id + options)
      const existing = prev.items.find(
        (i) =>
          i.id === normalized.id &&
          JSON.stringify(i.options) === JSON.stringify(normalized.options)
      );

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === normalized.id &&
            JSON.stringify(i.options) === JSON.stringify(normalized.options)
              ? { ...i, quantity: i.quantity + normalized.quantity }
              : i
          ),
        };
      }

      // Else add new
      return { ...prev, restaurantId, items: [...prev.items, normalized] };
    });
  };

  const removeFromCart = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) =>
          !(
            i.id === id &&
            JSON.stringify(i.options) === JSON.stringify(options)
          )
      ),
    }));

  const incrementItem = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id &&
        JSON.stringify(i.options) === JSON.stringify(options)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    }));

  const decrementItem = (id, options = []) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id &&
        JSON.stringify(i.options) === JSON.stringify(options)
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
