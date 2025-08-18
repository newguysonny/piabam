import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../context/CartContext"; 

const Cart = ({ isEditable = false }) => {
  const { cart, removeFromCart, incrementItem, decrementItem } = useCart();

  return (
    <div className="max-w-md mx-auto p-4">
     {Array.isArray(cart?.items) && cart.items.map((item) => (
  <div
    key={`${item.id}-${JSON.stringify(item.options)}`} // safer unique key
    className="flex items-start justify-between py-4 border-b"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-cover rounded-md"
    />

    <div className="flex-1 mx-3">
      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>

      {Array.isArray(item.options) && item.options.length > 0 && (
        <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
          {item.options.map((opt, index) => (
            <li key={index}>{opt}</li>
          ))}
        </ul>
      )}

      <p className="text-sm font-semibold mt-1">
        ₦{item.price?.toLocaleString?.()}
      </p>
    </div>

    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
      {isEditable && (
        <button
          onClick={() => removeFromCart(item.id, item.options)}
          className="text-gray-600 hover:text-red-500"
        >
          <FiTrash2 size={16} />
        </button>
      )}
      {isEditable && (
        <button
          onClick={() => decrementItem(item.id, item.options)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FiMinus size={16} />
        </button>
      )}
      <span className="text-sm">{item.quantity}</span>
      {isEditable && (
        <button
          onClick={() => incrementItem(item.id, item.options)}
          className="text-gray-600 hover:text-green-500"
        >
          <FiPlus size={16} />
        </button>
      )}
    </div>
  </div>
))}
    {isEditable && (
        <div className="mt-4 flex justify-end">
          <button className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            <AiOutlinePlus size={16} className="mr-1" /> Add items
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

/*
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../context/CartContext"; // 👈 new import

const Cart = ({ isEditable = false }) => {
  const { cart, removeFromCart, incrementItem, decrementItem } = useCart();

  return (
    <div className="max-w-md mx-auto p-4">
      {cart.items.map((item, idx) => {
        // ✅ fallback values so it never crashes
        const id = item?.id ?? idx;
        const name = item?.name ?? "Unnamed Item";
        const image = item?.image || "/placeholder.png";
        const price = Number(item?.price ?? 0);
        const quantity = Number(item?.quantity ?? 1);
        const options = item?.options;

        return (
          <div
            key={id}
            className="flex items-start justify-between py-4 border-b"
          >
            <img
              src={image}
              alt={name}
              className="w-16 h-16 object-cover rounded-md"
            />

            <div className="flex-1 mx-3">
              <h4 className="font-medium text-sm line-clamp-1">{name}</h4>

              {/* ✅ Safely render options /}
              {options && (
                <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                  {Array.isArray(options)
                    ? options.map((opt, i) => (
                        <li key={i}>{String(opt)}</li>
                      ))
                    : typeof options === "object"
                    ? Object.entries(options).map(([key, val], i) => (
                        <li key={i}>
                          {key}: {String(val)}
                        </li>
                      ))
                    : (
                        <li>{String(options)}</li> // fallback if string/number
                      )}
                </ul>
              )}

              <p className="text-sm font-semibold mt-1">
                ₦{price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
              {isEditable && (
                <button
                  onClick={() => removeFromCart(id, options)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
              {isEditable && (
                <button
                  onClick={() => decrementItem(id, options)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FiMinus size={16} />
                </button>
              )}
              <span className="text-sm">{quantity}</span>
              {isEditable && (
                <button
                  onClick={() => incrementItem(id, options)}
                  className="text-gray-600 hover:text-green-500"
                >
                  <FiPlus size={16} />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {isEditable && (
        <div className="mt-4 flex justify-end">
          <button className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            <AiOutlinePlus size={16} className="mr-1" /> Add items
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
*/
