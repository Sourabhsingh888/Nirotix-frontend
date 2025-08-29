import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddCategoryForm from "../../../../pages/Admin/productManagement/productCategorymodalform/ProductCategory";
import {
  updateProductCategory,
  getProductCategories,
  getProductCategoryById,
} from "../../../../slices/productCategory/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import CategorySkeletonRow from "../../../Common/CategorySkeletonRow";
import { toast } from "react-toastify";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
  category?: number;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  isOpen,
  toggle,
  category,
}) => {
  const dispatch: AppDispatch = useDispatch();

  // fetch category by id when modal is opened
  useEffect(() => {
    if (isOpen && category) {
      dispatch(getProductCategoryById(category));
    }
  }, [isOpen, category, dispatch]);

  const {offset, limit,selected, updateState, detailState } = useSelector(
    (s: RootState) => s.ProductCategory
  );

  const [values, setValues] = useState({
    name: "",
    status: "Active",
  });

  // prefill values when record is loaded
  useEffect(() => {
    if (selected && isOpen) {
      setValues({
        name: (selected as any).name ?? "",
        status: String((selected as any).status ?? "Active"),
      });
    }
  }, [selected, isOpen]);

  // validation
  const errors = useMemo(() => {
    return {
      name: values.name.trim() ? "" : "Name is required",
      status: values.status ? "" : "Status is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleSubmit = async () => {
    if (!isValid || !category) return;

    const payload = {
      id: category,
      name: values.name,
      status: values.status,
    };

    const res = await dispatch(updateProductCategory(payload));
    if (updateProductCategory.fulfilled.match(res)) {
      dispatch(
        getProductCategories({ offset: offset, limit: limit, context: "table" })
      );
      toggle();
    } else {
      toast.error(
        (res.payload as any)?.message || "Failed to update category",
        {
          autoClose: 3000,
        }
      );
    }
  };

  if (!category) return null;

  const updateloading = updateState.loading;
  const fetchbyidloading = detailState.loading;

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product Category"
      submitLabel={updateloading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || updateloading || fetchbyidloading}
    >
      {fetchbyidloading ? (
        // use your dynamic skeleton here
        <CategorySkeletonRow type="form" rows={2} columns={1} />
      ) : (
        <AddCategoryForm values={values} errors={errors} onChange={setValues} />
      )}
    </BaseModal>
  );
};

export default UpdateCategoryModal;