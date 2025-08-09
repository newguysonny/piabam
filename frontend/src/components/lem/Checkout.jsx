// components/Checkout.jsx
import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx"


const Crew = [
  {
    id: 1,
    name: "Tomiwa & Friends",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 12,
    capacity: 30,
    address: "Yaba Lagos",
    subtotal: 7200,
    diatance: "1 mile",
    location: { lat: 6.5244, lng: 3.3792 },
    description: "Hey! Join the Meal Crew – where good food and great vibes come together. Let’s eat, share, and enjoy every bite. You in? 🍽️😋",
  },
  {
    id: 2,
    name: "Nneka Meal Party",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 25,
    capacity: 50,
    address: " Presto Close, Victoria Island",
    subtotal: 5200,
    diatance: "0.5 mile",
    location: { lat: 6.4551, lng: 3.3942 },
    description:" ",
  },
];

export default function Checkout({ crew.subtotal, escrowFee = 1700, discount = 1500 }) {
  const navigate = useNavigate();
  const total = crew.subtotal + escrowFee - discount;
  const isEditable = true;
  return (
    <div className="bg-white rounded-t-2xl shadow-lg p-4 w-full max-w-md mx-auto">
      <h1 className="text-xl font-bold">Checkout</h1>
      <Cart isEditable={true} />
      {/* Subtotal */}
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Subtotal</span>
        <span>₦{crew.subtotal.toLocaleString()}</span>
      </div>

      {/* Escrow Fee */}
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Escrow fee</span>
        <span>₦{escrowFee.toLocaleString()}</span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-green-600 mb-2">
          <span>Discount</span>
          <span>-₦{discount.toLocaleString()}</span>
        </div>
      )}

      {/* Divider */}
      <hr className="my-3" />

      {/* Total */}
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Order total</span>
        <span>₦{total.toLocaleString()}</span>
      </div>

      {/* Button */}
      <button onClick={() => navigate("/payment-method")}
      className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition">
        Confirm order
      </button>
    </div>
  );
}
