import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import AddUserForm from "../../../../pages/Admin/userManagement/usermodal_form/AddUser";
import { toast} from "react-toastify";

interface AddUserModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, toggle }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    // Handle user add logic here
    toast.success("User added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    toggle(); // Close modal after submission
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
        title="Add User"
        submitLabel="Submit"
        cancelLabel="Cancel"
        size="md"
        onSubmit={handleSubmit}
        isSubmitDisabled={!isValid}
      >
        <AddUserForm onChange={handleFormChange} />
      </BaseModal>
    </>
  );
};

export default AddUserModal;
