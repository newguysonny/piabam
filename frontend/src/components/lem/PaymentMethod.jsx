/*
export default function PaymentMethod() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Select Payment Method</h1>
      {/* Payment options here /}
    </div>
  );
}
*/

import { useState } from "react";

export default function PaymentMethod({ amountDue = 7200, onComplete }) {
  const [selectedMethod, setSelectedMethod] = useState("transfer");

  const methods = [
    { id: "card", label: "Add bank card", type: "link", color: "text-green-600" },
    { id: "transfer", label: "Pay with transfer" },
    { id: "pocket", label: "Pay with Pocket App" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Payments Title */}
      <h2 className="text-lg font-semibold mb-4">Payments</h2>

      {/* Add bank card */}
      <button
        onClick={() => setSelectedMethod("card")}
        className="flex items-center text-green-600 font-medium mb-4"
      >
        <span className="text-xl mr-2">＋</span> Add bank card
      </button>

      {/* Payment Options */}
      <div className="space-y-4">
        {methods
          .filter((m) => m.type !== "link")
          .map((method) => (
            <label
              key={method.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {method.id === "pocket" && (
                  <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs">
                    ₱
                  </div>
                )}
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

      {/* Amount Due */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Amount due</span>
          <span className="font-bold text-lg">
            ₦{amountDue.toLocaleString()}
          </span>
        </div>

        <button
          onClick={onComplete}
          disabled={!selectedMethod}
          className={`w-full py-3 rounded-lg font-semibold ${
            selectedMethod
              ? "bg-black text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Complete pick up order
        </button>
      </div>
    </div>
  );
}
