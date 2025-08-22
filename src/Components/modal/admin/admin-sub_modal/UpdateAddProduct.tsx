import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddProductForm from "../../../../pages/Admin/productManagement/addProductmodalform/AddProduct";
import { updateProduct, getProducts } from "../../../../slices/addProduct/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import { toast } from "react-toastify";

interface Product {
  id: string | number;
  category_id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
}

interface UpdateProductModalProps {
  isOpen: boolean;
  toggle: () => void;
  product?: Product;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  toggle,
  product,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState<any>(null); // plain object, not FormData

  const loading = useSelector(
    (state: RootState) => state.AddProduct.updateState.loading
  );

  // ✅ Prefill form when product changes
  useEffect(() => {
    if (product) {
      setFormValues({
        category_id: product.category_id,
        name: product.name,
        description: product.description,
        icon: product.icon,
        status: product.status,
      });
    }
  }, [product]);

useEffect(() => {
  if (!isOpen) {
    setIsValid(false);
    setFormValues(null);
  }
}, [isOpen]);

  // ✅ Called whenever form changes
  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormValues(data);
  }, []);

  if (!product) return null;

const handleSubmit = async () => {
  if (!isValid || !product || !formValues) return;

  const fd = new FormData();
  fd.append("category_id", String(formValues.category_id));
  fd.append("name", formValues.name);
  fd.append("description", formValues.description);
  fd.append("status", formValues.status);

  if (formValues.icon instanceof File) {
    fd.append("icon", formValues.icon); // new file
  } else if (typeof formValues.icon === "string") {
    fd.append("icon", formValues.icon); // existing icon path
  }

  console.log("------- FormData being sent -------");
  for (let [key, value] of fd.entries()) {
    console.log(`${key}:`, value);
  }

    const resultAction = await dispatch(
      updateProduct({ id: product.id, data: fd })
    );

    if (updateProduct.fulfilled.match(resultAction)) {
      dispatch(
        getProducts({ offset: 0, limit: 10, searchValue: "", ProductStatus: "" })
      );
      toggle();
    } else {
      toast.error(
        (resultAction.payload as any)?.message || "Failed to update product"
      );
    }
};

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product"
      submitLabel={loading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddProductForm initialData={product} onChange={handleFormChange} />
    </BaseModal>
  );
};

export default UpdateProductModal;