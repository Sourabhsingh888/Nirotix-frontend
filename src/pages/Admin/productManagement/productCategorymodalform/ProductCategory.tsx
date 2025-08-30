import React from "react";
import { Col, Input, FormFeedback, Label } from "reactstrap";

type Values = {
  name: string;
  status: string;
};

type Errors = Partial<{
  name: string;
  status: string;
}>;

interface Props {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
}

const AddCategoryForm: React.FC<Props> = ({
  values,
  errors = {},
  onChange,
}) => {
  return (
    <div className="row g-3">

      <Col xxl={12}>
        <Label htmlFor="categoryName" className="form-label">
          Name
        </Label>
        <Input
          type="text"
          id="categoryName"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="Enter Product Category Name"
          autoComplete="off"
          invalid={!!errors.name}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </Col>


      <Col xxl={12}>
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
          <FormFeedback className="d-block">{errors.status}</FormFeedback>
        )}
      </Col>
    </div>
  );
};

export default AddCategoryForm;