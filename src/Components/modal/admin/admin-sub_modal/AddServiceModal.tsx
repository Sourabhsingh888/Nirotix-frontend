// import React, { useState } from "react";
// import BaseModal from "../../basemodal/BaseModal";
// import { toast} from "react-toastify";
// import AddService from "../../../../pages/Admin/settingManagement/serviceswitchingmodalform/AddService";

// interface AddServiceModalProps {
//   isOpen: boolean;
//   toggle: () => void;
// }

// const AddServiceModal: React.FC<AddServiceModalProps> = ({
//   isOpen,
//   toggle,
// }) => {
//   const [isValid, setIsValid] = useState(false);
//   const [formData, setFormData] = useState({});

//   const handleSubmit = () => {
//     // Call API or process `formData` here
//     toast.success("Service added successfully!");
//     toggle();
//   };

//   const handleFormChange = (valid: boolean, data: any) => {
//     setIsValid(valid);
//     setFormData(data);
//   };

//   return (
//     <>
//       <BaseModal
//         isOpen={isOpen}
//         toggle={toggle}
//         title="Add Service"
//         submitLabel="Submit"
//         cancelLabel="Cancel"
//         size="md"
//         onSubmit={handleSubmit}
//         isSubmitDisabled={!isValid}
//       >
//         <AddService onChange={handleFormChange} />
//       </BaseModal>
//     </>
//   );
// };

// export default AddServiceModal;
// AddServiceModal.tsx
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import AddService from "../../../../pages/Admin/settingManagement/serviceswitchingmodalform/AddService";
import { toast } from "react-toastify";
import { addServiceSwitchingThunk, getServiceSwitching } from "../../../../slices/ServicesSwitching/thunk";

interface AddServiceModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, toggle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const loading = useSelector(
    (state: RootState) => state.ServiceSwitching.addState.loading
  );
  console.log(loading);

  // Form submit
  const handleSubmit = async () => {
    if (!isValid || !formData) return;

    try {
      await dispatch(addServiceSwitchingThunk(formData)).unwrap();

      // Refresh list after adding
      dispatch(
        getServiceSwitching({
          offset: 0,
          limit: 10,
        })
      );

      toast.success("Service added successfully!", { autoClose: 3000 });
      toggle();
    } catch (error: any) {
      toast.error(error?.message || "Failed to add service switching", { autoClose: 3000 });
    }
  };

  // Form change callback
  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  }, []);

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Add Service"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddService onChange={handleFormChange} />
    </BaseModal>
  );
};

export default AddServiceModal;
