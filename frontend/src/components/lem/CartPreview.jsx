import React from "react";
import { useState, useEffect } from "react"; // ← Add useEffect
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

const CartPreview = ({ isEditable = false, userCart = [] }) => {
  const [cart, setCart] = useState(userCart); // ← Remove initialCart fallback

  // Add useEffect to update when userCart changes
  useEffect(() => {
    setCart(userCart);
  }, [userCart]);

  const handleIncrement = (id) => {
    if (!isEditable) return;
    setCart((prev) => 
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    if (!isEditable) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    if (!isEditable) return;
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {cart.map((item) => ( // ← Change cart.items to just cart
        <div
          key={item.id}
          className="flex items-start justify-between py-4 border-b"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
          />

          <div className="flex-1 mx-3">
            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
            {item.customizations && item.customizations.length > 0 && ( // ← Add safety check
              <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                {item.customizations.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            )}
            <p className="text-sm font-semibold mt-1">
              ₦{item.price.toLocaleString()}
            </p>
          </div>

          {/* Quantity + Buttons */}
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
            {isEditable && (
              <button
                onClick={() => handleRemove(item.id)}
                className="text-gray-600 hover:text-red-500"
              >
                <FiTrash2 size={16} />
              </button>
            )}

            {isEditable && (
              <button
                onClick={() => handleDecrement(item.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FiMinus size={16} />
              </button>
            )}

            <span className="text-sm">{item.quantity}</span>

            {isEditable && (
              <button
                onClick={() => handleIncrement(item.id)}
                className="text-gray-600 hover:text-green-500"
              >
                <FiPlus size={16} />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Items Button */}
      {isEditable && (
        <div className="mt-4 flex justify-end">
          <button className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            <AiOutlinePlus size={16} className="mr-1" /> Add items
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
