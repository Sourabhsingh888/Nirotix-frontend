import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import { toast} from "react-toastify";
import AddService from "../../../../pages/Admin/settingManagement/serviceswitchingmodalform/AddService";

interface AddServiceModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    // Call API or process `formData` here
    toast.success("Service added successfully!");
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
        title="Add Service"
        submitLabel="Submit"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddService onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddServiceModal;
