import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema
const schema = yup.object({
  title: yup.string().required('Transaction title is required'),
  role: yup.string().required(),
  currency: yup.string().required(),
  duration: yup.number().max(30, 'Max 30 days').nullable(),
  items: yup.array().of(
    yup.object({
      category: yup.string().required(),
      name: yup.string().required(),
      price: yup.number().positive().required(),
      shippingFee: yup.number().min(0),
      shippingMethod: yup.string()
    })
  ).min(1, 'Add at least one item'),
  escrowPayer: yup.string().required(),
  otherParty: yup.object({
    email: yup.string().email().required(),
    phone: yup.string()
  }),
  termsAccepted: yup.boolean().oneOf([true], 'Must accept terms')
});

export default function EscrowForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'buyer',
      currency: 'NGN',
      escrowPayer: 'buyer',
      items: [],
      termsAccepted: false
    }
  });

  const [step, setStep] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  // Add/Edit Item
  const handleItemSubmit = (data) => {
    if (currentItem !== null) {
      // Edit existing item
      setValue(`items.${currentItem}`, data);
      setCurrentItem(null);
    } else {
      // Add new item
      const items = watch('items');
      setValue('items', [...items, data]);
    }
    // Reset item form
    setValue('itemForm', {
      category: '',
      name: '',
      price: '',
      description: '',
      shippingMethod: 'standard',
      shippingFee: ''
    });
  };

  // Form submission
  const onSubmit = (data) => {
    console.log('Transaction Data:', data);
    setStep(4); // Show success screen
  };

  // Calculate totals
  const calculateTotals = () => {
    const items = watch('items') || [];
    const escrowPayer = watch('escrowPayer');
    
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const shipping = items.reduce((sum, item) => sum + (item.shippingFee || 0), 0);
    const escrowFee = Math.max(1600, 1600 + Math.floor(subtotal / 10000) * 500);
    
    return {
      subtotal,
      shipping,
      escrowFee,
      buyerPays: escrowPayer === 'buyer' ? subtotal + shipping + escrowFee : subtotal + shipping,
      sellerReceives: escrowPayer === 'buyer' ? subtotal + shipping : subtotal + shipping - escrowFee
    };
  };

  // Steps
  const BasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Start Transaction</h2>
      
      <div>
        <label>Transaction Title*</label>
        <input {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Your Role*</label>
          <select {...register("role")}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label>Currency*</label>
          <select {...register("currency")}>
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      <div>
        <label>Escrow Duration (days)</label>
        <input 
          type="number" 
          {...register("duration")}
          min="1"
          max="30"
          placeholder="Max 30 days"
        />
        {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
      </div>

      <button type="button" onClick={() => setStep(2)}>Next</button>
    </div>
  );

  const TransactionDetailsStep = () => {
    const { subtotal } = calculateTotals();
    
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Transaction Details</h2>

        {/* Items List */}
        {watch('items')?.map((item, index) => (
          <div key={index} className="border p-3">
            <h3>{item.name}</h3>
            <p>Price: {item.price} {watch('currency')}</p>
            <button type="button" onClick={() => {
              setCurrentItem(index);
              setValue('itemForm', item);
            }}>Edit</button>
            <button type="button" onClick={() => {
              const items = watch('items');
              setValue('items', items.filter((_, i) => i !== index));
            }}>Delete</button>
          </div>
        ))}

        {/* Add Item Form */}
        <form onSubmit={handleSubmit(handleItemSubmit)}>
          <h3>{currentItem !== null ? 'Edit Item' : 'Add Item'}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Category*</label>
              <select {...register("itemForm.category")}>
                <option value="">Select</option>
                <option value="goods">Goods</option>
                <option value="services">Services</option>
              </select>
            </div>
            
            <div>
              <label>Item Name*</label>
              <input {...register("itemForm.name")} />
            </div>
          </div>
          
          <div>
            <label>Price*</label>
            <input type="number" {...register("itemForm.price")} />
          </div>
          
          <button type="submit">{currentItem !== null ? 'Update' : 'Add'} Item</button>
        </form>

        <div>
          <label>Escrow Fee Payer</label>
          <select {...register("escrowPayer")}>
            <option value="buyer">Buyer Pays Fee</option>
            <option value="seller">Seller Pays Fee</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => setStep(1)}>Back</button>
          <button 
            type="button" 
            onClick={() => setStep(3)}
            disabled={!watch('items')?.length}
          >
            Review
          </button>
        </div>
      </div>
    );
  };

  const ConfirmStep = () => {
    const { subtotal, shipping, escrowFee, buyerPays, sellerReceives } = calculateTotals();
    const currency = watch('currency');

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Confirm Transaction</h2>
        
        {/* Display items */}
        {watch('items')?.map((item, index) => (
          <div key={index} className="border p-3">
            <h3>{item.name}</h3>
            <p>Price: {item.price} {currency}</p>
          </div>
        ))}

        {/* Transaction Summary */}
        <div className="border p-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{subtotal} {currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{shipping} {currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Escrow Fee:</span>
            <span>{escrowFee} {currency}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Buyer Pays:</span>
            <span>{buyerPays} {currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Seller Receives:</span>
            <span>{sellerReceives} {currency}</span>
          </div>
        </div>

        {/* Counterparty Info */}
        <div>
          <h3>{watch('role') === 'buyer' ? 'Seller' : 'Buyer'} Details</h3>
          <div>
            <label>Email*</label>
            <input {...register("otherParty.email")} />
            {errors.otherParty?.email && <p>{errors.otherParty.email.message}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input {...register("otherParty.phone")} />
          </div>
        </div>

        {/* Terms */}
        <div>
          <input type="checkbox" {...register("termsAccepted")} />
          <label>I accept the terms</label>
          {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => setStep(2)}>Back</button>
          <button type="submit">Confirm Transaction</button>
        </div>
      </div>
    );
  };

  const SuccessStep = () => {
    const transactionId = `TRX-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600">Success!</h2>
        <p>Transaction ID: {transactionId}</p>
        <button 
          type="button" 
          onClick={() => {
            reset();
            setStep(1);
          }}
        >
          New Transaction
        </button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
      {step === 1 && <BasicInfoStep />}
      {step === 2 && <TransactionDetailsStep />}
      {step === 3 && <ConfirmStep />}
      {step === 4 && <SuccessStep />}
    </form>
  );
}
