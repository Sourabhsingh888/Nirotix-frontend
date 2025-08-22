import React, { useState, useEffect } from "react";
import { Col, Input, FormFeedback, Label } from "reactstrap";

interface AddCategoryFormProps {
  onChange: (isValid: boolean, formData: any) => void;
  initialData?: { name: string; status: string };
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  onChange,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [status, setStatus] = useState(initialData?.status || "");

  const [touchedName, setTouchedName] = useState(false);
  const [touchedStatus, setTouchedStatus] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  // ✅ Update state if initialData changes (important for edit forms)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setStatus(initialData.status || "");
    }
  }, []);

  // ✅ Validation effect
  useEffect(() => {
    const isNameValid = name.trim() !== "";
    const isStatusValid = status.trim() !== "";

    setNameError(!isNameValid && touchedName ? "Name is required" : null);
    setStatusError(
      !isStatusValid && touchedStatus ? "Status is required" : null
    );

    onChange(isNameValid && isStatusValid, { name, status });
  }, [name, status, touchedName, touchedStatus, onChange]);

  return (
    <div className="row g-3">
      {/* Name Field */}
      <Col xxl={12}>
        <Label htmlFor="categoryName" className="form-label">
          Name
        </Label>
        <Input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouchedName(true)}
          placeholder="Enter Product Category Name"
          autoComplete="off"
          invalid={!!nameError}
        />
        {nameError && <FormFeedback>{nameError}</FormFeedback>}
      </Col>

      {/* Status Field */}
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
            checked={status === "Active"}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => setTouchedStatus(true)}
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
            checked={status === "Inactive"}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => setTouchedStatus(true)}
          />
          <Label className="form-check-label" htmlFor="status-inactive">
            Inactive
          </Label>
        </div>
        {statusError && (
          <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
            {statusError}
          </div>
        )}
      </Col>
    </div>
  );
};

export default AddCategoryForm;