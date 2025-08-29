import React, { useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddCategoryForm from "../../../../pages/Admin/productManagement/productCategorymodalform/ProductCategory";
import {
  addProductCategory,
  getProductCategories,
} from "../../../../slices/productCategory/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch: AppDispatch = useDispatch<any>();
  const [formData, setFormData] = useState({ name: "", status: "Active" });

  const {offset, limit, addState,} = useSelector(
    (s: RootState) => s.ProductCategory
  );

  const loading = addState.loading;
  const errors = useMemo(() => {
    return {
    name: formData.name ? "" : "Name is required",
    };
  }, [formData]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleSubmit = async () => {
    if (!isValid) return;

    const resultAction = await dispatch(addProductCategory(formData));
    if (addProductCategory.fulfilled.match(resultAction)) {
      dispatch(
        getProductCategories({ offset: offset, limit: limit, context: "table" })
      );
      setFormData({ name: "", status : "Active" });
      toggle();
    } else {
      toast.error(resultAction.payload?.message || "Failed to add category", {
        autoClose: 3000,
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Add Product Category"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddCategoryForm
        values={formData}
        errors={errors}
        onChange={setFormData}
      />
    </BaseModal>
  );
};

export default AddCategoryModal;
