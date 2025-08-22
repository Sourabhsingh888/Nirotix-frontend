import React, { useEffect, useState } from "react";
import { Col, Label } from "reactstrap";
import Select from "react-select";
import airtel_Img from "../../../../../assets/images/mobile-operator-logo/airtel-logo.png";
import bsnl_Img from "../../../../../assets/images/mobile-operator-logo/bsn-logo.jpeg";
import jio_Img from "../../../../../assets/images/mobile-operator-logo/jio-logo.png";
import vi_Img from "../../../../../assets/images/mobile-operator-logo/vi-logo.png";

const circleOptions = [
  { value: "", label: "Select Circle" },
  { value: "1", label: "Andhra Pradesh" },
  { value: "2", label: "Assam" },
  { value: "3", label: "Bihar & Jharkhand" },
  { value: "4", label: "Chennai" },
  { value: "5", label: "Delhi NCR" },
  { value: "6", label: "Goa" },
  { value: "7", label: "Gujarat" },
  { value: "8", label: "Haryana" },
  { value: "9", label: "Himachal Pradesh" },
  { value: "10", label: "Jammu Kashmir" },
  { value: "11", label: "Karnataka" },
  { value: "12", label: "Kerala" },
  { value: "13", label: "Kolkata" },
  { value: "14", label: "Madhya Pradesh & Chhattisgarh" },
  { value: "15", label: "Maharashtra" },
  { value: "16", label: "Mumbai" },
  { value: "17", label: "North East" },
  { value: "18", label: "Orissa" },
  { value: "19", label: "Punjab" },
  { value: "20", label: "Rajasthan" },
  { value: "21", label: "Tamil Nadu" },
  { value: "22", label: "Telangana" },
  { value: "23", label: "UP East" },
  { value: "24", label: "UP West" },
  { value: "25", label: "Uttarakhand" },
  { value: "26", label: "West Bengal" },
];

const operatorOptions = [
  { value: "AT", label: "Airtel", image: airtel_Img },
  { value: "BSNL", label: "BSNL", image: bsnl_Img },
  { value: "JIO", label: "Jio", image: jio_Img },
  { value: "VI", label: "VI", image: vi_Img },
];

interface PrepaidTariffPlansFormProps {
  onChange: (
    valid: boolean,
    data: { circle: string; operator: string }
  ) => void;
}

const PrepaidTariffPlansForm: React.FC<PrepaidTariffPlansFormProps> = ({
  onChange,
}) => {
  const [selectedCircle, setSelectedCircle] = useState<any>(null);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [circleTouched, setCircleTouched] = useState(false);
  const [operatorTouched, setOperatorTouched] = useState(false);

  const isValid = !!selectedCircle?.value && !!selectedOperator?.value;

  useEffect(() => {
    onChange(isValid, {
      circle: selectedCircle?.value || "",
      operator: selectedOperator?.value || "",
    });
  }, [selectedCircle, selectedOperator]);

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <Label for="circlecode">Select Circle</Label>
        <Select
          id="circlecode"
          classNamePrefix="select2"
          value={selectedCircle}
          onChange={(value) => {
            setSelectedCircle(value);
            setCircleTouched(true);
          }}
          onBlur={() => setCircleTouched(true)}
          options={circleOptions}
          styles={{
            control: (base) => ({
              ...base,
              borderColor:
                circleTouched && !selectedCircle?.value
                  ? "#f46a6a"
                  : base.borderColor,
              boxShadow:
                circleTouched && !selectedCircle?.value
                  ? "0 0 0 0.2rem rgba(244, 106, 106, 0.25)"
                  : base.boxShadow,
            }),
          }}
        />
        {circleTouched && !selectedCircle?.value && (
          <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
            Please select a circle
          </div>
        )}
      </Col>

      <Col xxl={12}>
        <Label for="operatorcode">Select Operator</Label>
        <Select
          id="operatorcode"
          classNamePrefix="select2"
          value={selectedOperator}
          onChange={(value) => {
            setSelectedOperator(value);
            setOperatorTouched(true);
          }}
          onBlur={() => setOperatorTouched(true)}
          options={operatorOptions}
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
            control: (base) => ({
              ...base,
              borderColor:
                operatorTouched && !selectedOperator?.value
                  ? "#f46a6a"
                  : base.borderColor,
              boxShadow:
                operatorTouched && !selectedOperator?.value
                  ? "0 0 0 0.2rem rgba(244, 106, 106, 0.25)"
                  : base.boxShadow,
            }),
          }}
        />
        {operatorTouched && !selectedOperator?.value && (
          <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
            Please select an operator
          </div>
        )}
      </Col>
    </div>
  );
};

export default PrepaidTariffPlansForm;