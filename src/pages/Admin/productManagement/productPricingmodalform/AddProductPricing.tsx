import React, { useState, useEffect } from "react";
import { Col, Label, Row, Input, FormFeedback } from "reactstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import { getProducts } from "../../../../slices/addProduct/thunk";

interface ProductPricingProps {
  onChange: (
    isValid: boolean,
    data: {
      product_id: number | string;
      price: string;
      currency: string;
    }
  ) => void;
  initialData?: {
    product_id: number | string;
    price: string;
    currency: string;
  };
}

const ProductPricing: React.FC<ProductPricingProps> = ({
  onChange,
  initialData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.AddProduct);
console.log(list);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Local form states
  const [product, setProduct] = useState<number | "">("");
  const [price, setPrice] = useState("");
  const [currency] = useState("INR");

  // Validation state
  const [touched, setTouched] = useState({ product: false, price: false });
  const [errors, setErrors] = useState({ product: "", price: "" });

  // Fetch products only on mount or when pagination changes
  useEffect(() => {
    dispatch(
      getProducts({
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage]);

  // Prefill from initialData only once when it changes
  // Prefill only when product_id changes
  useEffect(() => {
    if (initialData?.product_id) {
      setProduct(initialData.product_id);
      setPrice(initialData.price || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.product_id]);

  // Run validation and pass data upward
  useEffect(() => {
    const newErrors = {
      product: product ? "" : "Product is required",
      price: price ? "" : "Price is required",
    };

    setErrors((prev) =>
      JSON.stringify(prev) === JSON.stringify(newErrors) ? prev : newErrors
    );

    const isValid = Object.values(newErrors).every((err) => err === "");

    // ✅ call onChange only when product/price/currency changes
    onChange(isValid, { product_id: product, price, currency });
  }, [product, price, currency]); // removed onChange from deps

  // Convert API products to react-select format
  const productOptions =
    list?.map((p: any) => ({
      label: p.name,
      value: p.id,
    })) || [];

  return (
    <div className="row g-3">
      {/* Product Select */}
      <Col xxl={12}>
        <div>
          <Label htmlFor="productSelect" className="form-label">
            Products
          </Label>
          <Select
            id="productSelect"
            value={productOptions.find((opt) => opt.value === product) || null}
            onChange={(selected) => setProduct(selected ? selected.value : "")}
            onBlur={() => setTouched((prev) => ({ ...prev, product: true }))}
            options={productOptions}
            placeholder="Select Product"
            isClearable
            isSearchable
            onMenuScrollToBottom={() => setCurrentPage((prev) => prev + 1)}
          />
          {touched.product && errors.product && (
            <div className="text-danger mt-1">{errors.product}</div>
          )}
        </div>
      </Col>

      {/* Price and Currency */}
      <Row className="g-3">
        <Col md={6}>
          <div>
            <Label htmlFor="productPrice" className="form-label">
              Product Price
            </Label>
            <Input
              type="number"
              id="productPrice"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
              autoComplete="off"
              invalid={touched.price && !!errors.price}
            />
            {touched.price && errors.price && (
              <FormFeedback>{errors.price}</FormFeedback>
            )}
          </div>
        </Col>

        <Col md={6}>
          <div>
            <Label htmlFor="currency" className="form-label">
              Currency
            </Label>
            <Input type="text" id="currency" value={currency} disabled />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPricing;