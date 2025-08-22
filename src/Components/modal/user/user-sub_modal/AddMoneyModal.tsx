import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import AddmoneyForm from "../../../../pages/users/dashboard/addmoney-wallet-form/AddmoneyForm";
import { toast} from "react-toastify";

interface AddMoneyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, toggle }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success(`₹${formData.addmoney} added successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
    console.log("Paying:", formData);
    toggle();
  };

  const handleFormChange = (valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title="Add Money"
        submitLabel= {isValid ? `Pay ₹${formData.totalPayable?.toFixed(2)}` : 'Procced'}
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddmoneyForm onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddMoneyModal;