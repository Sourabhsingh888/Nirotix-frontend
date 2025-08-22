import React, { useEffect, useState } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface AadharVerifyFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AadharNoVerify: React.FC<AadharVerifyFormProps> = ({ onChange }) => {
  const [aadharNo, setAadharNo] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const isValid = /^\d{12}$/.test(aadharNo); // Aadhaar: exactly 12 digits

  useEffect(() => {
    onChange(isValid, { aadharNo });
  }, [aadharNo, isValid, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericInput = e.target.value.replace(/\D/g, "");
    if (numericInput.length <= 12) {
      setAadharNo(numericInput);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="aadharNumber" className="form-label">
            Aadhaar Number
          </Label>
          <Input
            type="text"
            id="aadharNumber"
            value={aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 12-digit Aadhaar Number"
            autoComplete="off"
            inputMode="numeric"
            maxLength={12}
            invalid={touched && !isValid}
          />
          {touched && !isValid && (
            <FormFeedback>
              Please enter a valid 12-digit Aadhaar number.
            </FormFeedback>
          )}
        </div>
      </Col>
    </div>
  );
};

export default AadharNoVerify;