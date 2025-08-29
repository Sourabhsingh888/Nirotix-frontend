// import React, { useEffect, useState } from "react";
// import { Col, Input, Label, Row, FormFeedback } from "reactstrap";
// import Select from "react-select";

// interface AddMsgApiFormProps {
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const methodOptions = [
//   { label: "GET", value: "GET" },
//   { label: "POST", value: "POST" },
// ];

// const typeOptions = [
//   { label: "SMS", value: "sms" },
//   { label: "Whatsapp", value: "whatsapp" },
// ];

// const AddMsgApi: React.FC<AddMsgApiFormProps> = ({ onChange }) => {
//   const [apiName, setApiName] = useState("");
//   const [apiType, setApiType] = useState<any>(null);
//   const [baseUrl, setBaseUrl] = useState("");
//   const [apiParams, setApiParams] = useState("");
//   const [apiMethod, setApiMethod] = useState<any>(null);
//   const [status, setStatus] = useState("active");

//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const newErrors: Record<string, string> = {};
//     if (touched.apiName && !apiName.trim())
//       newErrors.apiName = "API Name is required";
//     if (touched.apiType && !apiType) newErrors.apiType = "API Type is required";
//     if (touched.baseUrl && !baseUrl.trim())
//       newErrors.baseUrl = "Base URL is required";
//     if (touched.apiParams && !apiParams.trim())
//       newErrors.apiParams = "API Params are required";
//     if (touched.apiMethod && !apiMethod)
//       newErrors.apiMethod = "API Method is required";
//     setErrors(newErrors);

//     const isValid =
//       apiName.trim() !== "" &&
//       baseUrl.trim() !== "" &&
//       apiParams.trim() !== "" &&
//       apiType !== null &&
//       apiMethod !== null &&
//       status !== "";

//     const formData = {
//       apiName,
//       apiType: apiType?.value || "",
//       baseUrl,
//       apiParams,
//       apiMethod: apiMethod?.value || "",
//       status,
//     };

//     onChange(isValid && Object.keys(newErrors).length === 0, formData);
//   }, [apiName, apiType, baseUrl, apiParams, apiMethod, status, touched]);

//   const handleBlur = (field: string) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//   };


  

//   return (
//     <Row className="g-3">
//       <Col md={12}>
//         <Label className="form-label">Api Name</Label>
//         <Input
//           type="text"
//           placeholder="Enter Api name"
//           value={apiName}
//           onChange={(e) => setApiName(e.target.value)}
//           onBlur={() => handleBlur("apiName")}
//           invalid={!!errors.apiName}
//         />
//         <FormFeedback>{errors.apiName}</FormFeedback>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Type</Label>
//         <Select
//           options={typeOptions}
//           value={apiType}
//           onChange={(val) => setApiType(val)}
//           onBlur={() => handleBlur("apiType")}
//           placeholder="Select Api Type"
//         />
//         {errors.apiType && (
//           <div className="text-danger mt-1">{errors.apiType}</div>
//         )}
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Base Url</Label>
//         <Input
//           type="text"
//           placeholder="Paste Base Url"
//           value={baseUrl}
//           onChange={(e) => setBaseUrl(e.target.value)}
//           onBlur={() => handleBlur("baseUrl")}
//           invalid={!!errors.baseUrl}
//         />
//         <FormFeedback>{errors.baseUrl}</FormFeedback>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Params</Label>
//         <Input
//           type="textarea"
//           rows="3"
//           placeholder="Paste Api Params"
//           value={apiParams}
//           onChange={(e) => setApiParams(e.target.value)}
//           onBlur={() => handleBlur("apiParams")}
//           invalid={!!errors.apiParams}
//         />
//         <FormFeedback>{errors.apiParams}</FormFeedback>
//         <span className="text-pink mt-1 d-block">
//           [NUMBER], [MESSAGE], [TEMP_ID]
//         </span>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Method</Label>
//         <Select
//           options={methodOptions}
//           value={apiMethod}
//           onChange={(val) => setApiMethod(val)}
//           onBlur={() => handleBlur("apiMethod")}
//           placeholder="Select Method"
//         />
//         {errors.apiMethod && (
//           <div className="text-danger mt-1">{errors.apiMethod}</div>
//         )}
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Status</Label>
//         <div className="d-flex gap-4 mt-1">
//           <div className="form-check form-check-inline form-radio-success">
//             <Input
//               type="radio"
//               id="active"
//               name="status"
//               className="form-check-input"
//               checked={status === "active"}
//               onChange={() => setStatus("active")}
//             />
//             <Label htmlFor="active" className="form-check-label">
//               Active
//             </Label>
//           </div>

//           <div className="form-check form-check-inline form-radio-danger">
//             <Input
//               type="radio"
//               id="inactive"
//               name="status"
//               className="form-check-input"
//               checked={status === "inactive"}
//               onChange={() => setStatus("inactive")}
//             />
//             <Label htmlFor="inactive" className="form-check-label">
//               Inactive
//             </Label>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default AddMsgApi;





// import React, { useEffect, useState } from "react";
// import { Col, Input, Label, Row, FormFeedback } from "reactstrap";
// import Select from "react-select";

// interface AddMsgApiFormProps {
//   initialData?: {
//     apiName: string;
//     apiType: any;
//     baseUrl: string;
//     apiParams: string;
//     apiMethod: any;
//     status: string;
//   };
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const methodOptions = [
//   { label: "GET", value: "GET" },
//   { label: "POST", value: "POST" },
// ];

// const typeOptions = [
//   { label: "SMS", value: "SMS" },
//   { label: "Whatsapp", value: "Whatsapp" },
// ];

// const AddMsgApi: React.FC<AddMsgApiFormProps> = ({ initialData, onChange }) => {
//   const [apiName, setApiName] = useState(initialData?.apiName || "");
//   const [apiType, setApiType] = useState<any>(initialData?.apiType || null);
//   const [baseUrl, setBaseUrl] = useState(initialData?.baseUrl || "");
//   const [apiParams, setApiParams] = useState(initialData?.apiParams || "");
//   const [apiMethod, setApiMethod] = useState<any>(initialData?.apiMethod || null);
//   const [status, setStatus] = useState(initialData?.status || "active");

//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Sync parent updates (for edit mode)
//   useEffect(() => {
//     if (initialData) {
//       setApiName(initialData.apiName || "");
//       setApiType(initialData.apiType || null);
//       setBaseUrl(initialData.baseUrl || "");
//       setApiParams(initialData.apiParams || "");
//       setApiMethod(initialData.apiMethod || null);
//       setStatus(initialData.status || "active");
//     }
//   }, [initialData]);

//   // Validation & parent onChange callback
//   useEffect(() => {
//     const newErrors: Record<string, string> = {};
//     if (touched.apiName && !apiName.trim()) newErrors.apiName = "API Name is required";
//     if (touched.apiType && !apiType) newErrors.apiType = "API Type is required";
//     if (touched.baseUrl && !baseUrl.trim()) newErrors.baseUrl = "Base URL is required";
//     if (touched.apiParams && !apiParams.trim()) newErrors.apiParams = "API Params are required";
//     if (touched.apiMethod && !apiMethod) newErrors.apiMethod = "API Method is required";

//     setErrors(newErrors);

//     const isValid =
//       apiName.trim() !== "" &&
//       baseUrl.trim() !== "" &&
//       apiParams.trim() !== "" &&
//       apiType !== null &&
//       apiMethod !== null &&
//       status !== "";

//     const formData = {
//       api_name: apiName,
//       api_type: apiType?.value || "",
//       base_url: baseUrl,
//       params: apiParams,
//       method: apiMethod?.value || "",
//       status,
//     };

//     onChange(isValid && Object.keys(newErrors).length === 0, formData);
//   }, [apiName, apiType, baseUrl, apiParams, apiMethod, status, touched]);

//   const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

//   return (
//     <Row className="g-3">
//       <Col md={12}>
//         <Label className="form-label">Api Name</Label>
//         <Input
//           type="text"
//           placeholder="Enter Api name"
//           value={apiName}
//           onChange={(e) => setApiName(e.target.value)}
//           onBlur={() => handleBlur("apiName")}
//           invalid={!!errors.apiName}
//         />
//         <FormFeedback>{errors.apiName}</FormFeedback>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Type</Label>
//         <Select
//           options={typeOptions}
//           value={apiType}
//           onChange={(val) => setApiType(val)}
//           onBlur={() => handleBlur("apiType")}
//           placeholder="Select Api Type"
//         />
//         {errors.apiType && <div className="text-danger mt-1">{errors.apiType}</div>}
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Base Url</Label>
//         <Input
//           type="text"
//           placeholder="Paste Base Url"
//           value={baseUrl}
//           onChange={(e) => setBaseUrl(e.target.value)}
//           onBlur={() => handleBlur("baseUrl")}
//           invalid={!!errors.baseUrl}
//         />
//         <FormFeedback>{errors.baseUrl}</FormFeedback>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Params</Label>
//         <Input
//           type="textarea"
//           rows={3}
//           placeholder="Paste Api Params"
//           value={apiParams}
//           onChange={(e) => setApiParams(e.target.value)}
//           onBlur={() => handleBlur("apiParams")}
//           invalid={!!errors.apiParams}
//         />
//         <FormFeedback>{errors.apiParams}</FormFeedback>
//         <span className="text-pink mt-1 d-block">[NUMBER], [MESSAGE], [TEMP_ID]</span>
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Api Method</Label>
//         <Select
//           options={methodOptions}
//           value={apiMethod}
//           onChange={(val) => setApiMethod(val)}
//           onBlur={() => handleBlur("apiMethod")}
//           placeholder="Select Method"
//         />
//         {errors.apiMethod && <div className="text-danger mt-1">{errors.apiMethod}</div>}
//       </Col>

//       <Col md={12}>
//         <Label className="form-label">Status</Label>
//         <div className="d-flex gap-4 mt-1">
//           <div className="form-check form-check-inline form-radio-success">
//             <Input
//               type="radio"
//               id="active"
//               name="status"
//               className="form-check-input"
//               checked={status === "active"}
//               onChange={() => setStatus("active")}
//             />
//             <Label htmlFor="active" className="form-check-label">Active</Label>
//           </div>

//           <div className="form-check form-check-inline form-radio-danger">
//             <Input
//               type="radio"
//               id="inactive"
//               name="status"
//               className="form-check-input"
//               checked={status === "inactive"}
//               onChange={() => setStatus("inactive")}
//             />
//             <Label htmlFor="inactive" className="form-check-label">Inactive</Label>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default AddMsgApi;







import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, FormFeedback } from "reactstrap";
import Select from "react-select";

interface AddMsgApiFormProps {
  initialData?: any; // Prefill data from parent
  onChange: (field: string, value: any) => void;
}

const methodOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
];

