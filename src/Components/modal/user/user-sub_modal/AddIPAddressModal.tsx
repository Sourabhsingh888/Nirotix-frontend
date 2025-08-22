import React, { useState, useCallback } from "react";
import BaseModal from "../../basemodal/BaseModal";
import AddIPAddressForm from "../../../../pages/users/account/developerAPI/addIP_modalform/AddIPAddress";
import { toast} from "react-toastify";

interface AddIPAddressModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddIPAddressModal: React.FC<AddIPAddressModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ ipno?: string }>({});

  const handleFormChange = useCallback((valid: boolean, data: { ipno: string }) => {
    setIsValid(valid);
    setFormData(data);
  },[]);

  const handleSubmit = () => {
    if (!isValid) return;

    // Optional: Call your API here using formData.ipno

    toast.success("IP Address Added Successfully!", {
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
        title="Add IP Address"
        submitLabel="Add"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddIPAddressForm onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddIPAddressModal;