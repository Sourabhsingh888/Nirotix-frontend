import React from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import InfiniteDropdown from "../../../../Components/Common/CategorySelect";

// ✅ Define the values type once
interface Values {
  category_id: number | null;
  name: string;
  description: string;
  icon: File | string | null;
  status: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface AddProductFormProps {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  categories: {
    options: { id: number; name: string }[];
    hasMore: boolean;
    loadMore: () => void;
    loading: boolean;
  };
  disableProductSelect?: boolean;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  values,
  errors = {},
  onChange,
  categories,
  disableProductSelect = false,
}) => {

  return (
    <div className="row g-3">
      {/* Category */}
      <Col md={12}>
        <Label>Category</Label>
        <InfiniteDropdown
          placeholder="Select Category"
          value={values.category_id}
          options={(categories?.options).map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          loadMore={categories?.loadMore}
          hasMore={categories?.hasMore ?? false}
          loading={categories?.loading ?? false}
          onChange={(id) =>
            onChange({
              ...values,
              category_id: id ? Number(id) : null,
            })
          }
          error={errors?.category_id}
          isDisabled= {disableProductSelect}
        />
      </Col>

      {/* Name */}
      <Col md={12}>
        <Label>Name</Label>
        <Input
          type="text"
          value={values.name}
          onChange={(e) =>
            onChange({
              ...values,
              name: e.target.value,
            })
          }
          invalid={!!errors.name}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </Col>

      {/* Description */}
      <Col md={12}>
        <Label>Description</Label>
        <Input
          type="textarea"
          value={values.description}
          onChange={(e) =>
            onChange({
              ...values,
              description: e.target.value,
            })
          }
          invalid={!!errors.description}
        />
        {errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </Col>

      {/* Icon */}
      <Col md={12}>
        <Label>Icon</Label>
        <Input
          type="file"
          onChange={(e) =>
            onChange({
              ...values,
              icon: e.target.files?.[0] || null,
            })
          }
          invalid={!!errors.icon}
        />
        {errors.icon && <FormFeedback>{errors.icon}</FormFeedback>}

        {/* Preview */}
        {values.icon && typeof values.icon !== "string" && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(values.icon)}
              alt="preview"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </div>
        )}
        {values.icon && typeof values.icon === "string" && (
          <div className="mt-2">
            <img
              src={values.icon}
              alt="preview"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </div>
        )}
      </Col>

      {/* Status */}
      <Col md={12}>
        <Label className="form-label" htmlFor="status-active">
          Status
        </Label>
        <br />
        <div className="form-check form-check-inline form-radio-success">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="status-active"
            value="Active"
            checked={values.status === "Active"}
            onChange={() => onChange({ ...values, status: "Active" })}
          />
          <Label className="form-check-label" htmlFor="status-active">
            Active
          </Label>
        </div>
        <div className="form-check form-check-inline form-radio-danger">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="status-inactive"
            value="Inactive"
            checked={values.status === "Inactive"}
            onChange={() => onChange({ ...values, status: "Inactive" })}
          />
          <Label className="form-check-label" htmlFor="status-inactive">
            Inactive
          </Label>
        </div>
        {errors.status && (
          <FormFeedback className="d-block text-danger">
            {errors.status}
          </FormFeedback>
        )}
      </Col>
    </div>
  );
};

export default AddProductForm;
