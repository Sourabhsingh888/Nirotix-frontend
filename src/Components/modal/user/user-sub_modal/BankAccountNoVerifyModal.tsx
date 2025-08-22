import React, { useState, useCallback } from "react";
import BaseModal from "../../basemodal/BaseModal";
import BankAccountNoVerify from "../../../../pages/users/services/bankAccount/bank-verification-form/BankAccountNoVerify";
import { toast} from "react-toastify";

interface BankAccountVerifyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const BankAccountNoVerifyModal: React.FC<BankAccountVerifyModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("Bank account verified successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    toggle();
  };

  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  }, []);

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title="Verify Bank Account"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <BankAccountNoVerify onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default BankAccountNoVerifyModal;
