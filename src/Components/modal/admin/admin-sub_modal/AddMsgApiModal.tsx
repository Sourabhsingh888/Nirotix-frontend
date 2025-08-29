// import React, { useState } from "react";
// import { toast} from "react-toastify";
// import BaseModal from "../../basemodal/BaseModal";
// import AddMsgApiForm from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";

// interface AddMsgApiModalProps {
//   isOpen: boolean;
//   toggle: () => void;
// }

// const AddMsgApiModal: React.FC<AddMsgApiModalProps> = ({ isOpen, toggle }) => {
//   const [isValid, setIsValid] = useState(false);
//   const [formData, setFormData] = useState({});

//   const handleSubmit = () => {
//     console.log("API Data Submitted:", formData);
//     toast.success("Message API added successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
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
//         title="Add Msg Api"
//         submitLabel="Submit"
//         cancelLabel="Cancel"
//         size="md"
//         onSubmit={handleSubmit}
//         isSubmitDisabled={!isValid}
//       >
//         <AddMsgApiForm onChange={handleFormChange} />
//       </BaseModal>
//     </>
//   );
// };

// export default AddMsgApiModal;




import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddMsgApiForm from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";
import {
  addMessageApi,
   getMessagesApi,
} from "../../../../slices/msgApi/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import { toast } from "react-toastify";
import { loginRequest } from "slices/auth/login/reducer";

interface AddMsgApiModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddMsgApiModal: React.FC<AddMsgApiModalProps> = ({ isOpen, toggle }) => {
  const dispatch: AppDispatch = useDispatch<any>();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const loading = useSelector(
    (state: RootState) => state.MsgApi.addState.loading
  );

  const handleSubmit = async () => {
    if (!isValid) return;

    console.log("API Data Submitted:", formData);

    const resultAction = await dispatch(addMessageApi(formData));
    console.log("API Response:", resultAction);

    if (addMessageApi.fulfilled.match(resultAction)) {
      dispatch(
        getMessagesApi({
          offset: 0,
          limit: 10,
          searchValue: "",
          api_type: "",
          status: "",
        })
      );
      toast.success("Message API added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      toggle();
    } else {
      toast.error(
        (resultAction.payload as any)?.message || "Failed to add Message API",
        { autoClose: 3000 }
      );
    }
  };

  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  }, []);

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Add Message API"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddMsgApiForm onChange={handleFormChange} />
    </BaseModal>
  );
};

export default AddMsgApiModal;
