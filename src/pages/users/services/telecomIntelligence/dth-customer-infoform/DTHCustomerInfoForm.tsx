import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import sunDirect_Img from "../../../../../assets/images/dish-operator-logo/sun-direct-logo.png";
import videocond2h_Img from "../../../../../assets/images/dish-operator-logo/videocon-d2h-logo.png";
import tataPlay_Img from "../../../../../assets/images/dish-operator-logo/tata-play-logo.png";
import airtelTv_Img from "../../../../../assets/images/dish-operator-logo/airtel-digital-tv-logo.png";
import dishTv_Img from "../../../../../assets/images/dish-operator-logo/dish-tv-logo.png";

interface Props {
  onChange: (isValid: boolean, formData: any) => void;
}

const operators = [
  {
    label: "Sun Direct",
    value: "sun",
    logo: sunDirect_Img,
    minLength: 5,
    maxLength: 12,
  },
  {
    label: "Videocon D2H",
    value: "videocon",
    logo: videocond2h_Img,
    minLength: 6,
    maxLength: 10,
  },
  {
    label: "Tata Play",
    value: "tata",
    logo: tataPlay_Img,
    minLength: 10,
    maxLength: 10,
  },
  {
    label: "Airtel Digital TV",
    value: "airtel",
    logo: airtelTv_Img,
    minLength: 10,
    maxLength: 10,
  },
  {
    label: "Dish TV",
    value: "dish",
    logo: dishTv_Img,
    minLength: 11,
    maxLength: 11,
  },
];

const DTHCustomerInfoForm: React.FC<Props> = ({ onChange }) => {
  const [customerId, setCustomerId] = useState("");
  const [operator, setOperator] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [operatorTouched, setOperatorTouched] = useState(false);
  const [customerIdTouched, setCustomerIdTouched] = useState(false);

  useEffect(() => {
    if (operator && customerId) {
      const isValid =
        customerId.length >= operator.minLength &&
        customerId.length <= operator.maxLength;

      setError(
        isValid
          ? null
          : `Customer ID must be ${operator.minLength}-${operator.maxLength} digits`
      );

      onChange(isValid, { customerId, operator: operator.value });
    } else {
      setError(null);
      onChange(false, {});
    }
  }, [customerId, operator]);

  return (
    <>
      <FormGroup>
        <Label>Select Operator</Label>
        <Select
          placeholder="Select Operator"
          options={operators}
          value={operator}
          onChange={(val) => {
            setOperator(val);
            setOperatorTouched(true);
          }}
          onBlur={() => setOperatorTouched(true)}
          getOptionLabel={(e) => (
            <div className="d-flex align-items-center">
              <img src={e.logo} alt={e.label} height="20" className="me-2" />
              {e.label}
            </div>
          )}
          getSingleValue={(e) => (
            <div className="d-flex align-items-center">
              <img src={e.logo} alt={e.label} height="20" className="me-2" />
              {e.label}
            </div>
          )}
          styles={{
            control: (base) => ({
              ...base,
              borderColor:
                operatorTouched && !operator ? "#f46a6a" : base.borderColor,
              boxShadow:
                operatorTouched && !operator
                  ? "0 0 0 0.2rem rgba(244,106,106,0.25)"
                  : base.boxShadow,
            }),
          }}
        />
        {operatorTouched && !operator && (
          <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
            Please select an operator
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Enter Customer ID</Label>
        <Input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value.replace(/\D/g, ""))}
          onBlur={() => setCustomerIdTouched(true)}
          invalid={!!error && customerIdTouched}
        />
        {error && customerIdTouched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  );
};

export default DTHCustomerInfoForm;