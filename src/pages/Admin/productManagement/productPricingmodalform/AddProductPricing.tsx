// import React from "react";
// import { Col, Label, Row, Input, FormFeedback } from "reactstrap";
// import Select from "react-select";

// type Values = {
//   product_id: number | string | "";
//   price: string;
//   currency: string;
// };

// type Errors = Partial<{
//   product_id: string;
//   price: string;
// }>;

// interface Props {
//   values: Values;
//   errors?: Errors;
//   onChange: (values: Values) => void;
//   productOptions: { value: number | string; label: string }[];
//   disableProductSelect?: boolean;
// }

// const ProductPricingForm: React.FC<Props> = ({
//   values,
//   errors = {},
//   onChange,
//   productOptions,
//   disableProductSelect = false,
// }) => {
//   const selectedOption =
//     productOptions.find((opt) => opt.value === values.product_id) || null;

//   return (
//     <div className="row g-3">
//       {/* Product Select */}
//       <Col xxl={12}>
//         <Label htmlFor="productSelect" className="form-label">
//           Products
//         </Label>
//         <Select
//           inputId="productSelect"
//           value={selectedOption}
//           onChange={(opt) =>
//             onChange({
//               ...values,
//               product_id: opt ? (opt as any).value : "",
//             })
//           }
//           options={productOptions}
//           placeholder="Select Product"
//           isClearable
//           isSearchable
//           isDisabled={disableProductSelect}
//         />
//         {errors.product_id && (
//           <div className="text-danger mt-1">{errors.product_id}</div>
//         )}
//       </Col>

//       {/* Price + Currency */}
//       <Row className="g-3">
//         <Col md={6}>
//           <Label htmlFor="productPrice" className="form-label">
//             Product Price
//           </Label>
//           <Input
//             type="number"
//             id="productPrice"
//             placeholder="Enter Price"
//             value={values.price}
//             onChange={(e) =>
//               onChange({
//                 ...values,
//                 price: e.target.value,
//               })
//             }
//             autoComplete="off"
//             invalid={!!errors.price}
//           />
//           {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
//         </Col>

//         <Col md={6}>
//           <Label htmlFor="currency" className="form-label">
//             Currency
//           </Label>
//           <Input type="text" id="currency" value={values.currency} disabled />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProductPricingForm;




import React from "react";
import { Col, Label, Row, Input, FormFeedback } from "reactstrap";
import InfiniteDropdown from "../../../../Components/Common/CategorySelect";

// ✅ Define the values type once
interface Values {
  product_id: number | string | "";
  price: string;
  currency: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface Props {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  productprice: {
    options: { id: number; name: string }[];
    hasMore: boolean;
    loadMore: () => void;
    loading: boolean;
  };
  disableProductSelect?: boolean;
}

const ProductPricingForm: React.FC<Props> = ({
  values,
  errors = {},
  onChange,
  productprice,
  disableProductSelect = false,
}) => {

  return (
    <div className="row g-3">
      {/* Product Select */}
      <Col xxl={12}>
        <Label htmlFor="productSelect" className="form-label">
          Products
        </Label>
        <InfiniteDropdown
          placeholder="Select Category"
          value={values.product_id}
          options={(productprice?.options ?? []).map((cat) => ({
            value: cat.value,
            label: cat.label,
          }))}
          loadMore={productprice?.loadMore}
          hasMore={productprice?.hasMore ?? false}
          loading={productprice?.loading ?? false}
          onChange={(id) =>
            onChange({
              ...values,
              product_id: id ? Number(id) : null,
            })
          }
          error={errors?.product_id}
          isDisabled={disableProductSelect}
        />
      </Col>

      {/* Price + Currency */}
      <Row className="g-3">
        <Col md={6}>
          <Label htmlFor="productPrice" className="form-label">
            Product Price
          </Label>
          <Input
            type="number"
            id="productPrice"
            placeholder="Enter Price"
            value={values.price}
            onChange={(e) =>
              onChange({
                ...values,
                price: e.target.value,
              })
            }
            autoComplete="off"
            invalid={!!errors.price}
          />
          {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
        </Col>

        <Col md={6}>
          <Label htmlFor="currency" className="form-label">
            Currency
          </Label>
          <Input type="text" id="currency" value={values.currency} disabled />
        </Col>
      </Row>
    </div>
  );
};

export default ProductPricingForm;