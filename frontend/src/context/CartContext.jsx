// src/context/CartContext.jsx
// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { restaurantId: null, items: [] };
  });

  // persist
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Helper to compare options
  const sameOptions = (a, b) =>
    JSON.stringify(a ?? []) === JSON.stringify(b ?? []);

  // ✅ Add to cart
  const addToCart = (item, restaurantId) => {
    setCart((prev) => {
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        // reset if switching restaurants
        return { restaurantId, items: [item] };
      }

      const existing = prev.items.find(
        (i) => i.id === item.id && sameOptions(i.options, item.options)
      );

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id && sameOptions(i.options, item.options)
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      return { ...prev, restaurantId, items: [...prev.items, item] };
    });
  };

  // ✅ Remove specific item
  const removeFromCart = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => !(i.id === id && sameOptions(i.options, options))
      ),
    }));

  // ✅ Increment
  const incrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && sameOptions(i.options, options)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    }));

  // ✅ Decrement (remove if qty <= 0)
  const decrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          i.id === id && sameOptions(i.options, options)
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
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



/*
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const DEFAULT_CART = {
  restaurantId: null,
  items: [],
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);

        // ✅ Normalize shape to prevent blank screen
        return {
          restaurantId: parsed.restaurantId ?? null,
          items: Array.isArray(parsed.items) ? parsed.items : [],
        };
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage:", e);
    }
    return DEFAULT_CART;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // --- Actions ---
  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const removeFromCart = (id, options) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) =>
          !(i.id === id && JSON.stringify(i.options) === JSON.stringify(options))
      ),
    }));
  };

  const incrementItem = (id, options) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && JSON.stringify(i.options) === JSON.stringify(options)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    }));
  };

  const decrementItem = (id, options) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          i.id === id && JSON.stringify(i.options) === JSON.stringify(options)
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    }));
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, incrementItem, decrementItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
*/
