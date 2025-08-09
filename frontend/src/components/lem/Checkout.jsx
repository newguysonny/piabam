// components/Checkout.jsx
import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx"

export default function Checkout({ subtotal, escrowFee, discount }) {
  const navigate = useNavigate();
  const total = subtotal + escrowFee - discount;
  const isEditable = true;
  return (
    <div className="bg-white rounded-t-2xl shadow-lg p-4 w-full max-w-md mx-auto">
      <h1 className="text-xl font-bold">Checkout</h1>
      <Cart isEditable={true} />
      {/* Subtotal */}
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Subtotal</span>
        <span>₦{subtotal.toLocaleString()}</span>
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
      <buttonon Click={() => navigate("/payment-method")}
      className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition">
        Confirm order
      </button>
    </div>
  );
}
