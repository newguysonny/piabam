import React, { useRef, useState } from 'react';

export default function EscrowForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    category: '',
    name: '',
    price: '',
    shippingMethod: 'standard'
  });

  // Navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Item management (unchanged from CreateRoom approach)
  const addItem = () => {
    setItems([...items, currentItem]);
    setCurrentItem({
      category: '',
      name: '',
      price: '',
      shippingMethod: 'standard'
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      ...Object.fromEntries(formData),
      items
    };
    console.log('Final Data:', data);
    nextStep(); // Move to success step
  };

  // Step components using uncontrolled inputs
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2>Start Transaction</h2>
      <input 
        name="title" 
        placeholder="Transaction Title" 
        className="w-full p-2 border"
      />
      <select name="currency" className="w-full p-2 border">
        <option value="NGN">NGN (₦)</option>
        <option value="USD">USD ($)</option>
      </select>
      <button type="button" onClick={nextStep}>Next</button>
    </div>
  );

  const TransactionDetailsStep = () => (
    <div className="space-y-4">
      <h2>Transaction Details</h2>
      {/* Item List */}
      {items.map((item, i) => (
        <div key={i} className="border p-2">
          <p>{item.name} - {item.price}</p>
        </div>
      ))}
      
      {/* Add Item Form */}
      <div>
        <input
          value={currentItem.name}
          onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
          placeholder="Item Name"
          className="w-full p-2 border"
        />
        <button type="button" onClick={addItem}>Add Item</button>
      </div>
      
      <div className="flex justify-between">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={nextStep}>Review</button>
      </div>
    </div>
  );

  const ConfirmStep = () => {
    // Calculate totals from items array
    const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
    
    return (
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="space-y-4">
          <h2>Confirm Transaction</h2>
          <p>Subtotal: {subtotal}</p>
          
          {/* Other party details */}
          <input 
            name="otherPartyEmail" 
            type="email" 
            placeholder="Counterparty Email"
            className="w-full p-2 border"
          />
          
          <button type="submit">Confirm</button>
        </div>
      </form>
    );
  };

  const SuccessStep = () => (
    <div>
      <h2>Success!</h2>
      <button onClick={() => window.location.reload()}>New Transaction</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-4">
      {step === 1 && <BasicInfoStep />}
      {step === 2 && <TransactionDetailsStep />}
      {step === 3 && <ConfirmStep />}
      {step === 4 && <SuccessStep />}
    </div>
  );
}
