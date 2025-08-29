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
            placeholder="(e.g., 192.168.0.1)"
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



































// import React, { useState, useEffect } from "react";
// import { Col, Input, Label, FormFeedback, Button, Spinner } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";

// import { AppDispatch, RootState } from "../../../../../Store"; 
// import { addWhitelistedIpApi, getWhitelistedIpApi } from "../../../../../slices/whitelistSlice/thunk";
// import { resetAddState } from "../../../../../slices/whitelistSlice/reducer";

// interface AddIPAddressFormProps {
//   onSuccess?: () => void; // callback when success
// }

// const AddIPAddress: React.FC<AddIPAddressFormProps> = ({ onSuccess }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { addState } = useSelector((state: RootState) => state.WhitelistApi);

//   const [ipno, setIpno] = useState<string>("");
//   const [touched, setTouched] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const ipRegex =
//     /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

//   // Handle API success/error silently
//   useEffect(() => {
//     if (addState.success) {
//       dispatch(getWhitelistedIpApi());
//       dispatch(resetAddState());
//       setIpno(""); // clear input
//       if (onSuccess) onSuccess();
//     }
//   }, [addState.success]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIpno(e.target.value);
//   };

//   const handleBlur = () => {
//     setTouched(true);
//   };

//   const handleSubmit = () => {
//     const isValid = ipRegex.test(ipno);
//     if (!ipno) {
//       setError("IP address is required");
//       return;
//     }
//     if (!isValid) {
//       setError("Invalid IP address format");
//       return;
//     }
//     setError(null);

//     // API call
//     dispatch(addWhitelistedIpApi({ ip_address: ipno }));
//   };

//   return (
//     <div className="row g-3">
//       <Col xxl={12}>
//         <div>
//           <Label htmlFor="ipAddress" className="form-label">
//             Enter IP Address
//           </Label>
//           <Input
//             type="text"
//             id="ipAddress"
//             value={ipno}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="Enter IPv4 Address (e.g., 192.168.0.1)"
//             autoComplete="off"
//             inputMode="numeric"
//             invalid={touched && !!error}
//           />
//           {touched && error && <FormFeedback>{error}</FormFeedback>}
//           {/* Optionally show API error below input */}
//           {addState.error && <FormFeedback className="d-block">{addState.error}</FormFeedback>}
//         </div>
//       </Col>
//       <Col xxl={12} className="mt-3">
//         <Button color="primary" onClick={handleSubmit} disabled={addState.loading}>
//           {addState.loading ? <Spinner size="sm" /> : "Add IP"}
//         </Button>
//       </Col>
//     </div>
//   );
// };

// export default AddIPAddress;
