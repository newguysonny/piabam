import React, { useState } from 'react';

// Sample data
const initialCart = [
  {
    id: 1,
    name: 'Sweet Chipotle BBQ Sauce',
    price: 0.73,
    quantity: 1,
    image: 'https://source.unsplash.com/80x80/?sauce',
    customizations: [],
  },
  {
    id: 2,
    name: 'Sweet Chipotle BBQ Crispy Chicken Wrap',
    price: 8.89,
    quantity: 1,
    image: 'https://source.unsplash.com/80x80/?burrito',
    customizations: [
      'Extra Crispy Chicken Strip ($1.83)',
      'Cheese',
      'Lettuce',
      'Pico De Gallo',
      'Purple Cabbage',
      'Spicy Ranch',
      'Sweet Chipotle BBQ Sauce',
    ],
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleIncrement = (id) => {
  alert("Items can only be updated in the crew group");
};
  const handleDecrement = (id) => {
  alert("Items can only be updated in the crew group");
};
  
  
 /* 
 // to be used only within the crew group 
  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
    );
  };
  */
  
  const handleRemove = (id) => {
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
            <h4 className="font-medium text-sm line-clamp-1">
              {item.name}
            </h4>

            {item.customizations.length > 0 && (
              <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                {item.customizations.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            )}

            <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
            <button
              onClick={() => handleRemove(item.id)}
              className="text-gray-600 text-sm hover:text-red-500"
              title="Remove item"
            >
              🗑
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button
              onClick={() => handleIncrement(item.id)}
              className="text-gray-600 text-sm hover:text-green-500"
              title="Add one"
            >
              ➕
            </button>
          </div>
        </div>
      ))}

      {/* Add Items Button */}
      <div className="mt-6">
        <button className="w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2">
          ➕ Add items
        </button>
      </div>
    </div>
  );
};

export default Cart;
