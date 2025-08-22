import React, { useState, useEffect } from "react";
import { Col, Label, Input, FormFeedback } from "reactstrap";

interface AddApiProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AddApi: React.FC<AddApiProps> = ({ onChange }) => {
  const [apiName, setApiName] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isValid = apiName.trim() !== "";

    setError(!isValid && touched ? "API Name is required" : null);
    onChange(isValid, { apiName });
  }, [apiName, touched]);

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="apiname" className="form-label">
            Enter API Name
          </Label>
          <Input
            type="text"
            id="apiname"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Enter API Name"
            autoComplete="off"
            invalid={!!error}
          />
          {error && <FormFeedback>{error}</FormFeedback>}
        </div>
      </Col>
    </div>
  );
};

export default AddApi;