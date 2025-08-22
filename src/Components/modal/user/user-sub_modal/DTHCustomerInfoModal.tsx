import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import DTHCustomerInfoForm from "../../../../pages/users/services/telecomIntelligence/dth-customer-infoform/DTHCustomerInfoForm";
import {toast } from "react-toastify";

interface DTHCustomerInfoModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const DTHCustomerInfoModal: React.FC<DTHCustomerInfoModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleChange = (valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("DTH Customer ID Verified!", {
      position: "top-right",
      autoClose: 3000,
    });

    toggle();
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title="DTH Customer Info"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        isSubmitDisabled={!isValid}
        onSubmit={handleSubmit}
      >
        <DTHCustomerInfoForm onChange={handleChange} />
      </BaseModal>
    </>
  );
};

export default DTHCustomerInfoModal;
