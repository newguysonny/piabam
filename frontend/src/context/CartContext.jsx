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
