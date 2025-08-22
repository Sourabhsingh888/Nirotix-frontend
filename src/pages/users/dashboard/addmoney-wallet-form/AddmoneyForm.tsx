// import React, { useState, useEffect } from "react";
// import { Col, Input, Label, FormFeedback } from "reactstrap";

// interface AddmoneyFormProps {
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const AddmoneyForm: React.FC<AddmoneyFormProps> = ({ onChange }) => {
//   const [addmoney, setAddmoney] = useState<number | "">("");
//   const [touched, setTouched] = useState(false);
//   const [error, setError] = useState<string | null>(null);

// const gstRate = 0.18;
// const gstAmount = typeof 


//   useEffect(() => {
//     const isValid = addmoney !== "" && Number(addmoney) > 0;

//     setError(() => {
//       if (!touched) return null;
//       if (addmoney === "") return "Amount is required";
//       if (Number(addmoney) <= 0) return "Amount must be greater than 0";
//       return null;
//     });

//     onChange(isValid, { addmoney });
//   }, [addmoney, touched]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setAddmoney(value === "" ? "" : Number(value));
//     }
//   };

//   return (
//     <div className="row g-3">
//       <Col xxl={12}>
//         <div>
//           <Label htmlFor="addMoneyAmount" className="form-label">
//             Add Money
//           </Label>
//           <Input
//             type="number"
//             id="addMoneyAmount"
//             value={addmoney}
//             onChange={handleChange}
//             onBlur={() => setTouched(true)}
//             placeholder="Enter amount"
//             autoComplete="off"
//             min={1}
//             invalid={!!error}
//           />
//           {error && <FormFeedback>{error}</FormFeedback>}
//         </div>
//       </Col>
//     </div>
//   );
// };

// export default AddmoneyForm;


import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";

interface AddmoneyFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AddmoneyForm: React.FC<AddmoneyFormProps> = ({ onChange }) => {
  const [addmoney, setAddmoney] = useState<number | "">("");
  console.log(addmoney);
  
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gstRate = 0.18;
  const gstAmount = typeof addmoney === "number" ? addmoney * gstRate : 0;
  const totalPayable = typeof addmoney === "number" ? addmoney + gstAmount : 0;

  useEffect(() => {
    const isValid = addmoney !== "" && addmoney >= 100;

    setError(() => {
      if (!touched) return null;
      if (addmoney === "") return "Amount is required";
      if (addmoney < 100) return "Minimum amount is ₹100";
      return null;
    });

    onChange(isValid, {
      addmoney,
      gst: gstAmount,
      totalPayable,
    });
  }, [addmoney, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAddmoney(value === "" ? "" : Number(value));
    }
  };

  return (
    <div className="row g-3">
      <Col xxl={12}>
        <div>
          <Label htmlFor="addMoneyAmount" className="form-label">
            Add Money
          </Label>
          <Input
            type="number"
            id="addMoneyAmount"
            value={addmoney}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            placeholder="Enter amount (min ₹100)"
            autoComplete="off"
            min={100}
            invalid={!!error}
          />
          {error && <FormFeedback>{error}</FormFeedback>}
        </div>
      </Col>

      {/* GST and Total Payable Display */}
      {addmoney !== "" && addmoney >= 100 && (
        <>
          <Col xxl={12}>
            <div className="fw-semibold">
              GST (18%): ₹{gstAmount.toFixed(2)}
            </div>
          </Col>
          <Col xxl={12}>
            <div className="fw-bold text-primary">
              Total Payable: ₹{totalPayable.toFixed(2)}
            </div>
          </Col>
        </>
      )}
    </div>
  );
};

export default AddmoneyForm;
