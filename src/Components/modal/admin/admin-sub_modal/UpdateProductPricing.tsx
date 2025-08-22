import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddProductPricingForm from "../../../../pages/Admin/productManagement/productPricingmodalform/AddProductPricing";
import {
  updateProductPricing,
  getProductPricing,
} from "../../../../slices/productPricing/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import { toast } from "react-toastify";

interface FormDataType {
  product_id?: string | number;
  price: number | string;
  currency: string;
}

interface UpdateProductPricingModalProps {
  isOpen: boolean;
  toggle: () => void;
  productPricing?: FormDataType & { id?: string | number };
}

const UpdateProductPricingModal: React.FC<UpdateProductPricingModalProps> = ({
  isOpen,
  toggle,
  productPricing,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    product_id: undefined,
    price: 0,
    currency: "INR",
  });

  const loading = useSelector(
    (state: RootState) => state.ProductPrice.updateState.loading
  );

  // ✅ Prefill form whenever productPricing changes
  useEffect(() => {
    if (productPricing) {
      setFormData({
        product_id: productPricing.product_id,
        price: productPricing.price,
        currency: productPricing.currency,
      });
      setIsValid(true);
    }
  }, [productPricing]);

  const handleFormChange = useCallback((valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  }, []);

  const handleSubmit = async () => {
    if (!isValid || !productPricing?.id) return;

    // ✅ Build payload matching thunk
    const payload = {
      id: productPricing.id,
      price: Number(formData.price), // normalize to number
      currency: formData.currency,
    };

    const resultAction = await dispatch(updateProductPricing(payload));

    if (updateProductPricing.fulfilled.match(resultAction)) {
      dispatch(
        getProductPricing({
          offset: 0,
          limit: 10,
          searchValue: "",
        })
      );
      toggle();
    } else {
      toast.error(
        (resultAction.payload as any)?.message ||
          "Failed to update product price",
        { autoClose: 3000 }
      );
    }
  };

  if (!productPricing) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product Pricing"
      submitLabel={loading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <AddProductPricingForm
        initialData={formData}
        onChange={handleFormChange}
      />
    </BaseModal>
  );
};

export default UpdateProductPricingModal;