import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi"; // icons
import { AiOutlinePlus } from "react-icons/ai"; // add item icon

// Sample data
const initialCart = [
  {
    id: 1,
    name: "Sweet Chipotle BBQ Sauce",
    price: 0.73,
    quantity: 1,
    image: "https://source.unsplash.com/80x80/?sauce",
    customizations: [],
  },
  {
    id: 2,
    name: "Sweet Chipotle BBQ Crispy Chicken Wrap",
    price: 8.89,
    quantity: 1,
    image: "https://source.unsplash.com/80x80/?burrito",
    customizations: [
      "Extra Crispy Chicken Strip ($1.83)",
      "Cheese",
      "Lettuce",
      "Pico De Gallo",
      "Purple Cabbage",
      "Spicy Ranch",
      "Sweet Chipotle BBQ Sauce",
    ],
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);
  const isEditable = false; // toggle based on view

  const handleIncrement = (id) => {
    if (!isEditable) {
      toast.info("Items can only be updated in the crew group");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    if (!isEditable) {
      toast.info("Items can only be updated in the crew group");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    if (!isEditable) {
      toast.info("Items can only be updated in the crew group");
      return;
    }
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between py-4 border-b"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
          />

          {/* Info */}
          <div className="flex-1 mx-3">
            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
            {item.customizations.length > 0 && (
              <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                {item.customizations.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            )}
            <p className="text-sm font-semibold mt-1">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
            <button
              onClick={() => handleRemove(item.id)}
              className="text-gray-600 hover:text-red-500"
              title="Remove item"
            >
              <FiTrash2 size={16} />
            </button>
            <button
              onClick={() => handleDecrement(item.id)}
              className="text-gray-600 hover:text-gray-800"
              title="Decrease"
            >
              <FiMinus size={16} />
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button
              onClick={() => handleIncrement(item.id)}
              className="text-gray-600 hover:text-green-500"
              title="Increase"
            >
              <FiPlus size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Add Items Small Button */}
      <div className="mt-4 flex justify-end">
        <button className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
          <AiOutlinePlus size={16} className="mr-1" /> Add items
        </button>
      </div>

      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Cart;