const typeOptions = [
  { label: "SMS", value: "SMS" },
  { label: "Whatsapp", value: "Whatsapp" },
];

const AddMsgApi: React.FC<AddMsgApiFormProps> = ({ initialData, onChange }) => {
  const [apiName, setApiName] = useState("");
  const [apiType, setApiType] = useState<any>(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiParams, setApiParams] = useState("");
  const [apiMethod, setApiMethod] = useState<any>(null);
  const [status, setStatus] = useState("active");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize local state from initialData once
  useEffect(() => {
    if (initialData) {
      setApiName(initialData.api_name || "");
      setApiType(
        initialData.api_type
          ? typeOptions.find((opt) => opt.value === initialData.api_type)
          : null
      );
      setBaseUrl(initialData.base_url || "");
      setApiParams(initialData.params || "");
      setApiMethod(
        initialData.method
          ? methodOptions.find((opt) => opt.value === initialData.method)
          : null
      );
      setStatus(initialData.status || "active");
    }
  }, [initialData]);

  // Validation only (no parent notification)
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (touched.apiName && !apiName.trim()) newErrors.apiName = "API Name is required";
    if (touched.apiType && !apiType) newErrors.apiType = "API Type is required";
    if (touched.baseUrl && !baseUrl.trim()) newErrors.baseUrl = "Base URL is required";
    if (touched.apiParams && !apiParams.trim()) newErrors.apiParams = "API Params are required";
    if (touched.apiMethod && !apiMethod) newErrors.apiMethod = "API Method is required";
    setErrors(newErrors);
  }, [apiName, apiType, baseUrl, apiParams, apiMethod, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Row className="g-3">
      <Col md={12}>
        <Label className="form-label">API Name</Label>
        <Input
          type="text"
          placeholder="Enter API name"
          value={apiName}
          onChange={(e) => {
            setApiName(e.target.value);
            onChange("api_name", e.target.value);
          }}
          onBlur={() => handleBlur("apiName")}
          invalid={!!errors.apiName}
        />
        <FormFeedback>{errors.apiName}</FormFeedback>
      </Col>

      <Col md={12}>
        <Label className="form-label">API Type</Label>
        <Select
          options={typeOptions}
          value={apiType}
          onChange={(val) => {
            setApiType(val);
            onChange("api_type", val?.value || "");
          }}
          onBlur={() => handleBlur("apiType")}
          placeholder="Select API Type"
        />
        {errors.apiType && <div className="text-danger mt-1">{errors.apiType}</div>}
      </Col>

      <Col md={12}>
        <Label className="form-label">Base URL</Label>
        <Input
          type="text"
          placeholder="Paste Base URL"
          value={baseUrl}
          onChange={(e) => {
            setBaseUrl(e.target.value);
            onChange("base_url", e.target.value);
          }}
          onBlur={() => handleBlur("baseUrl")}
          invalid={!!errors.baseUrl}
        />
        <FormFeedback>{errors.baseUrl}</FormFeedback>
      </Col>

      <Col md={12}>
        <Label className="form-label">API Params</Label>
        <Input
          type="textarea"
          rows={3}
          placeholder="Paste API Params"
          value={apiParams}
          onChange={(e) => {
            setApiParams(e.target.value);
            onChange("params", e.target.value);
          }}
          onBlur={() => handleBlur("apiParams")}
          invalid={!!errors.apiParams}
        />
        <FormFeedback>{errors.apiParams}</FormFeedback>
        <span className="text-pink mt-1 d-block">[NUMBER], [MESSAGE], [TEMP_ID]</span>
      </Col>

      <Col md={12}>
        <Label className="form-label">API Method</Label>
        <Select
          options={methodOptions}
          value={apiMethod}
          onChange={(val) => {
            setApiMethod(val);
            onChange("method", val?.value || "");
          }}
          onBlur={() => handleBlur("apiMethod")}
          placeholder="Select Method"
        />
        {errors.apiMethod && <div className="text-danger mt-1">{errors.apiMethod}</div>}
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
              onChange={() => {
                setStatus("active");
                onChange("status", "active");
              }}
            />
            <Label htmlFor="active" className="form-check-label">Active</Label>
          </div>
          <div className="form-check form-check-inline form-radio-danger">
            <Input
              type="radio"
              id="inactive"
              name="status"
              className="form-check-input"
              checked={status === "inactive"}
              onChange={() => {
                setStatus("inactive");
                onChange("status", "inactive");
              }}
            />
            <Label htmlFor="inactive" className="form-check-label">Inactive</Label>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AddMsgApi;
