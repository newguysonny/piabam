import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

  return createPortal(
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
              {/* Option Title - 56px gray background */}
              <div className="h-14 bg-gray-100 flex items-center px-4 rounded-t-lg mb-1">
                <p className="font-medium">{opt.name}</p>
              </div>
              
              {/* Option Choices */}
              <div className="space-y-1">
                {opt.choices.map((choice) => (
                  <label 
                    key={choice.id} 
                    className="flex items-center justify-between h-19 bg-white px-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{choice.label}</span>
                      {choice.price > 0 && (
                        <span className="text-gray-500 text-sm">
                          +₦{choice.price}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center">
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
                        className="w-5 h-5"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            onClick={() => {
              const finalOptions = [];

              item.options?.forEach((opt) => {
                const value = selectedOptions[opt.id];

                if (opt.type === "single" && value) {
                  const choice = opt.choices.find((c) => c.id === value);
                  if (choice) {
                    finalOptions.push({
                      group: opt.name,
                      choice: choice.label,
                      price: choice.price,
                    });
                  }
                }

                if (opt.type === "multiple" && Array.isArray(value)) {
                  value.forEach((val) => {
                    const choice = opt.choices.find((c) => c.id === val);
                    if (choice) {
                      finalOptions.push({
                        group: opt.name,
                        choice: choice.label,
                        price: choice.price,
                      });
                    }
                  });
                }
              });

              onConfirm(finalOptions, totalPrice);
            }}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Add to Cart • ₦{totalPrice.toLocaleString()}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}



/*
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-end"
      onClick={onClose} // close on backdrop click
    >
      {/* Dark overlay /}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Modal /}
      <div
        className="relative bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        <div className="p-4">
          {/* Header /}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-gray-500">
              ✕
            </button>
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

        {/* Footer /}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
  onClick={() => {
    const finalOptions = [];

    item.options?.forEach((opt) => {
      const value = selectedOptions[opt.id];

      if (opt.type === "single" && value) {
        const choice = opt.choices.find((c) => c.id === value);
        if (choice) {
          finalOptions.push({
            group: opt.name,
            choice: choice.label,
            price: choice.price,
          });
        }
      }

      if (opt.type === "multiple" && Array.isArray(value)) {
        value.forEach((val) => {
          const choice = opt.choices.find((c) => c.id === val);
          if (choice) {
            finalOptions.push({
              group: opt.name,
              choice: choice.label,
              price: choice.price,
            });
          }
        });
      }
    });

    onConfirm(finalOptions, totalPrice);
  }}
  className="w-full bg-black text-white py-3 rounded-xl font-semibold"
>
  Add to Cart • ₦{totalPrice.toLocaleString()}
</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
*/
