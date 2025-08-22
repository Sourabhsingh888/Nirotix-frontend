// import React, { useState, useEffect } from "react";
// import { Col, Input, Label, FormFeedback } from "reactstrap";

// interface PanVerifyFormProps {
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const PanNoVerify: React.FC<PanVerifyFormProps> = ({ onChange }) => {
//   const [panNo, setPanNo] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
//     const isValid = panFormat.test(panNo);

//     setError(
//       panNo.length === 10 && !isValid
//         ? "Invalid PAN format. Format should be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
//         : ""
//     );

//     onChange(isValid, { panNo });
//   }, [panNo, onChange]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let input = e.target.value.toUpperCase();

//     // Allow only A-Z and 0-9
//     input = input.replace(/[^A-Z0-9]/g, "");

//     // Enforce structure while typing
//     if (input.length <= 10) {
//       const isPartialValid = (() => {
//         if (input.length <= 5) return /^[A-Z]*$/.test(input); // First 5: A-Z
//         if (input.length <= 9) return /^[A-Z]{5}[0-9]*$/.test(input); // Next 4: 0-9
//         if (input.length === 10) return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(input); // Last: A-Z
//         return false;
//       })();

//       if (isPartialValid) {
//         setPanNo(input);
//       }
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     const pasted = e.clipboardData.getData("text").toUpperCase();
//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pasted)) {
//       e.preventDefault();
//       setError("Pasted PAN is invalid format (ABCDE1234F)");
//     }
//   };

//   return (
//     <div className="row g-3">
//       <Col xxl={12}>
//         <div>
//           <Label htmlFor="panNumber" className="form-label">
//             PAN Number
//           </Label>
//           <Input
//             type="text"
//             id="panNumber"
//             value={panNo}
//             onChange={handleChange}
//             onPaste={handlePaste}
//             placeholder="Enter 10-character PAN Number"
//             autoComplete="off"
//             maxLength={10}
//             invalid={!!error}
//           />
//           {error && <FormFeedback>{error}</FormFeedback>}
//         </div>
//       </Col>
//     </div>
//   );
// };

// export default PanNoVerify;



import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface PanVerifyFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const PanNoVerify: React.FC<PanVerifyFormProps> = ({ onChange }) => {
  const [panNo, setPanNo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false); // 👈 for blur

  useEffect(() => {
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const isValid = panFormat.test(panNo);

    if (panNo.length === 10 && !isValid) {
      setError(
        "Invalid PAN format. Format should be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
      );
    } else if (touched && panNo.length === 0) {
      setError("Please enter your PAN number"); // 👈 empty after blur
    } else {
      setError("");
    }

    onChange(isValid, { panNo });
  }, [panNo, touched, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase();
    input = input.replace(/[^A-Z0-9]/g, "");

    if (input.length <= 10) {
      const isPartialValid = (() => {
        if (input.length <= 5) return /^[A-Z]*$/.test(input);
        if (input.length <= 9) return /^[A-Z]{5}[0-9]*$/.test(input);
        if (input.length === 10) return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(input);
        return false;
      })();

      if (isPartialValid) {
        setPanNo(input);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").toUpperCase();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pasted)) {
      e.preventDefault();
      setError("Pasted PAN is invalid format (ABCDE1234F)");
    }
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="panNumber" className="form-label">
            PAN Number
          </Label>
          <Input
            type="text"
            id="panNumber"
            value={panNo}
            onChange={handleChange}
            onPaste={handlePaste}
            onBlur={handleBlur} // 👈 triggers touched
            placeholder="Enter 10-character PAN Number"
            autoComplete="off"
            maxLength={10}
            invalid={!!error}
          />
          {error && <FormFeedback>{error}</FormFeedback>}
        </div>
      </Col>
    </div>
  );
};

export default PanNoVerify;
