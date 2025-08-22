// AddMsgContentModal.tsx
import React, { useState } from "react";
import { toast} from "react-toastify";
import BaseModal from "../../basemodal/BaseModal";
import AddMsgContentForm from "../../../../pages/Admin/messageManagement/msgContent_modalform/AddMsgContent";

interface AddMsgContentModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddMsgContentModal: React.FC<AddMsgContentModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log("Message Content Submitted:", formData);
    toast.success("Message content added successfully!");
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
        title="Add Message Content"
        submitLabel="Submit"
        cancelLabel="Cancel"
        size="lg"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddMsgContentForm onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddMsgContentModal;
