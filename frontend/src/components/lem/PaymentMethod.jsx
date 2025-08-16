import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaCreditCard, FaGlobe } from "react-icons/fa";

export default function PaymentMethod({ amountDue = 7200, onComplete }) {
  const [selectedMethod, setSelectedMethod] = useState("transfer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const methods = [
    { id: "card", label: "Add bank card", icon: <FaCreditCard className="text-green-600" /> },
    { id: "paystack", label: "Pay with Paystack", icon: <FaGlobe className="text-blue-500" /> },
    { id: "flutterwave", label: "Pay with Flutterwave", icon: <FaGlobe className="text-yellow-500" /> },
  ];

  const handleSubmit = async () => {
    if (!selectedMethod) return;
    setLoading(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: selectedMethod,
          amount: amountDue,
        }),
      });

      if (!res.ok) throw new Error("Payment request failed");

      const data = await res.json();
      if (onComplete) onComplete(data);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-t-2xl shadow-sm w-full max-w-md mx-auto pb-28">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-8 text-gray-600 hover:text-black"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-lg font-semibold mb-4">Payments</h2>

      {/* Payment Options */}
      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              {method.icon}
              <span className="font-medium">{method.label}</span>
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="w-5 h-5 text-green-600 focus:ring-green-500"
            />
          </label>
        ))}
      </div>
    </div>

    /* Fixed footer */
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600 font-medium">Amount due</span>
        <span className="font-bold text-lg">₦{amountDue.toLocaleString()}</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedMethod || loading}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          selectedMethod && !loading
            ? "bg-black text-white hover:opacity-90"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : "Complete pick up order"}
      </button>
    </div>
  );
}
