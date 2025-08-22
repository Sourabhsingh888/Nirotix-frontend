import React, { useState,useCallback } from "react";
import BaseModal from "../../basemodal/BaseModal";
import AadharNoVerify from "../../../../pages/users/services/aadharPan/aadhar-verify-form/AadharNoVerify";
import { toast} from "react-toastify";

interface AadharVerifyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AadharVerifyModal: React.FC<AadharVerifyModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("Aadhar verify successfully!", {
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
        title="Verify Aadhar"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AadharNoVerify onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AadharVerifyModal;
