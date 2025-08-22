import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface GSTINVerifyFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const GSTIN_NoVerify: React.FC<GSTINVerifyFormProps> = ({ onChange }) => {
  const [gstin, setGstin] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const gstinRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const isValid = gstinRegex.test(gstin);

    if (touched) {
      if (!gstin) {
        setError("GSTIN is required");
      } else if (!isValid) {
        setError("Invalid GSTIN format. Example: 22AAAAA0000A1Z5");
      } else {
        setError("");
      }
    }

    onChange(isValid, { gstin });
  }, [gstin, touched, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (input.length <= 15) {
      setGstin(input);
    }
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="gstinNumber" className="form-label">
            GSTIN Number
          </Label>
          <Input
            type="text"
            id="gstinNumber"
            value={gstin}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            placeholder="Enter 15-character GSTIN"
            autoComplete="off"
            maxLength={15}
            invalid={touched && !!error}
          />
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </div>
      </Col>
    </div>
  );
};

export default GSTIN_NoVerify;