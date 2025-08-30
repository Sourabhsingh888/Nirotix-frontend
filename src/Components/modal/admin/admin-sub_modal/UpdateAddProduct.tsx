import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddProductForm from "../../../../pages/Admin/productManagement/addProductmodalform/AddProduct";
import {
  updateProduct,
  getProducts,
  getProductById,
} from "../../../../slices/addProduct/thunk";
import { getProductCategories } from "../../../../slices/productCategory/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import CategorySkeletonRow from "../../../Common/CategorySkeletonRow";

interface UpdateProductModalProps {
  isOpen: boolean;
  toggle: () => void;
  category?: number | string;
  onSuccess?: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  toggle,
  category,
  onSuccess,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { selected, detailState, updateState } = useSelector(
    (s: RootState) => s.AddProduct
  );
  const { dropdownList, fetchState, hasMore } = useSelector(
    (s: RootState) => s.ProductCategory
  );

  const [values, setValues] = useState({
    category_id: null as number | null,
    name: "",
    description: "",
    icon: null as File | string | null,
    status: "Active",
  });

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isOpen && category) {
      dispatch(getProductById(category));
      setOffset(0);
      dispatch(
        getProductCategories({ offset: 0, limit: 10, context: "dropdown" })
      );
    }
  }, [isOpen, category, dispatch]);

  useEffect(() => {
    if (selected && isOpen) {
      setValues({
        category_id: Number(selected.category_id) || null,
        name: selected.name || "",
        description: selected.description || "",
        icon: selected.icon || null,
        status: selected.status || "Active",
      });
    }
  }, [selected, isOpen]);

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


  const handleLoadMore = useCallback(() => {
    if (!fetchState.loading && hasMore) {
      const newOffset = offset + 1;
      setOffset(newOffset);
      dispatch(
        getProductCategories({
          offset: newOffset,
          limit: 10,
          context: "dropdown",
        })
      );
    }
  }, [dispatch, offset, fetchState.loading, hasMore]);

  const handleSubmit = async () => {
    if (!isValid || !category) return;

    const fd = new FormData();
    fd.append("category_id", String(values.category_id));
    fd.append("name", values.name);
    fd.append("description", values.description);
    fd.append("status", values.status);

    if (values.icon instanceof File) {
      fd.append("icon", values.icon); // new upload
    } else if (typeof values.icon === "string") {
      fd.append("icon", values.icon); // keep old value
    }

    await dispatch(updateProduct({ id: category, data: fd }));

    onSuccess?.();
    toggle();
  };

  if (!category) return null;

  const fetchbyidloading = detailState.loading;
  const updateloading = updateState.loading;

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product"
      submitLabel={updateloading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || updateloading || fetchbyidloading}
    >
      {fetchbyidloading ? (
        <CategorySkeletonRow type="form" rows={5} columns={1} />
      ) : (
        <AddProductForm
          values={values}
          errors={errors}
          onChange={setValues}
          categories={{
            options: dropdownList || [],
            loadMore: handleLoadMore,
            hasMore,
            loading: fetchState.loading,
          }}
          disableProductSelect
        />
      )}
    </BaseModal>
  );
};

export default UpdateProductModal;
