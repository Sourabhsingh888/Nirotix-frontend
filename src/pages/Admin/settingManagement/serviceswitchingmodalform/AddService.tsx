import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import Select from "react-select";

interface AddServiceFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const typeOptions = [
  { value: "Commission", label: "Commission" },
  { value: "Surcharge", label: "Surcharge" },
];

const AddService: React.FC<AddServiceFormProps> = ({ onChange }) => {
  const [api, setApi] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [apiCode, setApiCode] = useState("");
  const [rate, setRate] = useState("");
  const [commOrSurcharge, setCommOrSurcharge] = useState<any>(null);
  const [selectType, setSelectType] = useState<any>(null);
  const [gst, setGst] = useState("");
  const [tds, setTds] = useState("");
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState<any>(null);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (touched.api && !api) newErrors.api = "API selection is required";
    if (touched.provider && !provider)
      newErrors.provider = "Provider is required";
    if (touched.apiCode && !apiCode.trim())
      newErrors.apiCode = "API Code is required";
    if (touched.rate && !rate.trim()) newErrors.rate = "Rate is required";
    if (touched.commOrSurcharge && !commOrSurcharge)
      newErrors.commOrSurcharge = "Required";
    if (touched.selectType && !selectType) newErrors.selectType = "Required";
    if (touched.gst && !gst.trim()) newErrors.gst = "GST is required";
    if (touched.tds && !tds.trim()) newErrors.tds = "TDS is required";
    if (touched.limit && !limit.trim()) newErrors.limit = "Limit is required";
    if (touched.status && !status) newErrors.status = "Status is required";

    setErrors(newErrors);

    const isValid =
      Object.keys(newErrors).length === 0 &&
      api &&
      provider &&
      apiCode &&
      rate &&
      commOrSurcharge &&
      selectType &&
      gst &&
      tds &&
      limit &&
      status;

    onChange(isValid, {
      api: api?.value || "",
      provider: provider?.value || "",
      apiCode,
      rate,
      commOrSurcharge: commOrSurcharge?.value || "",
      selectType: selectType?.value || "",
      gst,
      tds,
      limit,
      status: status?.value || "",
    });
  }, [
    api,
    provider,
    apiCode,
    rate,
    commOrSurcharge,
    selectType,
    gst,
    tds,
    limit,
    status,
    touched,
  ]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="row g-3">
      <Col md={6}>
        <Label>Select API</Label>
        <Select
          value={api}
          onChange={(e) => setApi(e)}
          onBlur={() => handleBlur("api")}
          options={[{ value: "cashfree", label: "Cashfree" }]}
          placeholder="Select API"
        />
        {errors.api && <div className="text-danger mt-1">{errors.api}</div>}
      </Col>

      <Col md={6}>
        <Label>Select Provider</Label>
        <Select
          value={provider}
          onChange={(e) => setProvider(e)}
          onBlur={() => handleBlur("provider")}
          options={[{ value: "Rental", label: "Rental" }]}
          placeholder="Select Provider"
        />
        {errors.provider && (
          <div className="text-danger mt-1">{errors.provider}</div>
        )}
      </Col>

      <Col md={6}>
        <Label>API Code</Label>
        <Input
          type="text"
          value={apiCode}
          onChange={(e) => setApiCode(e.target.value)}
          onBlur={() => handleBlur("apiCode")}
          placeholder="Enter API Code"
          invalid={!!errors.apiCode}
        />
        <FormFeedback>{errors.apiCode}</FormFeedback>
      </Col>

      <Col md={6}>
        <Label>Rate</Label>
        <Input
          type="text"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          onBlur={() => handleBlur("rate")}
          placeholder="Enter Rate"
          invalid={!!errors.rate}
        />
        <FormFeedback>{errors.rate}</FormFeedback>
      </Col>

      <Col md={6}>
        <Label>Commission OR Surcharge</Label>
        <Select
          value={commOrSurcharge}
          onChange={(e) => setCommOrSurcharge(e)}
          onBlur={() => handleBlur("commOrSurcharge")}
          options={typeOptions}
          placeholder="Select Type"
        />
        {errors.commOrSurcharge && (
          <div className="text-danger mt-1">{errors.commOrSurcharge}</div>
        )}
      </Col>

      <Col md={6}>
        <Label>Select Type</Label>
        <Select
          value={selectType}
          onChange={(e) => setSelectType(e)}
          onBlur={() => handleBlur("selectType")}
          options={typeOptions}
          placeholder="Select Type"
        />
        {errors.selectType && (
          <div className="text-danger mt-1">{errors.selectType}</div>
        )}
      </Col>

      <Col md={6}>
        <Label>GST (%)</Label>
        <Input
          type="number"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          onBlur={() => handleBlur("gst")}
          placeholder="Enter GST"
          invalid={!!errors.gst}
        />
        <FormFeedback>{errors.gst}</FormFeedback>
      </Col>

      <Col md={6}>
        <Label>TDS (%)</Label>
        <Input
          type="number"
          value={tds}
          onChange={(e) => setTds(e.target.value)}
          onBlur={() => handleBlur("tds")}
          placeholder="Enter TDS"
          invalid={!!errors.tds}
        />
        <FormFeedback>{errors.tds}</FormFeedback>
      </Col>

      <Col md={6}>
        <Label>Limit (₹)</Label>
        <Input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          onBlur={() => handleBlur("limit")}
          placeholder="Enter Limit"
          invalid={!!errors.limit}
        />
        <FormFeedback>{errors.limit}</FormFeedback>
      </Col>

      <Col md={6}>
        <Label>Status</Label>
        <Select
          value={status}
          onChange={(e) => setStatus(e)}
          onBlur={() => handleBlur("status")}
          options={statusOptions}
          placeholder="Select Status"
        />
        {errors.status && (
          <div className="text-danger mt-1">{errors.status}</div>
        )}
      </Col>
    </div>
  );
};

export default AddService;