import { useState, useEffect } from "react";

export default function ItemOptions({ item, onClose, onConfirm }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  // update price whenever selections change
  useEffect(() => {
    let extra = 0;
    item.options?.forEach((opt) => {
      const value = selectedOptions[opt.id];
      if (opt.type === "single" && value) {
        const choice = opt.choices.find((c) => c.id === value);
        extra += choice?.price || 0;
      } else if (opt.type === "multiple" && Array.isArray(value)) {
        value.forEach((val) => {
          const choice = opt.choices.find((c) => c.id === val);
          extra += choice?.price || 0;
        });
      }
    });
    setTotalPrice(item.price + extra);
  }, [selectedOptions, item]);

  const handleChange = (optId, choiceId, type) => {
    setSelectedOptions((prev) => {
      if (type === "single") {
        return { ...prev, [optId]: choiceId };
      } else {
        const prevArr = prev[optId] || [];
        return prevArr.includes(choiceId)
          ? { ...prev, [optId]: prevArr.filter((id) => id !== choiceId) }
          : { ...prev, [optId]: [...prevArr, choiceId] };
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-end"
      onClick={onClose} // close on backdrop click
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Modal */}
      <div
        className="relative bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-gray-500">
              ✕
            </button>
          </div>

          {/* Options */}
          {item.options?.map((opt) => (
            <div key={opt.id} className="mb-4">
              <p className="font-medium mb-2">{opt.name}</p>
              <div className="space-y-2">
                {opt.choices.map((choice) => (
                  <label key={choice.id} className="flex items-center space-x-2">
                    <input
                      type={opt.type === "single" ? "radio" : "checkbox"}
                      name={opt.id}
                      value={choice.id}
                      checked={
                        opt.type === "single"
                          ? selectedOptions[opt.id] === choice.id
                          : (selectedOptions[opt.id] || []).includes(choice.id)
                      }
                      onChange={() =>
                        handleChange(opt.id, choice.id, opt.type)
                      }
                    />
                    <span>
                      {choice.label}{" "}
                      {choice.price > 0 && (
                        <span className="text-gray-500">
                          +₦{choice.price}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            onClick={() => onConfirm(selectedOptions, totalPrice)}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Add to Cart • ₦{totalPrice.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}

/*
import { useState, useEffect } from "react";

export default function ItemOptions({ item, onClose, onConfirm }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  // update price whenever selections change
  useEffect(() => {
    let extra = 0;
    item.options?.forEach((opt) => {
      const value = selectedOptions[opt.id];
      if (opt.type === "single" && value) {
        const choice = opt.choices.find((c) => c.id === value);
        extra += choice?.price || 0;
      } else if (opt.type === "multiple" && Array.isArray(value)) {
        value.forEach((val) => {
          const choice = opt.choices.find((c) => c.id === val);
          extra += choice?.price || 0;
        });
      }
    });
    setTotalPrice(item.price + extra);
  }, [selectedOptions, item]);

  const handleChange = (optId, choiceId, type) => {
    setSelectedOptions((prev) => {
      if (type === "single") {
        return { ...prev, [optId]: choiceId };
      } else {
        const prevArr = prev[optId] || [];
        return prevArr.includes(choiceId)
          ? { ...prev, [optId]: prevArr.filter((id) => id !== choiceId) }
          : { ...prev, [optId]: [...prevArr, choiceId] };
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-end">
      <div className="bg-white rounded-t-2xl p-4 w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* Options /}
        {item.options?.map((opt) => (
          <div key={opt.id} className="mb-4">
            <p className="font-medium mb-2">{opt.name}</p>
            <div className="space-y-2">
              {opt.choices.map((choice) => (
                <label key={choice.id} className="flex items-center space-x-2">
                  <input
                    type={opt.type === "single" ? "radio" : "checkbox"}
                    name={opt.id}
                    value={choice.id}
                    checked={
                      opt.type === "single"
                        ? selectedOptions[opt.id] === choice.id
                        : (selectedOptions[opt.id] || []).includes(choice.id)
                    }
                    onChange={() => handleChange(opt.id, choice.id, opt.type)}
                  />
                  <span>
                    {choice.label}{" "}
                    {choice.price > 0 && (
                      <span className="text-gray-500">+₦{choice.price}</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Footer /}
        <div className="sticky bottom-0 bg-white pt-3">
          <button
            onClick={() => onConfirm(selectedOptions, totalPrice)}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Add to Cart • ₦{totalPrice.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
*/
