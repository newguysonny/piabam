import React, { useState, useRef } from 'react';

export default function EscrowForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    price: '',
    shippingFee: '0',
    shippingMethod: 'standard'
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Item management
  const handleAddItem = () => {
    if (!currentItem.name || !currentItem.price) return;

    const newItem = {
      ...currentItem,
      price: parseFloat(currentItem.price) || 0,
      shippingFee: parseFloat(currentItem.shippingFee) || 0
    };

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setCurrentItem({
      name: '',
      price: '',
      shippingFee: '0',
      shippingMethod: 'standard'
    });
  };

  const handleEditItem = (index) => {
    setCurrentItem(items[index]);
    setEditingIndex(index);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculations
  const calculateTotals = () => {
    const formData = formRef.current ? new FormData(formRef.current) : null;
    const escrowPayer = formData?.get('escrowPayer') || 'buyer';

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const shippingTotal = items.reduce((sum, item) => sum + item.shippingFee, 0);
    
    const escrowBaseFee = 1600;
    const escrowAdditional = Math.floor(subtotal / 10000) * 500;
    const escrowFee = Math.max(escrowBaseFee, escrowBaseFee + escrowAdditional);
    
    const buyerPays = escrowPayer === 'buyer'
      ? subtotal + shippingTotal + escrowFee
      : subtotal + shippingTotal;
      
    const sellerReceives = escrowPayer === 'buyer'
      ? subtotal + shippingTotal
      : subtotal + shippingTotal - escrowFee;

    return {
      subtotal,
      shippingTotal,
      escrowFee,
      escrowBaseFee,
      escrowAdditional,
      buyerPays,
      sellerReceives,
      currency: formData?.get('currency') || 'NGN'
    };
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const transactionData = {
      ...Object.fromEntries(formData),
      items,
      ...calculateTotals()
    };
    console.log('Transaction Data:', transactionData);
    nextStep(); // Move to success step
  };

  // Step components
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Start Transaction</h2>
      
      <div>
        <label className="block mb-1">Transaction Title*</label>
        <input
          name="title"
          type="text"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Your Role*</label>
          <select name="role" className="w-full p-2 border rounded" defaultValue="buyer">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Currency*</label>
          <select name="currency" className="w-full p-2 border rounded" defaultValue="NGN">
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1">Escrow Duration (days)</label>
        <input
          name="duration"
          type="number"
          min="1"
          max="30"
          placeholder="Max 30 days"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </div>
  );

  const TransactionDetailsStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transaction Details</h2>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="p-3 border rounded relative">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Shipping: {item.shippingMethod} ({item.shippingFee})</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditItem(index)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Form */}
      <div className="border-t pt-4 space-y-4">
        <h3 className="font-medium">
          {editingIndex !== null ? 'Edit Item' : 'Add New Item'}
        </h3>
        
        <div>
          <label className="block mb-1">Item Name*</label>
          <input
            value={currentItem.name}
            onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Price*</label>
            <input
              type="number"
              value={currentItem.price}
              onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-1">Shipping Method</label>
            <select
              value={currentItem.shippingMethod}
              onChange={(e) => setCurrentItem({...currentItem, shippingMethod: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="standard">Standard</option>
              <option value="express">Express</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1">Shipping Fee</label>
            <input
              type="number"
              value={currentItem.shippingFee}
              onChange={(e) => setCurrentItem({...currentItem, shippingFee: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">Escrow Fee Payer</label>
          <select
            name="escrowPayer"
            className="w-full p-2 border rounded"
            defaultValue="buyer"
          >
            <option value="buyer">Buyer Pays Fee</option>
            <option value="seller">Seller Pays Fee</option>
          </select>
        </div>
        
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {editingIndex !== null ? 'Update Item' : 'Add Item'}
        </button>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={items.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Review Transaction
        </button>
      </div>
    </div>
  );

  const ConfirmStep = () => {
    const {
      subtotal,
      shippingTotal,
      escrowFee,
      buyerPays,
      sellerReceives,
      currency
    } = calculateTotals();
    
    const currencySymbol = currency === 'NGN' ? '₦' : '$';

    return (
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold">Confirm Transaction</h2>
        
        {/* Items Review */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="p-3 border rounded">
              <h3 className="font-medium">{item.name}</h3>
              <p>Price: {currencySymbol}{item.price.toLocaleString()}</p>
              <p>Shipping: {currencySymbol}{item.shippingFee.toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        {/* Transaction Summary */}
        <div className="p-4 border rounded space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{currencySymbol}{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee:</span>
            <span>{currencySymbol}{shippingTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Escrow Fee:</span>
            <span>{currencySymbol}{escrowFee.toLocaleString()}</span>
          </div>
          
          <hr className="my-2" />
          
          <div className="flex justify-between font-bold">
            <span>Buyer Pays:</span>
            <span>{currencySymbol}{buyerPays.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Seller Receives:</span>
            <span>{currencySymbol}{sellerReceives.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Counterparty Details */}
        <div className="p-4 border rounded space-y-3">
          <h3 className="font-medium">
            {formRef.current?.role?.value === 'buyer' ? 'Seller' : 'Buyer'} Details
          </h3>
          
          <div>
            <label className="block mb-1">Email*</label>
            <input
              name="otherPartyEmail"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-1">Phone</label>
            <input
              name="otherPartyPhone"
              type="tel"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        {/* Terms Agreement */}
        <div className="flex items-center">
          <input
            name="termsAccepted"
            type="checkbox"
            required
            className="mr-2"
          />
          <label>I agree to the terms and conditions</label>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm Transaction
          </button>
        </div>
      </form>
    );
  };

  const SuccessStep = () => {
    const transactionId = `TRX-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-600">Transaction Created!</h2>
        <p className="my-4">Transaction ID: {transactionId}</p>
        
        <button
          onClick={() => {
            formRef.current?.reset();
            setItems([]);
            setStep(1);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New Transaction
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        {step === 1 && <BasicInfoStep />}
        {step === 2 && <TransactionDetailsStep />}
        {step === 3 && <ConfirmStep />}
        {step === 4 && <SuccessStep />}
      </div>
    </div>
  );
}
