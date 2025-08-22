import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import AddProductForm from "../../../../pages/Admin/productManagement/addProductmodalform/AddProduct";
import { toast } from "react-toastify";
import { addProduct, getProducts } from "../../../../slices/addProduct/thunk";

interface AddProductModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState<any>(null); // plain object

  const loading = useSelector(
    (state: RootState) => state.AddProduct.addState.loading
  );

  const handleSubmit = async () => {
    if (!isValid || !formValues) return;

    const fd = new FormData();
    fd.append("category_id", String(formValues.category_id));
    fd.append("name", formValues.name);
    fd.append("description", formValues.description);
    fd.append("status", formValues.status);

    if (formValues.icon instanceof File) {
      fd.append("icon", formValues.icon); // new file
    } else if (typeof formValues.icon === "string") {
      fd.append("icon", formValues.icon); // existing icon path (unlikely in add, but safe)
    }

    console.log("------- FormData being sent -------");
    for (let [key, value] of fd.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await dispatch(addProduct(fd)).unwrap();
      dispatch(
        getProducts({
          offset: 0,
          limit: 10,
        })
      );
      toggle();
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleFormChange = (valid: boolean, data: any) => {
    setIsValid(valid);
    setFormValues(data);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Add Product"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddProductForm onChange={handleFormChange} />
    </BaseModal>
  );
};

export default AddProductModal;