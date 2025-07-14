// pages/EscrowForm.jsx
import { useState } from 'react';

const EscrowFormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    role: 'buyer',
    currency: 'NGN',
    duration: 7,
    items: [],
    editingIndex: null,
    escrowPayer: 'buyer',
    otherParty: { email: '', phone: '' },
    termsAccepted: false,
  });
  const [newItem, setNewItem] = useState({
    category: '',
    itemName: '',
    price: '',
    description: '',
    shippingMethod: 'standard',
    shippingFee: '0'
  });

  // Navigation
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    if (step === 3) {
      setFormData(prev => ({ ...prev, editingIndex: null }));
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  // Item management
  const addItem = () => {
    if (!newItem.category || !newItem.itemName || !newItem.price) return;

    const item = {
      ...newItem,
      price: parseFloat(newItem.price) || 0,
      shippingFee: parseFloat(newItem.shippingFee) || 0
    };

    if (formData.editingIndex !== null) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map((it, i) => i === prev.editingIndex ? item : it),
        editingIndex: null
      }));
    } else {
      setFormData(prev => ({ ...prev, items: [...prev.items, item] }));
    }

    setNewItem({
      category: '',
      itemName: '',
      price: '',
      description: '',
      shippingMethod: 'standard',
      shippingFee: '0'
    });
  };

  const editItem = (index) => {
    setNewItem(formData.items[index]);
    setFormData(prev => ({ ...prev, editingIndex: index }));
  };

  const deleteItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
      editingIndex: null
    }));
  };

  // Validation
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.title) {
        alert('Please enter a transaction title');
        return false;
      }
      if (formData.duration < 1 || formData.duration > 30) {
        alert('Duration must be between 1-30 days');
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
        alert('You must accept the terms and conditions');
        return false;
      }
    }
    return true;
  };

  // Calculations
  const calculateEscrowFee = (amount) => {
    const minimumFee = 1600;
    const additionalFee = Math.floor((amount || 0) / 10000) * 500;
    const totalFee = Math.max(minimumFee, minimumFee + additionalFee);
    return { base: minimumFee, additional: additionalFee, total: totalFee };
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.price || 0), 0);
    const totalShippingFee = formData.items.reduce((sum, item) => sum + (item.shippingFee || 0), 0);
    const escrowFee = calculateEscrowFee(subtotal);
    
    const buyerPrice = formData.escrowPayer === 'buyer'
      ? subtotal + totalShippingFee + escrowFee.total
      : subtotal + totalShippingFee;
      
    const sellerProceeds = formData.escrowPayer === 'buyer'
      ? subtotal + totalShippingFee
      : subtotal + totalShippingFee - escrowFee.total;

    return { subtotal, totalShippingFee, escrowFee, buyerPrice, sellerProceeds };
  };

  // Step components
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Start Transportation</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="NGN">Naira (₦)</option>
          <option value="USD">Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="GBP">Pound (£)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Escrow Duration (days)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          min="1"
          max="30"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const TransactionDetailsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transaction Details</h2>
      
      <div className="space-y-4">
        {formData.items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
            <h3 className="font-medium">{item.itemName}</h3>
            <p>Price: {item.price} {formData.currency}</p>
            <p>Shipping: {item.shippingMethod} ({item.shippingFee} {formData.currency})</p>
            <div className="absolute top-4 right-4 space-x-2">
              <button 
                onClick={() => editItem(index)}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteItem(index)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium">
          {formData.editingIndex !== null ? 'Edit Item' : 'Add New Item'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={newItem.category}
              onChange={handleItemInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="freight">Freight</option>
              <option value="goods">Goods</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={newItem.itemName}
              onChange={handleItemInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleItemInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleItemInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
            <select
              name="shippingMethod"
              value={newItem.shippingMethod}
              onChange={handleItemInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="standard">Standard</option>
              <option value="cargo">Cargo</option>
              <option value="none">No Shipping</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Fee</label>
            <input
              type="number"
              name="shippingFee"
              value={newItem.shippingFee}
              onChange={handleItemInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Escrow Fee Payer</label>
          <select
            name="escrowPayer"
            value={formData.escrowPayer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="buyer">Buyer Pays Escrow Fee</option>
            <option value="seller">Seller Pays Escrow Fee</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 pt-4">
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {formData.editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </div>
        <button
          onClick={nextStep}
          disabled={formData.items.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Review Transaction
        </button>
      </div>
    </div>
  );

  const ConfirmTransactionStep = () => {
    const { subtotal, totalShippingFee, escrowFee, buyerPrice, sellerProceeds } = calculateTotals();

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Confirm Transaction</h2>
        
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">{item.itemName}</h3>
              <p>Price: {item.price} {formData.currency}</p>
              <p>Shipping: {item.shippingMethod} ({item.shippingFee} {formData.currency})</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee:</span>
            <span>{totalShippingFee.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Escrow Fee:</span>
            <span>{escrowFee.total.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="text-sm text-gray-500">
            Escrow fee = ₦{escrowFee.base} (base) + ₦{escrowFee.additional} (₦500 per every ₦10,000)
          </div>
          
          <hr className="my-2" />
          
          <div className="flex justify-between font-bold">
            <span>Buyer Price:</span>
            <span>{buyerPrice.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Seller Proceeds:</span>
            <span>{sellerProceeds.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="text-sm text-gray-500">
            {formData.escrowPayer === 'buyer' 
              ? 'Escrow fee added to buyer' 
              : 'Escrow fee deducted from seller'} | 
            Shipping fee included in seller proceeds
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3">
            {formData.role === 'buyer' ? 'Seller' : 'Buyer'} Details
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.otherParty.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  otherParty: { ...prev.otherParty, email: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.otherParty.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  otherParty: { ...prev.otherParty, phone: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              termsAccepted: e.target.checked
            }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
          >
            Add More Items
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Transaction
          </button>
        </div>
      </div>
    );
  };

  const SuccessStep = () => {
    const transactionId = 'TRX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const transactionLink = `${window.location.origin}/transaction/${transactionId}`;

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    };

    return (
      <div className="text-center p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Transaction Created!</h2>
        <p className="mb-6">
          Your transaction has been created, waiting for both parties to agree. Share the 
          transaction via the URL or QR code so that the other party can agree to the terms.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-left">
          <h3 className="text-lg font-medium mb-4">Transaction Details</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
            <div className="flex">
              <input
                type="text"
                value={transactionId}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToClipboard(transactionId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Link</label>
            <div className="flex">
              <input
                type="text"
                value={transactionLink}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToClipboard(transactionLink)}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="w-40 h-40 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mb-6">
            <span className="text-gray-400">[QR Code]</span>
          </div>
        </div>
        
        <div className="mt-8 space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </button>
          <button 
            onClick={() => {
              setFormData({
                title: '',
                role: 'buyer',
                currency: 'NGN',
                duration: 7,
                items: [],
                editingIndex: null,
                escrowPayer: 'buyer',
                otherParty: { email: '', phone: '' },
                termsAccepted: false,
              });
              setStep(1);
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Create New Transaction
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      {step === 1 && <BasicInfoStep />}
      {step === 2 && <TransactionDetailsStep />}
      {step === 3 && <ConfirmTransactionStep />}
      {step === 4 && <SuccessStep />}
    </div>
  );
};

export default EscrowFormPage;
