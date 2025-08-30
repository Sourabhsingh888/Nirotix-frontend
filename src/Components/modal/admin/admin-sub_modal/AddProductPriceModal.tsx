// import React, { useMemo, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../../../Store";
// import BaseModal from "../../basemodal/BaseModal";
// import ProductPricing from "../../../../pages/Admin/productManagement/productPricingmodalform/AddProductPricing";
// import { toast } from "react-toastify";
// import {
//   addProductPricing,
//   getProductPricing,
// } from "../../../../slices/productPricing/thunk";
// import { getProducts } from "../../../../slices/addProduct/thunk";

// interface ProductPricingModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   onSuccess?: () => void;
// }

// const AddProductPricingModal: React.FC<ProductPricingModalProps> = ({
//   isOpen,
//   toggle,
//   onSuccess,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     if (isOpen) {
//       setOffset(0);
//       dispatch(getProducts({ offset: 0, limit: 10, context: "dropdown" }));
//     }
//   }, [isOpen, dispatch]);

//   const { productdropdownList, fetchState, addState, hasMore } = useSelector(
//     (s: RootState) => s.AddProduct
//   );

//     const productOptions = useMemo(
//     () =>
//       (productdropdownList || []).map((p: any) => ({
//         value: p.id,
//         label: p.name,
//       })),
//     [productdropdownList]
//   );

//   const loadMore = () => {
//     const nextOffset = offset + 1;
//     setOffset(nextOffset);
//     dispatch(
//       getProducts({
//         offset: nextOffset,
//         limit: 10,
//         context: "dropdown",
//       })
//     );
//   };

//   const loading = addState.loading;

//   const [values, setValues] = useState({
//     product_id: "" as number | string | "",
//     price: "",
//     currency: "INR",
//   });

//   const errors = useMemo(() => {
//     return {
//       product_id: values.product_id ? "" : "Product is required",
//       price: values.price ? "" : "Price is required",
//     };
//   }, [values]);

//   const isValid = useMemo(
//     () => Object.values(errors).every((e) => !e),
//     [errors]
//   );

//   const handleSubmit = async () => {
//     if (!isValid) return;
//     try {
//       await dispatch(
//         addProductPricing({
//           product_id: values.product_id,
//           price: values.price,
//           currency: values.currency,
//         })
//       ).unwrap();

//       // dispatch(getProductPricing({ offset: 0, limit: 10 }));
//       onSuccess?.();
//       toggle();
//       setValues({ product_id: "", price: "", currency: "INR" });
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to add product pricing", {
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       toggle={toggle}
//       title="Set Product Price"
//       submitLabel={loading ? "Saving..." : "Submit"}
//       cancelLabel="Cancel"
//       size="md"
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isValid || loading}
//     >
//       <ProductPricing
//         values={values}
//         errors={errors}
//         onChange={setValues}
//         productprice={{
//         options: productOptions || [],
//         loadMore,
//         hasMore,
//         loading: fetchState.loading, // ✅ Pass loading too
//         }}
//       />
//     </BaseModal>
//   );
// };

// export default AddProductPricingModal;





import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import BaseModal from "../../basemodal/BaseModal";
import ProductPricing from "../../../../pages/Admin/productManagement/productPricingmodalform/AddProductPricing";
import {
  addProductPricing,
  getProductPricing,
} from "../../../../slices/productPricing/thunk";
import { getProducts } from "../../../../slices/addProduct/thunk";

interface ProductPricingModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess?: () => void;
}

const AddProductPricingModal: React.FC<ProductPricingModalProps> = ({
  isOpen,
  toggle,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setOffset(0);
      dispatch(getProducts({ offset: 0, limit: 10, context: "dropdown" }));
    }
  }, [isOpen, dispatch]);

  const { productdropdownList, fetchState, addState, hasMore } = useSelector(
    (s: RootState) => s.AddProduct
  );

  const productOptions = useMemo(
    () =>
      (productdropdownList || []).map((p: any) => ({
        value: p.id,
        label: p.name,
      })),
    [productdropdownList]
  );

  const loadMore = () => {
    const nextOffset = offset + 1;
    setOffset(nextOffset);
    dispatch(
      getProducts({
        offset: nextOffset,
        limit: 10,
        context: "dropdown",
      })
    );
  };

  const loading = addState.loading;

  const [values, setValues] = useState({
    product_id: "" as number | string | "",
    price: "",
    currency: "INR",
  });

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

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await dispatch(
        addProductPricing({
          product_id: values.product_id,
          price: values.price,
          currency: values.currency,
        })
      ).unwrap();

      onSuccess?.();
      toggle();
      setValues({ product_id: "", price: "", currency: "INR" });
    } catch (err: any) {
      // toast removed
    }
  };

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
      <ProductPricing
        values={values}
        errors={errors}
        onChange={setValues}
        productprice={{
          options: productOptions || [],
          loadMore,
          hasMore,
          loading: fetchState.loading,
        }}
      />
    </BaseModal>
  );
};

export default AddProductPricingModal;
