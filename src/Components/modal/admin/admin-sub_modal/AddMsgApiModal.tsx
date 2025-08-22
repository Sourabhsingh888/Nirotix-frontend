import React, { useState } from "react";
import { toast} from "react-toastify";
import BaseModal from "../../basemodal/BaseModal";
import AddMsgApiForm from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";

interface AddMsgApiModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddMsgApiModal: React.FC<AddMsgApiModalProps> = ({ isOpen, toggle }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log("API Data Submitted:", formData);
    toast.success("Message API added successfully!", {
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
        title="Add Msg Api"
        submitLabel="Submit"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddMsgApiForm onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddMsgApiModal;
