import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MenuSection from "../../components/restaurant/MenuSection";
import FloatingCartButton from "../../components/restaurant/FloatingCartButton";
import ItemOptions from "../../components/restaurant/ItemOptions";
import RestaurantInfo from "../../components/restaurant/RestaurantInfo";
import DeliveryPickupToggle from "../../components/restaurant/DeliveryPickupToggle";

export default function RestaurantPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [mode, setMode] = useState("pickup"); // pickup | delivery

  const cartCount = cart.length;

  const items = [
    {
      id: 1,
      name: "Custom Beef Steak Hoagie",
      price: 5.29,
      image:
        "https://placehold.co/600x400/F97316/FFFFFF?text=Beef+Steak+Hoagie",
    },
    {
      id: 2,
      name: "Ham Hoagie",
      price: 4.99,
      image: "https://placehold.co/600x400/2563EB/FFFFFF?text=Ham+Hoagie",
    },
    {
      id: 3,
      name: "Turkey & Ham Club Sandwich",
      price: 9.39,
      image:
        "https://placehold.co/600x400/16A34A/FFFFFF?text=Turkey+%26+Ham+Club",
      options: [
        {
          id: "bread",
          name: "Choose Bread",
          type: "single",
          choices: [
            { id: "white", label: "White Bread", price: 0 },
            { id: "wheat", label: "Wheat Bread", price: 0.5 },
            { id: "gluten", label: "Gluten Free", price: 1.0 },
          ],
        },
        {
          id: "extras",
          name: "Add Extras",
          type: "multiple",
          choices: [
            { id: "cheese", label: "Cheese", price: 1.0 },
            { id: "bacon", label: "Bacon", price: 1.5 },
          ],
        },
      ],
    },
  ];

  const handleAddToCart = (item) => {
    if (item.options && item.options.length > 0) {
      setModalItem(item);
    } else {
      setCart((prev) => [...prev, { ...item, totalPrice: item.price }]);
      toast.success(`${item.name} ₦${item.price.toFixed(2)} (1) added to cart`);
    }
  };

  const handleConfirmOptions = (selectedOptions, totalPrice) => {
    setCart((prev) => [
      ...prev,
      { ...modalItem, selectedOptions, totalPrice },
    ]);
    toast.success(
      `${modalItem.name} ₦${totalPrice.toFixed(2)} (1) added to cart`
    );
    setModalItem(null);
  };

  return (
    <div className="bg-white-50 min-h-screen"> 
      
      <div>
      <RestaurantInfo />
      </div>
      
      <div className="mt-4 p-4">
      <DeliveryPickupToggle mode={mode} setMode={setMode} />
      </div>
      
      <MenuSection
        menu="Hoagies & Specialty Sandwiches"
        items={items}
        onAdd={handleAddToCart}
      />

      {!modalItem && cartCount > 0 && (
        <FloatingCartButton
          itemCount={cartCount}
          onClick={() => navigate("/checkout")}
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
