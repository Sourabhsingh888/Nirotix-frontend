import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import ProductPricing from "../../../../pages/Admin/productManagement/productPricingmodalform/AddProductPricing";
import {
  updateProductPricing,
  getProductPricing,
  getProductPricingById,
} from "../../../../slices/productPricing/thunk";
import { getProducts } from "../../../../slices/addProduct/thunk";
import { RootState, AppDispatch } from "../../../../Store";
import CategorySkeletonRow from "../../../Common/SkeletonWrapper";

interface UpdateProductPricingModalProps {
  isOpen: boolean;
  toggle: () => void;
  productPricing?: number;
  onSuccess: () => void;
}

const UpdateProductPricingModal: React.FC<UpdateProductPricingModalProps> = ({
  isOpen,
  toggle,
  productPricing,
  onSuccess,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { selected, detailState, updateState } = useSelector(
    (s: RootState) => s.ProductPrice
  );
  const { productdropdownList, fetchState, hasMore } = useSelector(
    (s: RootState) => s.AddProduct
  );

  const [values, setValues] = useState({
    product_id: "" as number | string | "",
    price: "",
    currency: "INR",
  });

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isOpen && productPricing) {
      dispatch(getProductPricingById(productPricing));
      dispatch(getProducts({ offset: 0, limit: 10, context: "dropdown" }));
    }
  }, [isOpen, productPricing, dispatch]);

  useEffect(() => {
    if (selected && isOpen) {
      setValues({
        product_id: (selected as any).product_id ?? "",
        price: String((selected as any).price ?? ""),
        currency: (selected as any).currency ?? "INR",
      });
    }
  }, [selected, isOpen]);

  const errors = useMemo(() => {
    return {
      product_id: values.product_id ? "" : "Product is required",
      price: values.price ? "" : "Price is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const productOptions = useMemo(() => {
    const base =
      (productdropdownList || []).map((p: any) => ({
        value: p.id,
        label: p.name,
      })) || [];

    const exists =
      selected && base.some((o) => o.value === (selected as any).product_id);

    if (!exists && selected) {
      const fallbackLabel =
        (selected as any).products || `#${(selected as any).product_id}`;
      base.unshift({
        value: (selected as any).product_id,
        label: fallbackLabel,
      });
    }
    return base;
  }, [productdropdownList, selected]);


  const handleLoadMore = useCallback(() => {
    if (!fetchState.loading && hasMore) {
      const newOffset = offset + 1;
      setOffset(newOffset);
      dispatch(
        getProducts({
          offset: newOffset,
          limit: 10,
          context: "dropdown",
        })
      );
    }
  }, [dispatch, offset, fetchState.loading, hasMore]);

  const handleSubmit = async () => {
    if (!isValid || !productPricing) return;

    const payload = {
      id: productPricing,
      price: Number(values.price),
      currency: values.currency,
    };

    const res = await dispatch(updateProductPricing(payload));
    if (updateProductPricing.fulfilled.match(res)) {
      onSuccess();
      toggle();
    } else {

    }
  };

  if (!productPricing) return null;

  const fetchbyidloading = detailState.loading;
  const updateloading = updateState.loading;

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Update Product Pricing"
      submitLabel={updateloading ? "Updating..." : "Update"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid || updateloading || fetchbyidloading}
    >
      {fetchbyidloading ? (
        <CategorySkeletonRow type="form" rows={2} columns={1} />
      ) : (
        <ProductPricing
          values={values}
          errors={errors}
          onChange={setValues}
          productprice={{
            options: productOptions || [],
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

export default UpdateProductPricingModal;
