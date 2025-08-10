// components/Checkout.jsx
import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx"
import  {FaArrowLeft} from "react-icons/fa";


export default function Checkout({ subtotal= 7200, escrowFee = 1700, discount = 1500 }) {
   
  const navigate = useNavigate();
  const total = subtotal + escrowFee - discount;
  const isEditable = true;
  return (
    <div className="bg-white rounded-t-2xl shadow-lg p-4 w-full max-w-md mx-auto">
       {/* Back button */}
       <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-8 text-gray-600 hover:text-black"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
       
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
      <div className="flex sticky bottom-0 left-0 right-0 justify-between font-bold text-lg mb-4">
        <span>Order total</span>
        <span>₦{total.toLocaleString()}</span>
      

      {/* Button */}
      <button onClick={() => navigate("/payment-method")}
      className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition">
        Confirm order
      </button>
    </div>
    </div>
  );
}
