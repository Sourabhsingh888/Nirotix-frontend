import React, { useState, useCallback } from "react";
import BaseModal from "../../basemodal/BaseModal";
import PanNoVerify from "../../../../pages/users/services/aadharPan/pan-verify-form/PanNoVerify";
import { toast} from "react-toastify";

interface PanVerifyModalProps {
  isOpen: boolean;
  toggle: () => void;
}
const PanVerifyModal: React.FC<PanVerifyModalProps> = ({ isOpen, toggle }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("Pan verify successfully!", {
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
        title="Verify Pan"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <PanNoVerify onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default PanVerifyModal;
