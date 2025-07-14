import { useState } from 'react';

const EscrowFormPage = () => {
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
  const [newItem, setNewItem] = useState({
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

  // Validation
  const validateStep = () => {
    if (step === 1) {
      if (!formData.title) {
        alert('Please enter a transaction title');
        return false;
      }
      if (formData.duration && formData.duration > 30) {
        alert('Maximum escrow duration is 30 days');
        return false;
      }
    }
    if (step === 2 && formData.items.length === 0) {
      alert('Please add at least one item');
      return false;
    }
    if (step === 3) {
      if (!formData.otherParty.email || !formData.otherParty.phone) {
        alert('Please enter counterparty details');
        return false;
      }
      if (!formData.termsAccepted) {
        alert('You must accept the terms');
        return false;
      }
    }
    return true;
  };

  // Item Management
  const handleAddItem = () => {
    if (!newItem.category || !newItem.name || !newItem.price) {
      alert('Please fill required item fields');
      return;
    }

    const item = {
      ...newItem,
      price: parseFloat(newItem.price),
      shippingFee: parseFloat(newItem.shippingFee) || 0
    };

    setFormData({
      ...formData,
      items: [...formData.items, item]
    });

    setNewItem({
      category: '',
      name: '',
      price: '',
      description: '',
      shippingMethod: 'standard',
      shippingFee: ''
    });
  };

  // Calculations
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.price, 0);
    const shipping = formData.items.reduce((sum, item) => sum + (item.shippingFee || 0), 0);
    
    const escrowFee = Math.max(1600, 1600 + Math.floor(subtotal / 10000) * 500);
    
    const buyerPays = formData.escrowPayer === 'buyer' 
      ? subtotal + shipping + escrowFee 
      : subtotal + shipping;
      
    const sellerReceives = formData.escrowPayer === 'buyer' 
      ? subtotal + shipping 
      : subtotal + shipping - escrowFee;

    return { subtotal, shipping, escrowFee, buyerPays, sellerReceives };
  };

  // Step Components
  const BasicInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Start Transaction</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Title*</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Role*</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency*</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({...formData, currency: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Escrow Duration (days)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          min="1"
          max="30"
          placeholder="Enter duration (max 30 days)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.duration > 30 && (
          <p className="text-red-500 text-xs mt-1">Maximum duration is 30 days</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );

  const TransactionDetailsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Transaction Details</h2>

      {/* Items List */}
      <div className="space-y-3">
        {formData.items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">Price: {item.price} {formData.currency}</p>
                <p className="text-sm text-gray-600">Shipping: {item.shippingMethod} ({item.shippingFee} {formData.currency})</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setNewItem(formData.items[index]);
                    setFormData({
                      ...formData,
                      items: formData.items.filter((_, i) => i !== index)
                    });
                  }}
                  className="p-1 text-yellow-600 hover:text-yellow-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => setFormData({
                    ...formData,
                    items: formData.items.filter((_, i) => i !== index)
                  })}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Form */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium text-gray-800">Add New Item</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="goods">Goods</option>
              <option value="freight">Freight</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
            <select
              value={newItem.shippingMethod}
              onChange={(e) => setNewItem({...newItem, shippingMethod: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Fee</label>
            <input
              type="number"
              value={newItem.shippingFee}
              onChange={(e) => setNewItem({...newItem, shippingFee: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Escrow Fee Payer</label>
          <select
            value={formData.escrowPayer}
            onChange={(e) => setFormData({...formData, escrowPayer: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="buyer">Buyer Pays Fee</option>
            <option value="seller">Seller Pays Fee</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddItem}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {newItem.name ? 'Update Item' : 'Add Item'}
          </button>
          <button
            onClick={nextStep}
            disabled={formData.items.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review Transaction
          </button>
        </div>
      </div>
    </div>
  );

  const ConfirmTransactionStep = () => {
    const { subtotal, shipping, escrowFee, buyerPays, sellerReceives } = calculateTotals();
    const currencySymbol = formData.currency === 'NGN' ? '₦' : formData.currency === 'USD' ? '$' : '€';

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Confirm Transaction</h2>
        
        {/* Items Review */}
        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">Price: {currencySymbol}{item.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Shipping: {item.shippingMethod} ({currencySymbol}{item.shippingFee.toLocaleString()})</p>
            </div>
          ))}
        </div>
        
        {/* Transaction Summary */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-medium">{currencySymbol}{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Shipping Fee:</span>
            <span className="font-medium">{currencySymbol}{shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Escrow Fee:</span>
            <span className="font-medium">{currencySymbol}{escrowFee.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500">
            Escrow fee = {currencySymbol}1600 (base) + {currencySymbol}{Math.floor(subtotal / 10000) * 500} ({currencySymbol}500 per {currencySymbol}10,000)
          </div>
          
          <hr className="my-2 border-gray-300" />
          
          <div className="flex justify-between font-bold">
            <span className="text-gray-800">Buyer Pays:</span>
            <span className="text-blue-600">{currencySymbol}{buyerPays.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Seller Receives:</span>
            <span className="text-green-600">{currencySymbol}{sellerReceives.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Counterparty Details */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
          <h3 className="font-medium text-gray-800">
            {formData.role === 'buyer' ? 'Seller' : 'Buyer'} Details
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <input
              type="email"
              value={formData.otherParty.email}
              onChange={(e) => setFormData({
                ...formData,
                otherParty: {...formData.otherParty, email: e.target.value}
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input
              type="tel"
              value={formData.otherParty.phone}
              onChange={(e) => setFormData({
                ...formData,
                otherParty: {...formData.otherParty, phone: e.target.value}
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        {/* Terms Agreement */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="terms"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({
                ...formData,
                termsAccepted: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the escrow terms and conditions
            </label>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Add More Items
          </button>
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Transaction
          </button>
        </div>
      </div>
    );
  };

  const SuccessStep = () => {
    const transactionId = `TRX-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    const transactionLink = `${window.location.origin}/transaction/${transactionId}`;

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    };

    return (
      <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-gray-800">Transaction Created!</h2>
        <p className="mt-2 text-gray-600">
          Your transaction is pending confirmation. Share the details below with the other party.
        </p>
        
        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200 text-left">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction Details</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                readOnly
                value={transactionId}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToClipboard(transactionId)}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Link</label>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                readOnly
                value={transactionLink}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToClipboard(transactionLink)}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="w-40 h-40 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">QR Code</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
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
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            New Transaction
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        {step === 1 && <BasicInfoStep />}
        {step === 2 && <TransactionDetailsStep />}
        {step === 3 && <ConfirmTransactionStep />}
        {step === 4 && <SuccessStep />}
      </div>
    </div>
  );
};

export default EscrowFormPage;
