import { useState } from 'react';

const EscrowForm = () => {
  // Main form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    role: 'buyer',
    currency: 'NGN',
    duration: '',
    items: [],
    escrowPayer: 'buyer',
    otherParty: { email: '', phone: '' },
    termsAccepted: false
  });

  // Temporary item being added/edited
  const [currentItem, setCurrentItem] = useState({
    category: '',
    name: '',
    price: '',
    description: '',
    shippingMethod: 'standard',
    shippingFee: ''
  });

  // Navigation
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Form validation
  const validateStep = () => {
    if (step === 1 && !formData.title) {
      alert('Please enter a transaction title');
      return false;
    }
    if (step === 2 && formData.items.length === 0) {
      alert('Please add at least one item');
      return false;
    }
    if (step === 3 && (!formData.otherParty.email || !formData.termsAccepted)) {
      alert('Please complete all required fields');
      return false;
    }
    return true;
  };

  // Item management
  const handleAddItem = () => {
    if (!currentItem.category || !currentItem.name || !currentItem.price) {
      alert('Please fill required item fields');
      return;
    }

    const newItem = {
      ...currentItem,
      price: parseFloat(currentItem.price) || 0,
      shippingFee: parseFloat(currentItem.shippingFee) || 0
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });

    // Reset item form
    setCurrentItem({
      category: '',
      name: '',
      price: '',
      description: '',
      shippingMethod: 'standard',
      shippingFee: ''
    });
  };

  // Delete item
  const handleDeleteItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  // Edit item
  const handleEditItem = (index) => {
    setCurrentItem(formData.items[index]);
    handleDeleteItem(index);
  };

  // Calculate transaction totals
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.price, 0);
    const shipping = formData.items.reduce((sum, item) => sum + item.shippingFee, 0);
    
    const escrowBaseFee = 1600;
    const escrowAdditional = Math.floor(subtotal / 10000) * 500;
    const escrowFee = Math.max(escrowBaseFee, escrowBaseFee + escrowAdditional);
    
    const buyerPays = formData.escrowPayer === 'buyer' 
      ? subtotal + shipping + escrowFee 
      : subtotal + shipping;
      
    const sellerReceives = formData.escrowPayer === 'buyer' 
      ? subtotal + shipping 
      : subtotal + shipping - escrowFee;

    return { 
      subtotal, 
      shipping, 
      escrowFee, 
      escrowBaseFee,
      escrowAdditional,
      buyerPays, 
      sellerReceives 
    };
  };

  // Step 1: Basic Information
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Start Transaction</h2>
      
      <div>
        <label className="block mb-1">Transaction Title*</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="e.g. Laptop Purchase"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Your Role*</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Currency*</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({...formData, currency: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1">Escrow Duration (days)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          min="1"
          max="30"
          placeholder="Max 30 days"
          className="w-full p-2 border rounded"
        />
        {formData.duration > 30 && (
          <p className="text-red-500 text-sm">Maximum duration is 30 days</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Step 2: Transaction Details
  const TransactionDetailsStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transaction Details</h2>

      {/* Items List */}
      <div className="space-y-2">
        {formData.items.map((item, index) => (
          <div key={index} className="p-3 border rounded relative">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p>Price: {item.price} {formData.currency}</p>
                <p>Shipping: {item.shippingFee} {formData.currency}</p>
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
        <h3 className="font-medium">Add New Item</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Category*</label>
            <select
              value={currentItem.category}
              onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="goods">Goods</option>
              <option value="services">Services</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1">Item Name*</label>
            <input
              type="text"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={currentItem.description}
            onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows={3}
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
            value={formData.escrowPayer}
            onChange={(e) => setFormData({...formData, escrowPayer: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="buyer">Buyer Pays Fee</option>
            <option value="seller">Seller Pays Fee</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Item
          </button>
          <button
            onClick={nextStep}
            disabled={formData.items.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Confirm Transaction
  const ConfirmTransactionStep = () => {
    const { 
      subtotal, 
      shipping, 
      escrowFee, 
      escrowBaseFee,
      escrowAdditional,
      buyerPays, 
      sellerReceives 
    } = calculateTotals();
    
    const currencySymbol = formData.currency === 'NGN' ? '₦' : 
                         formData.currency === 'USD' ? '$' : '€';

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Confirm Transaction</h2>
        
        {/* Items Review */}
        <div className="space-y-2">
          {formData.items.map((item, index) => (
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
            <span>{currencySymbol}{shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Escrow Fee:</span>
            <span>{currencySymbol}{escrowFee.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-600">
            (Base: {currencySymbol}{escrowBaseFee} + Additional: {currencySymbol}{escrowAdditional})
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
            {formData.role === 'buyer' ? 'Seller' : 'Buyer'} Details
          </h3>
          
          <div>
            <label className="block mb-1">Email*</label>
            <input
              type="email"
              value={formData.otherParty.email}
              onChange={(e) => setFormData({
                ...formData,
                otherParty: {...formData.otherParty, email: e.target.value}
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              value={formData.otherParty.phone}
              onChange={(e) => setFormData({
                ...formData,
                otherParty: {...formData.otherParty, phone: e.target.value}
              })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        {/* Terms Agreement */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({
              ...formData,
              termsAccepted: e.target.checked
            })}
            className="mr-2"
            required
          />
          <label htmlFor="terms">I agree to the terms</label>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  // Step 4: Success
  const SuccessStep = () => {
    const transactionId = `TRX-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    const transactionLink = `${window.location.origin}/tx/${transactionId}`;

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert('Copied!');
    };

    return (
      <div className="text-center p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-600">Success!</h2>
        <p className="my-4">Your transaction has been created.</p>
        
        <div className="bg-white p-4 rounded border text-left">
          <div className="mb-3">
            <label className="block mb-1">Transaction ID</label>
            <div className="flex">
              <input
                type="text"
                value={transactionId}
                readOnly
                className="flex-1 p-2 border rounded-l"
              />
              <button
                onClick={() => copyToClipboard(transactionId)}
                className="px-3 bg-gray-200 border-t border-r border-b rounded-r"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Shareable Link</label>
            <div className="flex">
              <input
                type="text"
                value={transactionLink}
                readOnly
                className="flex-1 p-2 border rounded-l"
              />
              <button
                onClick={() => copyToClipboard(transactionLink)}
                className="px-3 bg-gray-200 border-t border-r border-b rounded-r"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              setFormData({
                title: '',
                role: 'buyer',
                currency: 'NGN',
                duration: '',
                items: [],
                escrowPayer: 'buyer',
                otherParty: { email: '', phone: '' },
                termsAccepted: false
              });
              setStep(1);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            New Transaction
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Dashboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        {step === 1 && <BasicInfoStep />}
        {step === 2 && <TransactionDetailsStep />}
        {step === 3 && <ConfirmTransactionStep />}
        {step === 4 && <SuccessStep />}
      </div>
    </div>
  );
};

export default EscrowForm;
