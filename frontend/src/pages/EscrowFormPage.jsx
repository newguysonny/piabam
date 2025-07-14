// pages/EscrowFormPage.jsx
import { useState, useEffect } from 'react';

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

  // Fix for input field issue (point 3)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Item management functions (point 4)
  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!newItem.category || !newItem.itemName || !newItem.price) return;
    
    const item = {
      ...newItem,
      price: parseFloat(newItem.price),
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

  // Calculation functions (point 1)
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

  const calculateEscrowFee = (subtotal) => {
    const minimumFee = 1600;
    const additionalFee = Math.floor((subtotal || 0) / 10000) * 500;
    const totalFee = Math.max(minimumFee, minimumFee + additionalFee);
    
    return { base: minimumFee, additional: additionalFee, total: totalFee };
  };

  // Navigation
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Components
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Start Transportation</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Transaction Title"
        className="w-full p-2 border rounded"
        required
      />
      {/* Other fields... */}
      <div className="flex justify-end">
        <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
          Next
        </button>
      </div>
    </div>
  );

  const TransactionDetailsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transaction Details</h2>
      
      {/* Items list */}
      <div className="space-y-3">
        {formData.items.map((item, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded relative">
            <h3 className="font-medium">{item.itemName}</h3>
            <p>Price: {item.price} {formData.currency}</p>
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                onClick={() => editItem(i)}
                className="bg-yellow-500 text-white px-2 py-1 text-sm rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteItem(i)}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add item form */}
      <div className="space-y-3">
        <select
          name="category"
          value={newItem.category}
          onChange={handleItemInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="freight">Freight</option>
          <option value="goods">Goods</option>
        </select>
        <input
          type="text"
          name="itemName"
          value={newItem.itemName}
          onChange={handleItemInputChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
        />
        {/* Other item fields... */}
      </div>

      {/* Fixed button layout (point 2) */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded">
            Back
          </button>
          <button 
            onClick={addItem}
            className="bg-green-500 text-white p-2 rounded"
          >
            {formData.editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </div>
        <button 
          onClick={nextStep}
          disabled={formData.items.length === 0}
          className="bg-blue-500 text-white p-2 rounded w-full"
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
        
        {/* Items review */}
        <div className="space-y-3">
          {formData.items.map((item, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded">
              <h3 className="font-medium">{item.itemName}</h3>
              <p>Price: {item.price} {formData.currency}</p>
              <p>Shipping: {item.shippingFee} {formData.currency}</p>
            </div>
          ))}
        </div>

        {/* Fixed calculations (point 1) */}
        <div className="p-3 bg-gray-50 rounded space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{totalShippingFee.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Escrow Fee:</span>
            <span>{escrowFee.total.toFixed(2)} {formData.currency}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Buyer Pays:</span>
            <span>{buyerPrice.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Seller Receives:</span>
            <span>{sellerProceeds.toFixed(2)} {formData.currency}</span>
          </div>
        </div>

        {/* Other fields... */}
        <div className="flex justify-between">
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded">
            Back
          </button>
          <button 
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Start Transaction
          </button>
        </div>
      </div>
    );
  };

  // ... SuccessStep component remains the same

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && <BasicInfoStep />}
      {step === 2 && <TransactionDetailsStep />}
      {step === 3 && <ConfirmTransactionStep />}
      {step === 4 && <SuccessStep />}
    </div>
  );
};

export default EscrowFormPage;
