import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import SpecialOfferCheckForm from "../../../../pages/users/services/telecomIntelligence/Special-offer-check-form/SpecialOfferCheckForm";
import { toast} from "react-toastify";


interface SpecialOfferCheckModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (formData: any) => void;
}

const SpecialOfferCheckModal: React.FC<SpecialOfferCheckModalProps> = ({
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

    toast.success("Special Offer Checked Successfully!", {
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
        title="Special Offer Check"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        isSubmitDisabled={!isValid}
        onSubmit={handleSubmit}
      >
        <SpecialOfferCheckForm onChange={handleChange} />
      </BaseModal>
    </>
  );
};

export default SpecialOfferCheckModal;