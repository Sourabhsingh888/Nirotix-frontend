import React from "react";
import { Row, Col, Input } from "reactstrap";

interface OtpModalFormProps {
  otp: string[];
  timer: number;
  inputsRef: React.MutableRefObject<Array<HTMLInputElement | null>>;
  onChange: (val: string, idx: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void;
  onResend: () => void;
}

const OtpModalForm: React.FC<OtpModalFormProps> = ({
  otp,
  timer,
  inputsRef,
  onChange,
  onKeyDown,
  onResend,
}) => {
  const handleChange = (val: string, idx: number) => {
    if (!/^\d$/.test(val)) return; // sirf ek digit allow

    const newOtp = [...otp];

    // agar beech ka OTP change kare -> uske baad sab clear
    newOtp[idx] = val;
    for (let i = idx + 1; i < newOtp.length; i++) {
      newOtp[i] = "";
    }

    onChange(val, idx);

    // next input enable + focus
    if (idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.removeAttribute("disabled");
      inputsRef.current[idx + 1]?.focus();
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "10px auto" }}>
      <p style={{ marginBottom: "0.7rem", fontSize: "0.85rem" }}>
        Enter the 6-digit OTP sent to your mobile{" "}
        <span style={{ fontWeight: 600 }}>97*****683</span>
      </p>

      <label
        style={{
          fontWeight: 500,
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
          display: "block",
        }}
      >
        Enter OTP
      </label>

      <Row className="g-3 mb-3">
        {otp.map((num, idx) => (
          <Col key={idx}>
            <Input
              type="text"
              value={num}
              maxLength={1}
              disabled={idx > 0 && otp[idx - 1] === ""} // sirf agla tab enable jab pehle filled ho
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              innerRef={(el) => (inputsRef.current[idx] = el)}
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
                padding: "0.6rem",
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </Col>
        ))}
      </Row>

      {/* Timer / Resend */}
      {timer > 0 ? (
        <p style={{ fontSize: 12, color: "#6c757d" }}>
          Resend OTP after 0:{timer.toString().padStart(2, "0")}
        </p>
      ) : (
        <p
          style={{
            fontSize: 12,
            color: "#7E3AF2",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={onResend}
        >
          Resend OTP
        </p>
      )}

      <p style={{ fontSize: 12, color: "#7E3AF2" }}>Need help?</p>
    </div>
  );
};

export default OtpModalForm;
