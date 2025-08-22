// AddProductPricingModal.tsx
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import ProductPricing from "../../../../pages/Admin/productManagement/productPricingmodalform/AddProductPricing";
import { toast } from "react-toastify";
import {
  addProductPricing,
  getProductPricing,
} from "../../../../slices/productPricing/thunk";

interface ProductPricingModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ProductPricingModal: React.FC<ProductPricingModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);

  const loading = useSelector(
    (state: RootState) => state.ProductPrice.addState.loading
  );

  const handleSubmit = async () => {
    if (!isValid || !formValues) return;

    try {
      await dispatch(addProductPricing(formValues)).unwrap();
      
      // refresh pricing list
      dispatch(
        getProductPricing({
          offset: 0,
          limit: 10,
        })
      );

      toggle();
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product pricing", {
        autoClose: 3000,
      });
    }
  };

const handleFormChange = useCallback((valid: boolean, data: any) => {
  setIsValid(valid);
  setFormValues(data);
}, []);

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Set Product Price"
      submitLabel={loading ? "Saving..." : "Submit"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || loading}
    >
      <ProductPricing onChange={handleFormChange} />
    </BaseModal>
  );
};

export default ProductPricingModal;