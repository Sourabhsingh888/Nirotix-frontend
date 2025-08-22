import React, { useEffect, useState } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import airtel_Img from "../../../../../assets/images/mobile-operator-logo/airtel-logo.png";
import bsnl_Img from "../../../../../assets/images/mobile-operator-logo/bsn-logo.jpeg";
import jio_Img from "../../../../../assets/images/mobile-operator-logo/jio-logo.png";
import vi_Img from "../../../../../assets/images/mobile-operator-logo/vi-logo.png";

interface SpecialOfferFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const operatorOptions = [
  { value: "AT", label: "Airtel", image: airtel_Img },
  { value: "BSNL", label: "BSNL", image: bsnl_Img },
  { value: "JIO", label: "Jio", image: jio_Img },
  { value: "VI", label: "VI", image: vi_Img },
];

const SpecialOfferCheckForm: React.FC<SpecialOfferFormProps> = ({
  onChange,
}) => {
  const [number, setNumber] = useState("");
  const [numberTouched, setNumberTouched] = useState(false);
  const [numberError, setNumberError] = useState("");

  const [operator, setOperator] = useState<any>(null);
  const [operatorTouched, setOperatorTouched] = useState(false);
  const [operatorError, setOperatorError] = useState("");

  useEffect(() => {
    const numberValid = /^\d{10}$/.test(number);
    const operatorValid = !!operator;

    setNumberError(
      numberTouched && !numberValid
        ? "Enter a valid 10-digit mobile number"
        : ""
    );
    setOperatorError(
      operatorTouched && !operatorValid ? "Please select a mobile operator" : ""
    );

    onChange(numberValid && operatorValid, {
      number,
      operator: operator?.value,
    });
  }, [number, operator, numberTouched, operatorTouched]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 10);
    setNumber(input);
  };

  const handleOperatorChange = (selected: any) => {
    setOperator(selected);
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <Label className="form-label">Enter Number</Label>
        <Input
          type="text"
          value={number}
          onChange={handleNumberChange}
          onBlur={() => setNumberTouched(true)}
          placeholder="Enter Number"
          autoComplete="off"
          maxLength={10}
          invalid={numberTouched && !!numberError}
        />
        {numberTouched && numberError && (
          <FormFeedback>{numberError}</FormFeedback>
        )}
      </Col>

      <Col xxl={12}>
        <Label className="form-label">Select Operator</Label>
        <Select
          options={operatorOptions}
          placeholder="Select Operator"
          onChange={(selected) => {
            setOperatorTouched(true);
            handleOperatorChange(selected);
          }}
          onBlur={() => setOperatorTouched(true)}
          getOptionLabel={(e) => (
            <div className="d-flex align-items-center">
              <img src={e.image} alt={e.label} height="20" className="me-2" />
              {e.label}
            </div>
          )}
          getSingleValue={(e) => (
            <div className="d-flex align-items-center">
              <img src={e.image} alt={e.label} height="20" className="me-2" />
              {e.label}
            </div>
          )}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor:
                operatorTouched && operatorError ? "#f46a6a" : base.borderColor,
              boxShadow:
                operatorTouched && operatorError
                  ? "0 0 0 0.2rem rgba(244, 106, 106, 0.25)"
                  : base.boxShadow,
            }),
          }}
        />
        {operatorTouched && operatorError && (
          <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
            {operatorError}
          </div>
        )}
      </Col>
    </div>
  );
};

export default SpecialOfferCheckForm;