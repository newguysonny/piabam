// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate existing cart items to new structure
        const items = parsed.items.map(item => ({
          ...item,
          unitPrice: item.unitPrice || item.price,
          totalPrice: (item.unitPrice || item.price) * (item.quantity || 1),
          quantity: item.quantity || 1
        }));
        return { ...parsed, items };
      } catch {
        return { restaurantId: null, items: [] };
      }
    }
    return { restaurantId: null, items: [] };
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Helper to compare options
  const sameOptions = (a, b) =>
    JSON.stringify(a ?? []) === JSON.stringify(b ?? []);

  // Normalize options for consistent comparison
  const normalizeOptions = (options) => {
    if (!options) return null;
    if (Array.isArray(options)) return options.map(String);
    if (typeof options === "object") return Object.entries(options).map(([k,v]) => `${k}:${v}`);
    return [String(options)];
  };

  // Add to cart with proper price tracking
  const addToCart = (item, restaurantId) => {
    const sanitizedItem = {
      ...item,
      unitPrice: item.price, // Store base price
      totalPrice: item.price * (item.quantity || 1), // Calculate initial total
      options: normalizeOptions(item.options),
      quantity: item.quantity || 1,
    };

    setCart((prev) => {
      // Clear cart if switching restaurants
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        return { restaurantId, items: [sanitizedItem] };
      }

      // Find existing item with same options
      const existingIndex = prev.items.findIndex(
        (i) => i.id === sanitizedItem.id && sameOptions(i.options, sanitizedItem.options)
      );

      // Update quantity if exists
      if (existingIndex >= 0) {
        const updatedItems = [...prev.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + sanitizedItem.quantity,
          totalPrice: updatedItems[existingIndex].unitPrice * 
                     (updatedItems[existingIndex].quantity + sanitizedItem.quantity)
        };
        return { ...prev, items: updatedItems };
      }

      // Add new item
      return { 
        ...prev, 
        restaurantId, 
        items: [...prev.items, sanitizedItem] 
      };
    });
  };

  // Remove item completely
  const removeFromCart = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => !(i.id === id && sameOptions(i.options, normalizeOptions(options)))
      ),
    }));

  // Increment quantity with price update
  const incrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && sameOptions(i.options, normalizeOptions(options))
          ? {
              ...i,
              quantity: i.quantity + 1,
              totalPrice: i.unitPrice * (i.quantity + 1)
            }
          : i
      ),
    }));

  // Decrement quantity with price update (removes if reaches 0)
  const decrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          i.id === id && sameOptions(i.options, normalizeOptions(options))
            ? {
                ...i,
                quantity: i.quantity - 1,
                totalPrice: i.unitPrice * (i.quantity - 1)
              }
            : i
        )
        .filter((i) => i.quantity > 0),
    }));

  // Clear entire cart
  const clearCart = () => setCart({ restaurantId: null, items: [] });

  // Calculate cart-wide totals
  const cartTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        itemCount,
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

  // ✅ sanitize options before saving
  const normalizeOptions = (options) => {
    if (!options) return null;

    if (Array.isArray(options)) {
      return options.map((opt) =>
        typeof opt === "object" ? JSON.stringify(opt) : String(opt)
      );
    }

    if (typeof options === "object") {
      return Object.entries(options).map(
        ([key, val]) => `${key}: ${String(val)}`
      );
    }

    return [String(options)];
  };

  // ✅ Add to cart
  const addToCart = (item, restaurantId) => {
    const sanitizedItem = {
      ...item,
      options: normalizeOptions(item.options), // 🔥 always clean
      quantity: item.quantity ?? 1,
    };

    setCart((prev) => {
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        // reset if switching restaurants
        return { restaurantId, items: [sanitizedItem] };
      }

      const existing = prev.items.find(
        (i) =>
          i.id === sanitizedItem.id &&
          sameOptions(i.options, sanitizedItem.options)
      );

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === sanitizedItem.id &&
            sameOptions(i.options, sanitizedItem.options)
              ? { ...i, quantity: i.quantity + sanitizedItem.quantity }
              : i
          ),
        };
      }

      return { ...prev, restaurantId, items: [...prev.items, sanitizedItem] };
    });
  };

  // ✅ Remove specific item
  const removeFromCart = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => !(i.id === id && sameOptions(i.options, normalizeOptions(options)))
      ),
    }));

  // ✅ Increment
  const incrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id && sameOptions(i.options, normalizeOptions(options))
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    }));

  // ✅ Decrement
  const decrementItem = (id, options) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          i.id === id && sameOptions(i.options, normalizeOptions(options))
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
*/
