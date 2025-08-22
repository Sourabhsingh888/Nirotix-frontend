import React, { useEffect, useState } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface MobileNoVerifyProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const MobileNoVerify: React.FC<MobileNoVerifyProps> = ({ onChange }) => {
  const [mobileNo, setMobileNo] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false); // track blur/focus
  const isValid = /^[6-9]\d{9}$/.test(mobileNo); // Indian mobile number

  useEffect(() => {
    onChange(isValid, { mobileNo });
  }, [mobileNo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // digits only
    if (input.length <= 10) {
      setMobileNo(input);
    }
  };

  const handleBlur = () => {
    setTouched(true); // field has been interacted with
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </Label>
          <Input
            type="text"
            id="mobileNumber"
            value={mobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 10-digit Mobile Number"
            autoComplete="off"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            invalid={touched && !isValid}
          />
          {touched && !isValid && (
            <FormFeedback>
              Please enter a valid 10-digit mobile number starting with 6–9.
            </FormFeedback>
          )}
        </div>
      </Col>
    </div>
  );
};

export default MobileNoVerify;