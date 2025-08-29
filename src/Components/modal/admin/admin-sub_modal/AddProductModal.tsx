import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import AddProductForm from "../../../../pages/Admin/productManagement/addProductmodalform/AddProduct";
import { toast } from "react-toastify";
import { addProduct, getProducts } from "../../../../slices/addProduct/thunk";
import { getProductCategories } from "../../../../slices/productCategory/thunk";

interface AddProductModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (dropdownList.length === 0) {
      dispatch(
        getProductCategories({ offset: 0, limit: 10, context: "dropdown" })
      );
    }
  }, [dispatch]);

  const { dropdownList, fetchState, hasMore } = useSelector(
    (s: RootState) => s.ProductCategory
  );
  
console.log("dropdownList", dropdownList);  


  const loadMore = () => {
    const nextOffset = offset + 1;
    setOffset(nextOffset);
    dispatch(
      getProductCategories({
        offset: nextOffset,
        limit: 10,
        context: "dropdown",
      })
    );
  };

  const loading = useSelector((s: RootState) => s.AddProduct.addState.loading);

  const [values, setValues] = useState({
    category_id: null,
    name: "",
    description: "",
    icon: null,
    status: "Active",
  });

  const errors = useMemo(() => {
    return {
      category_id: values.category_id ? "" : "Category is required",
      name: values.name ? "" : "Name is required",
      description: values.description ? "" : "Description is required",
      status: values.status ? "" : "Status is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleSubmit = async () => {
    if (!isValid) return;

    const fd = new FormData();
    fd.append("category_id", String(values.category_id));
    fd.append("name", values.name);
    fd.append("description", values.description);
    fd.append("status", values.status);

    if (values.icon instanceof File) {
      fd.append("icon", values.icon);
    }

    try {
      await dispatch(addProduct(fd)).unwrap();
      dispatch(getProducts({ offset: 0, limit: 10, context: "table" }));
      toast.success("Product added successfully!", { autoClose: 2500 });
      toggle();
      setValues({
        category_id: null,
        name: "",
        description: "",
        icon: null,
        status: "Active",
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product", {
        autoClose: 3000,
      });
    }
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
      <AddProductForm
        values={values}
        errors={errors}
        onChange={setValues}
        categories={{
          options: dropdownList || [],
          loadMore,
          hasMore,
          loading: fetchState.loading, // ✅ Pass loading too
        }}
      />
    </BaseModal>
  );
};

export default AddProductModal;