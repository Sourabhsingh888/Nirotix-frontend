import React, { useState } from "react";
import { toast} from "react-toastify";
import BaseModal from "../../basemodal/BaseModal";
import AddApi from "../../../../pages/Admin/settingManagement/addAPIsmodalform/AddAPIsForm";

interface AddApiModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddApiModal: React.FC<AddApiModalProps> = ({ isOpen, toggle }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    // Handle form submission logic
    console.log("API submitted:", formData);
    toast.success("API added successfully!", {
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
        title="Add API"
        submitLabel="Submit"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddApi onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddApiModal;
