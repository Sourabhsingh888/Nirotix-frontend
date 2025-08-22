import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, FormFeedback } from "reactstrap";
import Select from "react-select";

interface AddMsgApiFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const methodOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
];

const typeOptions = [
  { label: "SMS", value: "sms" },
  { label: "Whatsapp", value: "whatsapp" },
];

const AddMsgApi: React.FC<AddMsgApiFormProps> = ({ onChange }) => {
  const [apiName, setApiName] = useState("");
  const [apiType, setApiType] = useState<any>(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiParams, setApiParams] = useState("");
  const [apiMethod, setApiMethod] = useState<any>(null);
  const [status, setStatus] = useState("active");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (touched.apiName && !apiName.trim())
      newErrors.apiName = "API Name is required";
    if (touched.apiType && !apiType) newErrors.apiType = "API Type is required";
    if (touched.baseUrl && !baseUrl.trim())
      newErrors.baseUrl = "Base URL is required";
    if (touched.apiParams && !apiParams.trim())
      newErrors.apiParams = "API Params are required";
    if (touched.apiMethod && !apiMethod)
      newErrors.apiMethod = "API Method is required";
    setErrors(newErrors);

    const isValid =
      apiName.trim() !== "" &&
      baseUrl.trim() !== "" &&
      apiParams.trim() !== "" &&
      apiType !== null &&
      apiMethod !== null &&
      status !== "";

    const formData = {
      apiName,
      apiType: apiType?.value || "",
      baseUrl,
      apiParams,
      apiMethod: apiMethod?.value || "",
      status,
    };

    onChange(isValid && Object.keys(newErrors).length === 0, formData);
  }, [apiName, apiType, baseUrl, apiParams, apiMethod, status, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Row className="g-3">
      <Col md={12}>
        <Label className="form-label">Api Name</Label>
        <Input
          type="text"
          placeholder="Enter Api name"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          onBlur={() => handleBlur("apiName")}
          invalid={!!errors.apiName}
        />
        <FormFeedback>{errors.apiName}</FormFeedback>
      </Col>

      <Col md={12}>
        <Label className="form-label">Api Type</Label>
        <Select
          options={typeOptions}
          value={apiType}
          onChange={(val) => setApiType(val)}
          onBlur={() => handleBlur("apiType")}
          placeholder="Select Api Type"
        />
        {errors.apiType && (
          <div className="text-danger mt-1">{errors.apiType}</div>
        )}
      </Col>

      <Col md={12}>
        <Label className="form-label">Base Url</Label>
        <Input
          type="text"
          placeholder="Paste Base Url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          onBlur={() => handleBlur("baseUrl")}
          invalid={!!errors.baseUrl}
        />
        <FormFeedback>{errors.baseUrl}</FormFeedback>
      </Col>

      <Col md={12}>
        <Label className="form-label">Api Params</Label>
        <Input
          type="textarea"
          rows="3"
          placeholder="Paste Api Params"
          value={apiParams}
          onChange={(e) => setApiParams(e.target.value)}
          onBlur={() => handleBlur("apiParams")}
          invalid={!!errors.apiParams}
        />
        <FormFeedback>{errors.apiParams}</FormFeedback>
        <span className="text-pink mt-1 d-block">
          [NUMBER], [MESSAGE], [TEMP_ID]
        </span>
      </Col>

      <Col md={12}>
        <Label className="form-label">Api Method</Label>
        <Select
          options={methodOptions}
          value={apiMethod}
          onChange={(val) => setApiMethod(val)}
          onBlur={() => handleBlur("apiMethod")}
          placeholder="Select Method"
        />
        {errors.apiMethod && (
          <div className="text-danger mt-1">{errors.apiMethod}</div>
        )}
      </Col>

      <Col md={12}>
        <Label className="form-label">Status</Label>
        <div className="d-flex gap-4 mt-1">
          <div className="form-check form-check-inline form-radio-success">
            <Input
              type="radio"
              id="active"
              name="status"
              className="form-check-input"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <Label htmlFor="active" className="form-check-label">
              Active
            </Label>
          </div>

          <div className="form-check form-check-inline form-radio-danger">
            <Input
              type="radio"
              id="inactive"
              name="status"
              className="form-check-input"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />
            <Label htmlFor="inactive" className="form-check-label">
              Inactive
            </Label>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AddMsgApi;