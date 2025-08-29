// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../Store";
// import BaseModal from "../../basemodal/BaseModal";
// import { updateMessageApi, getMessagesApi,getMessageByIdApi } from "../../../../slices/msgApi/thunk";
// import { toast } from "react-toastify";
// import AddMsgApi from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";


// interface MsgApi {
//   id: string | number;
//   api_name: string;
//   api_type: string;
//   base_url: string;
//   params: string;
//   method: string;
//   status: string;
// }

// interface UpdatedMsgApiModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   msgApi?: MsgApi | null; 
// }

// const UpdatedMsgApiModal: React.FC<UpdatedMsgApiModalProps> = ({
//   isOpen,
//   toggle,
//   msgApi,
// }) => {
//   const dispatch: AppDispatch = useDispatch();

//   const [isValid, setIsValid] = useState(false);
//   const [formData, setFormData] = useState({
//     api_name: "",
//     api_type: "SMS",
//     base_url: "",
//     params: "",
//     method: "GET",
//     status: "active",
//   });

//   const {selectedMessage, fetchState} = useSelector(
//     (state: RootState) => state.MsgApi 
//   );

// const loading = fetchState.loading;


// // ✅ Prefill form whenever productPricing changes
// useEffect(() => {
//   if (selectedMessage) {
//     setFormData({
//       apiName: selectedMessage.api_name || "",
//       apiType: selectedMessage.api_type

//       baseUrl: selectedMessage.base_url,
//       apiParams: selectedMessage.params ,
//       apiMethod: selectedMessage.method

//       status: selectedMessage.status,
//     });
//     setIsValid(true);
//   }
// }, [selectedMessage]); // ✅ Correct dependency



// useEffect(() => {
//   if (isOpen && msgApi) {
//     dispatch(getMessageByIdApi(msgApi));
//   }
// }, [isOpen, msgApi, dispatch]);

//   useEffect(() => {
//     if (msgApi) {
//       setFormData({
//         api_name: msgApi.api_name || "",
//         api_type: msgApi.api_type || "SMS",
//         base_url: msgApi.base_url || "",
//         params: msgApi.params || "",
//         method: msgApi.method || "GET",
//         status: msgApi.status || "active",
//       });
//       setIsValid(true);
//     } else {
//       setFormData({
//         api_name: "",
//         api_type: "SMS",
//         base_url: "",
//         params: "",
//         method: "GET",
//         status: "active",
//       });
//       setIsValid(false);
//     }
//   }, [msgApi]);

//   // Stable callback for form change
//   const handleChange = useCallback((field: string, value: string) => {
//     const updated = { ...formData, [field]: value };
//     setFormData(updated);
//     setIsValid(
//       updated.api_name.trim() !== "" &&
//       updated.base_url.trim() !== "" &&
//       updated.params.trim() !== "" &&
//       updated.method.trim() !== ""
//     );
//   }, [formData]);

//   const handleSubmit = async () => {
//     if (!isValid || !msgApi) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const payload = { id: msgApi.id, ...formData };

//     const resultAction = await dispatch(updateMessageApi(payload));
//     if (updateMessageApi.fulfilled.match(resultAction)) {
//       await dispatch(getMessagesApi({
//           offset: 0,
//           limit: 10,
//           searchValue: "",
//           api_type: "",
//           status: ""
//         }));
//       toggle();
//     } else {
//       toast.error(
//         (resultAction.payload as string) ||
//           resultAction.error?.message ||
//           "Failed to update Message API"
//       );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       toggle={toggle}
//       title="Update Msg API"
//       submitLabel={loading ? "Updating..." : "Update"}
//       cancelLabel="Cancel"
//       size="md"
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isValid || loading}
//     >
//       <AddMsgApi initialData={formData} onChange={handleChange} />
//     </BaseModal>
//   );
// };

// export default UpdatedMsgApiModal;




// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../Store";
// import BaseModal from "../../basemodal/BaseModal";
// import { updateMessageApi, getMessagesApi, getMessageByIdApi } from "../../../../slices/msgApi/thunk";
// import { toast } from "react-toastify";
// import AddMsgApi from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";

// interface MsgApi {
//   id: string | number;
//   api_name: string;
//   api_type: string;
//   base_url: string;
//   params: string;
//   method: string;
//   status: string;
// }

// interface UpdatedMsgApiModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   msgApi?: MsgApi | null;
// }

// const UpdatedMsgApiModal: React.FC<UpdatedMsgApiModalProps> = ({
//   isOpen,
//   toggle,
//   msgApi,
// }) => {
//   const dispatch: AppDispatch = useDispatch();
//   const { selectedMessage ,fetchState } = useSelector((state: RootState) => state.MsgApi);
//   const loading = fetchState.loading;
//   console.log("Selected Message:", selectedMessage);

//   const [formData, setFormData] = useState({
//     api_name: "",
//     api_type: "SMS",
//     base_url: "",
//     params: "",
//     method: "GET",
//     status: "active",
//   });

//   const [isValid, setIsValid] = useState(false);

