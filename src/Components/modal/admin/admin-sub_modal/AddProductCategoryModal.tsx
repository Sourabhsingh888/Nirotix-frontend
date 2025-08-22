import React, { useCallback, useState } from "react";
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
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "" });

  const loading = useSelector(
    (state: RootState) => state.ProductCategory.addState.loading
  );

  const handleSubmit = async () => {
    if (!isValid) return;

    const resultAction = await dispatch(addProductCategory(formData));
    if (addProductCategory.fulfilled.match(resultAction)) {
      dispatch(
        getProductCategories({
          offset: 0,
          limit: 10,
        })
      );
      toggle();
    } else {
      toast.error(resultAction.payload?.message || "Failed to add category", {
        autoClose: 3000,
      });
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
      title="Add Product Category"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddCategoryForm onChange={handleFormChange} />
    </BaseModal>
  );
};

export default AddCategoryModal;

// import React, { useState } from "react";
// import BaseModal from "../../basemodal/BaseModal";
// import AddCategoryForm from "../../../../pages/Admin/productManagement/productCategorymodalform/ProductCategory";
// import { toast} from "react-toastify";

// interface AddCategoryModalProps {
//   isOpen: boolean;
//   toggle: () => void;
// }

// const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
//   isOpen,
//   toggle,
// }) => {
//   const [isValid, setIsValid] = useState(false);
//   const [formData, setFormData] = useState({});

//   const handleSubmit = () => {
//     if (!isValid) return;

//     toast.success("Category submitted!", {
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
//         title="Add Product Category"
//         submitLabel="Submit"
//         cancelLabel="Cancel"
//         size="md"
//         onSubmit={handleSubmit}
//         isSubmitDisabled={!isValid}
//       >
//         <AddCategoryForm onChange={handleFormChange} />
//       </BaseModal>
//     </>
//   );
// };

// export default AddCategoryModal;
