import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import MenuSection from "../../components/restaurant/MenuSection";
import FloatingCartButton from "../../components/restaurant/FloatingCartButton";
import ItemOptions from "../../components/restaurant/ItemOptions";
import RestaurantInfo from "../../components/restaurant/RestaurantInfo";
import DeliveryPickupToggle from "../../components/restaurant/DeliveryPickupToggle";

export default function RestaurantPage() {
  const restaurantId = "1"; // mock for now, later you can get it from params
  
  const navigate = useNavigate();
  const { cart, addToCart } = useCart(); //;switched from state useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [mode, setMode] = useState("pickup"); // pickup | delivery

  const cartCount = cart.length;

  const menu = [
  {
    name: "Hoagies and Specialty Sandwiches",
    menu_items: [
      {
        id: 1,
        name: "Custom Beef Steak Hoagie",
        price: 5.29,
        image: "https://placehold.co/600x400/F97316/FFFFFF?text=Beef+Steak+Hoagie"
      },
      {
        id: 2,
        name: "Ham Hoagie",
        price: 4.99,
        image: "https://placehold.co/600x400/2563EB/FFFFFF?text=Ham+Hoagie"
      },
      {
        id: 3,
        name: "Turkey & Ham Club Sandwich",
        price: 9.39,
        image: "https://placehold.co/600x400/16A34A/FFFFFF?text=Turkey+%26+Ham+Club",
        options: [
          {
            id: "bread",
            name: "Choose Bread",
            type: "single",
            choices: [
              { id: "white", label: "White Bread", price: 0 },
              { id: "wheat", label: "Wheat Bread", price: 0.5 }
            ]
          },
          {
            id: "extras",
            name: "Add Extras",
            type: "multiple",
            choices: [
              { id: "cheese", label: "Cheese", price: 1.0 },
              { id: "bacon", label: "Bacon", price: 1.5 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Gourmet Burgers",
    menu_items: [
      {
        id: 4,
        name: "Classic Cheeseburger",
        price: 7.99,
        image: "https://placehold.co/600x400/DC2626/FFFFFF?text=Classic+Cheeseburger",
        options: [
          {
            id: "doneness",
            name: "Cook Level",
            type: "single",
            choices: [
              { id: "medium", label: "Medium", price: 0 },
              { id: "well-done", label: "Well Done", price: 0 }
            ]
          },
          {
            id: "toppings",
            name: "Add Toppings",
            type: "multiple",
            choices: [
              { id: "avocado", label: "Avocado", price: 1.5 },
              { id: "mushrooms", label: "Mushrooms", price: 1.0 }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Spicy BBQ Burger",
        price: 8.99,
        image: "https://placehold.co/600x400/EA580C/FFFFFF?text=Spicy+BBQ+Burger"
      }
    ]
  },
  {
    name: "Fresh Salads",
    menu_items: [
      {
        id: 6,
        name: "Caesar Salad",
        price: 6.49,
        image: "https://placehold.co/600x400/65A30D/FFFFFF?text=Caesar+Salad",
        options: [
          {
            id: "protein",
            name: "Add Protein",
            type: "single",
            choices: [
              { id: "chicken", label: "Grilled Chicken", price: 3.0 },
              { id: "shrimp", label: "Shrimp", price: 4.5 }
            ]
          }
        ]
      },
      {
        id: 7,
        name: "Greek Salad",
        price: 5.99,
        image: "https://placehold.co/600x400/0891B2/FFFFFF?text=Greek+Salad"
      }
    ]
  }
];

  const handleAddToCart = (item) => {
  if (item.options && item.options.length > 0) {
    setModalItem(item);
  } else {
    addToCart({ ...item, totalPrice: item.price });
    toast.success(`${item.name} ₦${item.price.toFixed(2)} (1) added to cart`);
  }
};

const handleConfirmOptions = (selectedOptions, totalPrice) => {
  addToCart({ ...modalItem, selectedOptions, totalPrice });
  toast.success(`${modalItem.name} ₦${totalPrice.toFixed(2)} (1) added to cart`);
  setModalItem(null);
};
  
  return (
    <div className="bg-white-50 min-h-screen"> 
      
      <div>
      <RestaurantInfo />
      </div>
      
      <div className="mt-4 p-10">
  <DeliveryPickupToggle mode={mode} setMode={setMode} />
</div>

{menu.map((section, index) => (
  <MenuSection
    key={index}
    menu={section.name}
    items={section.menu_items}
    restaurantId={restaurantId}  // temporarily for restaaurnt add this
    onAdd={handleAddToCart}
  />
))}

      {cartCount > 0 && (
        <FloatingCartButton
          itemCount={cartCount}
          onClick={() => navigate("/checkout")}
          className="border border-red-500"
        />
      )}

      {modalItem && (
        <ItemOptions
          item={modalItem}
          onClose={() => setModalItem(null)}
          onConfirm={handleConfirmOptions}
        />
      )}
    </div>
  );
}

/*
import MenuSection from "../../components/restaurant/MenuSection";
import FloatingCartButton from "../../components/restaurant/FloatingCartButton";
import { useNavigate } from "react-router-dom";

export default function RestaurantPage() {
  const navigate = useNavigate();
  const cartCount = 4; // dynamically from context or state

  

  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuSection
  menu="Hoagies & Specialty Sandwiches"
  items={items}
  onAdd={(item) => console.log("Added:", item)}
/>
      {/* Floating Cart Button /}
      <FloatingCartButton
        itemCount={cartCount}
        onClick={() => navigate("/checkout")}
      />
    </div>
  );
}
*/
