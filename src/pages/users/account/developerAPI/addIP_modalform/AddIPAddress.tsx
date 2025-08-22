import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface AadIPAddressFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AadIPAddress: React.FC<AadIPAddressFormProps> = ({ onChange }) => {
  const [ipno, setIpno] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

  useEffect(() => {
    const isValid = ipRegex.test(ipno);
    if (!ipno && touched) {
      setError("IP address is required");
    } else if (ipno && !isValid) {
      setError("Invalid IP address format");
    } else {
      setError(null);
    }
    onChange(isValid, { ipno });
  }, [ipno, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpno(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="ipAddress" className="form-label">
            Enter IP Address
          </Label>
          <Input
            type="text"
            id="ipAddress"
            value={ipno}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter IPv4 Address (e.g., 192.168.0.1)"
            autoComplete="off"
            inputMode="numeric"
            invalid={touched && !!error}
          />
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </div>
      </Col>
    </div>
  );
};

export default AadIPAddress;