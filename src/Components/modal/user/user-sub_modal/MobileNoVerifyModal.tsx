import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import MobileNoVerify from "../../../../pages/users/services/telecomIntelligence/number-lookup-form/MobileNoVerify";
import { toast} from "react-toastify";

interface MobileNoVerifyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const MobileNoVerifyModal: React.FC<MobileNoVerifyModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("Mobile number verified successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

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
        title="Verify Mobile Number"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <MobileNoVerify onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default MobileNoVerifyModal;
