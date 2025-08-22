import React, { useState, useCallback } from "react";
import BaseModal from "../../basemodal/BaseModal";
import GSTIN_NoVerify from "../../../../pages/users/services/kyb/gstin-verify-form/GSTIN_NoVerify";
import { toast} from "react-toastify";

interface GSTINVerifyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const GSTIN_NoVerifyModal: React.FC<GSTINVerifyModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("GSTIN verified successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    toggle();
  };

  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  },[]);

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title="Verify GSTIN"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <GSTIN_NoVerify onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default GSTIN_NoVerifyModal;
