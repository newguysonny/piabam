import { useState, useEffect } from 'react';

export default function EscrowFormPage() {
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    role: 'buyer',
    currency: 'NGN',
    duration: 7,
    items: [],
    editingIndex: null,
    escrowPayer: 'buyer',
    otherParty: { email: '', phone: '' },
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [transactionId, setTransactionId] = useState('');
  const [transactionLink, setTransactionLink] = useState('');

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOtherPartyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      otherParty: { ...prev.otherParty, [name]: value }
    }));
  };

  // Step navigation
  const nextStep = (step) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step);
      
      if (step === 3) {
        updateOtherPartyHeader();
      }
    }
  };

  const prevStep = (step) => {
    setCurrentStep(step);
    
    if (step === 2) {
      setFormData(prev => ({ ...prev, editingIndex: null }));
    }
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
      return true;
    }
    
    if (step === 2) {
      if (formData.items.length === 0) {
        alert('Please add at least one item');
        return false;
      }
      return true;
    }
    
    return true;
  };

  // Item management
  const [itemForm, setItemForm] = useState({
    category: '',
    itemName: '',
    price: '',
    description: '',
    shippingMethod: 'standard',
    shippingFee: '0'
  });

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!itemForm.category || !itemForm.itemName || !itemForm.price || parseFloat(itemForm.price) <= 0) {
      alert('Please fill all required fields for the item');
      return;
    }
    
    const newItem = {
      category: itemForm.category,
      itemName: itemForm.itemName,
      price: parseFloat(itemForm.price),
      description: itemForm.description,
      shippingMethod: itemForm.shippingMethod,
      shippingFee: parseFloat(itemForm.shippingFee) || 0
    };
    
    if (formData.editingIndex !== null) {
      const updatedItems = [...formData.items];
      updatedItems[formData.editingIndex] = newItem;
      setFormData(prev => ({
        ...prev,
        items: updatedItems,
        editingIndex: null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
    }
    
    resetItemForm();
  };

  const resetItemForm = () => {
    setItemForm({
      category: '',
      itemName: '',
      price: '',
      description: '',
      shippingMethod: 'standard',
      shippingFee: '0'
    });
  };

  const editItem = (index) => {
    const item = formData.items[index];
    setItemForm({
      category: item.category,
      itemName: item.itemName,
      price: item.price.toString(),
      description: item.description,
      shippingMethod: item.shippingMethod,
      shippingFee: item.shippingFee.toString()
    });
    setFormData(prev => ({ ...prev, editingIndex: index }));
  };

  const deleteItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems,
      editingIndex: prev.editingIndex === index ? null : 
                  prev.editingIndex > index ? prev.editingIndex - 1 : prev.editingIndex
    }));
    
    if (formData.editingIndex === index) {
      resetItemForm();
    }
  };

  // Other party header
  const updateOtherPartyHeader = () => {
    return `${formData.role === 'buyer' ? 'Seller' : 'Buyer'} Details`;
  };

  // Calculations
  const calculateEscrowFee = (subtotal) => {
    const minimumFee = 1600;
    const additionalFee = Math.floor(subtotal / 10000) * 500;
    const totalFee = Math.max(minimumFee + additionalFee);
    
    return {
      base: minimumFee,
      additional: additionalFee,
      total: totalFee
    };
  };

  const calculateSummary = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.price, 0);
    const totalShippingFee = formData.items.reduce((sum, item) => sum + item.shippingFee, 0);
    const escrowFee = calculateEscrowFee(subtotal);
    
    let buyerPrice, sellerProceeds;
    
    if (formData.escrowPayer === 'buyer') {
      buyerPrice = subtotal + totalShippingFee + escrowFee.total;
      sellerProceeds = subtotal + totalShippingFee;
    } else {
      buyerPrice = subtotal + totalShippingFee;
      sellerProceeds = subtotal + totalShippingFee - escrowFee.total;
    }
    
    return {
      subtotal,
      totalShippingFee,
      escrowFee,
      buyerPrice,
      sellerProceeds
    };
  };

  const summary = calculateSummary();

  // Transaction submission
  const generateTransactionId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'TRX-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const submitTransaction = () => {
    if (!formData.termsAccepted) {
      alert('You must accept the terms and conditions');
      return;
    }
    
    if (!formData.otherParty.email || !formData.otherParty.phone) {
      alert('Please fill in all required party details');
      return;
    }
    
    const id = generateTransactionId();
    const link = `${window.location.origin}/transaction/${id}`;
    
    setTransactionId(id);
    setTransactionLink(link);
    
    console.log('Transaction submitted:', {
      ...formData,
      transactionId: id,
      transactionLink: link
    });
    
    setCurrentStep(4);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const startNewTransaction = () => {
    setFormData({
      title: '',
      role: 'buyer',
      currency: 'NGN',
      duration: 7,
      items: [],
      editingIndex: null,
      escrowPayer: 'buyer',
      otherParty: { email: '', phone: '' },
      termsAccepted: false
    });
    setCurrentStep(1);
    resetItemForm();
  };

  return (
    <div className="max-w-2xl mx-auto p-5 font-sans text-gray-800">
      {/* Step 1: Basic Transaction Info */}
      {currentStep === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Start Transaction</h2>
          
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Transaction Title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            required
          />
          
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          >
            <option value="NGN">Naira (₦)</option>
            <option value="USD">Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">Pound (£)</option>
          </select>
          
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Escrow Duration (days)"
            min="1"
            max="30"
            className="w-full p-3 mb-1 border border-gray-300 rounded-md"
          />
          {(formData.duration < 1 || formData.duration > 30) && (
            <p className="text-red-500 text-sm mb-4">Duration must be between 1-30 days</p>
          )}
          
          <div className="mt-6">
            <button
              onClick={() => nextStep(2)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Transaction Details */}
      {currentStep === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Transaction Details</h2>
          
          <div id="items-container" className="mb-6">
            {formData.items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md mb-4 relative">
                <p className="font-bold">{item.itemName}</p>
                <p>Category: {item.category}</p>
                <p>Price: {item.price} {formData.currency}</p>
                <p>Shipping: {item.shippingMethod} ({item.shippingFee} {formData.currency})</p>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => editItem(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <select
            name="category"
            value={itemForm.category}
            onChange={handleItemInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="freight">Freight</option>
            <option value="goods">Goods</option>
          </select>
          
          <input
            type="text"
            name="itemName"
            value={itemForm.itemName}
            onChange={handleItemInputChange}
            placeholder="Item Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          
          <input
            type="number"
            name="price"
            value={itemForm.price}
            onChange={handleItemInputChange}
            placeholder="Price"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          
          <textarea
            name="description"
            value={itemForm.description}
            onChange={handleItemInputChange}
            placeholder="Item Description"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          
          <select
            name="shippingMethod"
            value={itemForm.shippingMethod}
            onChange={handleItemInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          >
            <option value="standard">Standard</option>
            <option value="cargo">Cargo</option>
            <option value="none">No Shipping</option>
          </select>
          
          <input
            type="number"
            name="shippingFee"
            value={itemForm.shippingFee}
            onChange={handleItemInputChange}
            placeholder="Shipping Fee (₦)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          
          <select
            name="escrowPayer"
            value={formData.escrowPayer}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          >
            <option value="buyer">Buyer Pays Escrow Fee</option>
            <option value="seller">Seller Pays Escrow Fee</option>
          </select>
          
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => prevStep(1)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md"
            >
              Back
            </button>
            <button
              onClick={addItem}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md"
            >
              {formData.editingIndex !== null ? 'Update Item' : 'Add Item'}
            </button>
            <button
              onClick={() => nextStep(3)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md"
            >
              Review Transaction
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: Confirm Transaction */}
      {currentStep === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Confirm Transaction</h2>
          
          <div id="items-review" className="mb-6">
            {formData.items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-bold">{item.itemName}</p>
                <p>Price: {item.price} {formData.currency}</p>
                <p>Shipping: {item.shippingMethod} ({item.shippingFee} {formData.currency})</p>
              </div>
            ))}
          </div>
          
          <div id="transaction-summary" className="mb-6">
            <div className="mb-2">Subtotal: {summary.subtotal.toFixed(2)} {formData.currency}</div>
            <div className="mb-2">Shipping Fee: {summary.totalShippingFee.toFixed(2)} {formData.currency}</div>
            <div className="mb-2">Escrow Fee: {summary.escrowFee.total.toFixed(2)} {formData.currency}</div>
            <div className="text-sm text-gray-600 mb-4">
              Escrow fee = ₦{summary.escrowFee.base} (base) + ₦{summary.escrowFee.additional} (₦500 per every ₦10,000)
            </div>
            <hr className="my-4" />
            <div className="font-bold mb-2">
              Buyer Price: {summary.buyerPrice.toFixed(2)} {formData.currency}
            </div>
            <div className="mb-2">
              Seller Proceeds: {summary.sellerProceeds.toFixed(2)} {formData.currency}
            </div>
            <div className="text-sm text-gray-600">
              {formData.escrowPayer === 'buyer' 
                ? 'Escrow fee added to buyer' 
                : 'Escrow fee deducted from seller'} | 
              Shipping fee included in seller proceeds
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-xl font-semibold mb-4">{updateOtherPartyHeader()}</h3>
            <input
              type="email"
              name="email"
              value={formData.otherParty.email}
              onChange={handleOtherPartyChange}
              placeholder="Email Address"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.otherParty.phone}
              onChange={handleOtherPartyChange}
              placeholder="Phone Number"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
              className="mr-2"
              required
            />
            <label htmlFor="acceptTerms">I agree to the terms and conditions</label>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => prevStep(2)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md"
            >
              Add More Items
            </button>
            <button
              onClick={submitTransaction}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md"
            >
              Start Transaction
            </button>
          </div>
        </div>
      )}
      
      {/* Step 4: Success Page */}
      {currentStep === 4 && (
        <div className="text-center p-8 bg-blue-50 rounded-lg animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Transaction Created!</h2>
          <p className="mb-6">
            Your transaction has been created, waiting for both parties to agree. Share the transaction via the URL or QR code so that the other party can agree to the terms.
          </p>
          
          <div className="bg-white p-6 rounded-md mb-6 text-left border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={transactionId}
                readOnly
                className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(transactionId)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-r-md"
              >
                Copy
              </button>
            </div>
            
            <div className="flex mb-6">
              <input
                type="text"
                value={transactionLink}
                readOnly
                className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(transactionLink)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-r-md"
              >
                Copy
              </button>
            </div>
            
            <div className="w-40 h-40 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
              <p className="text-gray-500">[QR Code]</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => alert("In a real app, this would take you to your dashboard")}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md"
            >
              Go to Dashboard
            </button>
            <button
              onClick={startNewTransaction}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md"
            >
              Create New Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
