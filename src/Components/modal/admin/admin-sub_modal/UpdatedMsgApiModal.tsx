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
  selectedId?: string | number | null;
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


  useEffect(() => {
    if (isOpen && selectedId) {
      dispatch(getMessageByIdApi(selectedId));
    }
  }, [isOpen, selectedId, dispatch]);


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
      const result = await dispatch(updateMessageApi(payload)).unwrap();

      toggle();

      setTimeout(() => {
        dispatch(
          getMessagesApi({
            offset: 0,
            limit: 10,
            searchValue: "",
            api_type: "",
            status: "",
          })
        );
      }, 500);

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

