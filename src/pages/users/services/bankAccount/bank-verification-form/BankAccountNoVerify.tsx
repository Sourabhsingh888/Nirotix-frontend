import React, { useEffect, useState } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface BankAccountVerifyFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const BankAccountNoVerify: React.FC<BankAccountVerifyFormProps> = ({
  onChange,
}) => {
  const [accountNo, setAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountTouched, setAccountTouched] = useState(false);
  const [ifscTouched, setIfscTouched] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [ifscError, setIfscError] = useState("");

  // Validate account number
  useEffect(() => {
    if (accountTouched) {
      if (!accountNo) {
        setAccountError("Account number is required");
      } else if (!/^[0-9]+$/.test(accountNo)) {
        setAccountError("Account number must be numeric");
      } else if (accountNo.length < 7 || accountNo.length > 18) {
        setAccountError("Account number must be 7 to 18 digits");
      } else {
        setAccountError("");
      }
    }
  }, [accountNo, accountTouched]);

  // Validate IFSC
  useEffect(() => {
    if (ifscTouched) {
      if (!ifscCode) {
        setIfscError("IFSC code is required");
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        setIfscError("Invalid IFSC code format (e.g. SBIN0001234)");
      } else {
        setIfscError("");
      }
    }
  }, [ifscCode, ifscTouched]);

  // Notify parent
  useEffect(() => {
    const isValid =
      /^[0-9]{7,18}$/.test(accountNo) &&
      /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode);
    onChange(isValid, { accountNo, ifscCode });
  }, [accountNo, ifscCode, onChange]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    setAccountNo(value);
  };

  const handleIFSCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setIfscCode(value.slice(0, 11));
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="accountNo" className="form-label">
            Account Number
          </Label>
          <Input
            type="text"
            id="accountNo"
            placeholder="Enter Account Number"
            autoComplete="off"
            inputMode="numeric"
            maxLength={18}
            value={accountNo}
            onChange={handleAccountChange}
            onBlur={() => setAccountTouched(true)}
            invalid={accountTouched && !!accountError}
          />
          {accountTouched && accountError && (
            <FormFeedback>{accountError}</FormFeedback>
          )}
        </div>
      </Col>

      <Col xxl={12}>
        <div>
          <Label htmlFor="ifscCode" className="form-label">
            IFSC Code
          </Label>
          <Input
            type="text"
            id="ifscCode"
            placeholder="Enter IFSC Code (e.g. SBIN0001234)"
            autoComplete="off"
            maxLength={11}
            value={ifscCode}
            onChange={handleIFSCChange}
            onBlur={() => setIfscTouched(true)}
            invalid={ifscTouched && !!ifscError}
          />
          {ifscTouched && ifscError && <FormFeedback>{ifscError}</FormFeedback>}
        </div>
      </Col>
    </div>
  );
};

export default BankAccountNoVerify;

// import React, { useEffect } from "react";
// import { Col, Input, Label, FormFeedback } from "reactstrap";
// import { useForm } from "react-hook-form";

// interface BankAccountVerifyFormProps {
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const BankAccountNoVerify: React.FC<BankAccountVerifyFormProps> = ({
//   onChange,
// }) => {
//   const {
//     register,
//     watch,
//     setValue,
//     formState: { errors, isValid },
//     trigger,
//   } = useForm({
//     mode: "onChange", // validate on change
//     criteriaMode: "all", // show all errors
//     defaultValues: {
//       accountNo: "",
//       ifscCode: "",
//     },
//   });

//   const accountNo = watch("accountNo");
//   const ifscCode = watch("ifscCode");

//   // Send form state to parent
//   useEffect(() => {
//     onChange(isValid, { accountNo, ifscCode });
//   }, [accountNo, ifscCode, isValid]);

//     // Handle numeric input manually
//     const handleAccountNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value.replace(/[^0-9]/g, "");
//       setValue("accountNo", value, { shouldValidate: true });
//     };

//     const handleIFSCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value.toUpperCase();
//       setValue("ifscCode", value, { shouldValidate: true });
//     };

//   // Force IFSC code to uppercase when user types
//   useEffect(() => {
//     const upper = ifscCode?.toUpperCase();
//     if (ifscCode && ifscCode !== upper) {
//       setValue("ifscCode", upper, { shouldValidate: true });
//     }
//   }, [ifscCode, setValue]);

//   return (
//     <div className="row g-3">
//       <Col xxl={12}>
//         <div>
//           <Label htmlFor="accountNo" className="form-label">
//             Account Number
//           </Label>
//           <Input
//             type="text"
//             id="accountNo"
//             placeholder="Enter Account Number"
//             autoComplete="off"
//             inputMode="numeric"
//             maxLength={18}
//             invalid={!!errors.accountNo}
//             {...register("accountNo", {
//               required: "Account number is required",
//               pattern: {
//                 value: /^[0-9]+$/,
//                 message: "Account number must be numeric",
//               },
//               minLength: {
//                 value: 9,
//                 message: "Account number must be at least 9 digits",
//               },
//               maxLength: {
//                 value: 18,
//                 message: "Account number must be at most 18 digits",
//               },
//             })}
//             onChange={handleAccountNoChange}
//             onBlur={() => trigger("accountNo")}
//             onInput={(e: React.FormEvent<HTMLInputElement>) => {
//               e.currentTarget.value = e.currentTarget.value.replace(
//                 /[^0-9]/g,
//                 ""
//               );
//             }}
//           />

//           {errors.accountNo && (
//             <FormFeedback>{errors.accountNo.message}</FormFeedback>
//           )}
//         </div>
//       </Col>

//       <Col xxl={12}>
//         <div>
//           <Label htmlFor="ifscCode" className="form-label">
//             IFSC Code
//           </Label>
//           <Input
//             type="text"
//             id="ifscCode"
//             placeholder="Enter IFSC Code (e.g. SBIN0001234)"
//             autoComplete="off"
//             maxLength={11}
//             invalid={!!errors.ifscCode}
//             {...register("ifscCode", {
//               required: "IFSC code is required",
//               pattern: {
//                 value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
//                 message: "Invalid IFSC code format",
//               },
//             })}
//             onChange={handleIFSCChange}
//             onBlur={() => trigger("ifscCode")}
//           />
//           {errors.ifscCode && (
//             <FormFeedback>{errors.ifscCode.message}</FormFeedback>
//           )}
//         </div>
//       </Col>
//     </div>
//   );
// };

// export default BankAccountNoVerify;