//   // Prefill form when msgApi changes
//   useEffect(() => {
//     if (msgApi) {
//       console.log("Prefilling form with:", msgApi);
//       dispatch(getMessageByIdApi(msgApi.id));
//       setFormData({
//         api_name:selectedMessage.api_name || "",
//         api_type: selectedMessage.api_type || "SMS",
//         base_url: selectedMessage.base_url || "",
//         params: selectedMessage.params || "",
//         method: selectedMessage.method || "GET",
//         status:selectedMessage.status || "active",
//       });
//       setIsValid(true);
//     } else {
//       setFormData({
//         api_name: "",
//         api_type: "SMS",
//         base_url: "",
//         params: "",
//         method: "GET",
//         status: "active",
//       });
//       setIsValid(false);
//     }
//   }, [msgApi, dispatch]);

//   // Handle field changes from AddMsgApi
//   const handleChange = useCallback((field: string, value: any) => {
//     const updated = { ...formData, [field]: value };
//     setFormData(updated);
//     setIsValid(
//       updated.api_name.trim() !== "" &&
//       updated.base_url.trim() !== "" &&
//       updated.params.trim() !== "" &&
//       updated.method.trim() !== "" &&
//       updated.api_type.trim() !== ""
//     );
//   }, [formData]);

//   const handleSubmit = async () => {
//     if (!isValid || !msgApi) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const payload = { id: msgApi.id, ...formData };

//     const resultAction = await dispatch(updateMessageApi(payload));
//     if (updateMessageApi.fulfilled.match(resultAction)) {
//       await dispatch(getMessagesApi({
//         offset: 0,
//         limit: 10,
//         searchValue: "",
//         api_type: "",
//         status: ""
//       }));
//       toggle();
//     } else {
//       toast.error(
//         (resultAction.payload as string) ||
//         resultAction.error?.message ||
//         "Failed to update Message API"
//       );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       toggle={toggle}
//       title="Update Msg API"
//       submitLabel={loading ? "Updating..." : "Update"}
//       cancelLabel="Cancel"
//       size="md"
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isValid || loading}
//     >
//       <AddMsgApi initialData={formData} onChange={handleChange} />
//     </BaseModal>
//   );
// };

// export default UpdatedMsgApiModal;



import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import { updateMessageApi, getMessagesApi, getMessageByIdApi } from "../../../../slices/msgApi/thunk";
import { toast } from "react-toastify";
import AddMsgApi from "../../../../pages/Admin/messageManagement/messageApi_Modalform/AddMsgApi";

interface MsgApi {
  id: string | number;
  api_name: string;
  api_type: string;
  base_url: string;
  params: string;
  method: string;
  status: string;
}

interface UpdatedMsgApiModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedId?: string | number | null; // We'll pass only ID and fetch details
}



const UpdatedMsgApiModal: React.FC<UpdatedMsgApiModalProps> = ({
  isOpen,
  toggle,
  selectedId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  console.log("selectedId", selectedId);
  const { selectedMessage, fetchState } = useSelector((state: RootState) => state.MsgApi);
  const loading = fetchState.loading;
  console.log("selectedMessage", selectedMessage);

  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    api_name: "",
    api_type: "SMS",
    base_url: "",
    params: "",
    method: "GET",
    status: "",
  });

  // Fetch selected API details when modal opens
  useEffect(() => {
    if (isOpen && selectedId) {
      dispatch(getMessageByIdApi(selectedId));
    }
  }, [isOpen, selectedId, dispatch]);

  // Prefill when selectedMessage is fetched
  useEffect(() => {
    if (selectedMessage) {
      setFormData({
        api_name: selectedMessage.api_name || "",
        api_type: selectedMessage.api_type || "SMS",
        base_url: selectedMessage.base_url || "",
        params: selectedMessage.params || "",
        method: selectedMessage.method || "GET",
        status: selectedMessage.status ?? "active",
      });
      setIsValid(true);
    }
  }, [selectedMessage]);

  const handleChange = useCallback((field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setIsValid(
      updated.api_name.trim() !== "" &&
      updated.base_url.trim() !== "" &&
      updated.params.trim() !== "" &&
      updated.method.trim() !== ""
    );
  }, [formData]);

  const handleSubmit = async () => {
    if (!isValid || !selectedMessage) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = { id: selectedMessage.id, ...formData };

    try {
      // Step 1: Local row update (Redux slice me ek row update ho jayega)
      const result = await dispatch(updateMessageApi(payload)).unwrap();

      // Step 2: Success toast + close modal
      toggle();

      // Step 3: Background silent refresh (filters ke sath)
      setTimeout(() => {
        dispatch(
          getMessagesApi({
            offset: 0,
            limit: 10,
            searchValue: "", // 👈 yaha aap current filters pass kar sakte ho
            api_type: "",
            status: "",
          })
        );
      }, 500); // thoda delay de diya background refresh ke liye

    } catch (err: any) {
      toast.error(err?.message || "Failed to update Message API");
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Msg API"
      submitLabel={loading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddMsgApi initialData={formData} onChange={handleChange} />
    </BaseModal>
  );
};

export default UpdatedMsgApiModal;

