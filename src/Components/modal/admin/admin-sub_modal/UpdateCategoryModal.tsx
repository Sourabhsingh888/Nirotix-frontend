import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddCategoryForm from "../../../../pages/Admin/productManagement/productCategorymodalform/ProductCategory";
import {
  updateProductCategory,
  getProductCategories,
} from "../../../../slices/productCategory/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import { toast } from "react-toastify";

interface Category {
  id: string | number;
  name: string;
  status: string;
}

interface UpdateCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
  category?: Category;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  isOpen,
  toggle,
  category,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "Active" });

  const loading = useSelector(
    (state: RootState) => state.ProductCategory.updateState.loading
  );

  // ✅ Prefill form only when category changes
  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, status: category.status });
    }
  }, [category]);

  // ✅ Stable callback to prevent child useEffect loops
  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  }, []);

  if (!category) return null;

  const handleSubmit = async () => {
    if (!isValid || !category) return;

    const resultAction = await dispatch(
      updateProductCategory({ id: category.id, ...formData })
    );
    console.log("resultAction", resultAction);

    if (updateProductCategory.fulfilled.match(resultAction)) {
      dispatch(
        getProductCategories({
          offset: 0,
          limit: 10,
          searchValue: "",
          ProductCategoryStatus: "",
        })
      );
      toggle();
    } else {
      toast.error(
        resultAction.payload?.message || "Failed to update category",
        { autoClose: 3000 }
      );
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product Category"
      submitLabel={loading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddCategoryForm
        initialData={formData}
        onChange={handleFormChange} // ✅ stable
      />
    </BaseModal>
  );
};

export default UpdateCategoryModal;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BaseModal from "../../basemodal/BaseModal";
// import AddCategoryForm from "../../../../pages/Admin/productManagement/productCategorymodalform/ProductCategory";
// import {
//   updateProductCategory,
//   getProductCategories,
// } from "../../../../slices/ecommerce/thunk";
// import { RootState, AppDispatch } from "../../../../Store";
// import { toast } from "react-toastify";

// interface Category {
//   id: string | number;
//   name: string;
//   status: string;
// }

// interface UpdateCategoryModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   category?: Category; // allow undefined
// }

// const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
//   isOpen,
//   toggle,
//   category,
// }) => {
//   const dispatch: AppDispatch = useDispatch<any>();
//   const [isValid, setIsValid] = useState(false);
// const [formData, setFormData] = useState({ name: "", status: "Active" });

// useEffect(() => {
//   if (category) {
//     setFormData({ name: category.name, status: category.status });
//   }
// }, [category]);

//   const loading = useSelector(
//     (state: RootState) => state.Ecommerce.updateState.loading
//   );

//   const handleSubmit = async () => {
//     if (!isValid) return;

//     const resultAction = await dispatch(
//       updateProductCategory({ id: category.id, ...formData })
//     );
//     if (updateProductCategory.fulfilled.match(resultAction)) {
//       toast.success(
//         resultAction.payload.message || "Category updated successfully",
//         { autoClose: 3000 }
//       );
//       dispatch(
//         getProductCategories({
//           offset: 0,
//           limit: 10,
//           searchValue: "",
//           ProductCategoryStatus: "",
//         })
//       );
//       toggle();
//     } else {
//       toast.error(
//         resultAction.payload?.message || "Failed to update category",
//         { autoClose: 3000 }
//       );
//     }
//   };

//   if (!category) return null;

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       toggle={toggle}
//       title="Update Product Category"
//       submitLabel={loading ? "Updating..." : "Update"}
//       cancelLabel="Cancel"
//       size="md"
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isValid || loading}
//     >
//       <AddCategoryForm
//         initialData={formData}
//         onChange={(valid, data) => {
//           setIsValid(valid);
//           setFormData(data);
//         }}
//       />
//     </BaseModal>
//   );
// };

// export default UpdateCategoryModal;
