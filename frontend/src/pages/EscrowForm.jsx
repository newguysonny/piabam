// components/EscrowForm.jsx
import { useState } from 'react';
import BasicInfoStep from './components/escrow/BasicInfoStep';
import TransactionDetailsStep from './components/escrow/TransactionDetailsStep';
import ConfirmTransactionStep from './components/escrow/ConfirmTransactionStep';
import SuccessStep from '.components/escrow/SuccessStep';

const EscrowForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    role: 'buyer',
    currency: 'NGN',
    duration: 7,
    items: [],
    editingIndex: null,
    escrowPayer: 'buyer',
    otherParty: null,
    termsAccepted: false,
  });

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      // Special handling for review step
      if (step === 2) {
        updateOtherPartyHeader();
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    // Reset editing state when going back
    if (step === 3) {
      setFormData({ ...formData, editingIndex: null });
    }
  };

  const validateStep = (step) => {
    // Validation logic similar to original
  };

  const updateOtherPartyHeader = () => {
    // Update logic
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {step === 1 && (
        <BasicInfoStep 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <TransactionDetailsStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ConfirmTransactionStep
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          submitTransaction={() => {
            // Submit logic
            setStep(4);
          }}
        />
      )}
      {step === 4 && <SuccessStep />}
    </div>
  );
};

export default EscrowForm;
