// components/BasicInfoStep.jsx
const BasicInfoStep = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Start Transportation</h2>
      
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Transaction Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      
      <div className="mb-4">
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="NGN">Naira (₦)</option>
          <option value="USD">Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="GBP">Pound (£)</option>
        </select>
      </div>
      
      <div className="mb-4">
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Escrow Duration (days)"
          min="1"
          max="30"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.duration < 1 || formData.duration > 30 ? (
          <p className="text-red-500 text-sm mt-1">Duration must be between 1-30 days</p>
        ) : null}
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={nextStep}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfoStep;
