import React, { useState, useRef, useEffect } from "react";
import BaseModal from "../../basemodal/BaseModal";  // your new base modal
import OtpModalForm from "../../../../pages/users/account/developerAPI/addIP_modalform/OtpModalForm";

interface OtpModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, toggle }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>(new Array(6).fill(null));

  // Reset OTP and timer on open
  useEffect(() => {
    if (!isOpen) return;

    setOtp(Array(6).fill(""));
    setTimer(30);
    setTimeout(() => inputsRef.current[0]?.focus(), 0);

    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

const handleChange = (val: string, idx: number) => {
  if (val && !/^\d$/.test(val)) return; // only single digit allowed

  const newOtp = [...otp];

  if (val) {
    // Agar koi value dal raha hai
    newOtp[idx] = val;

    // Beech me change kare -> uske aage sab clear
    for (let i = idx + 1; i < newOtp.length; i++) {
      newOtp[i] = "";
    }

    setOtp(newOtp);

    // Next input enable + focus
    if (idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.removeAttribute("disabled");
      inputsRef.current[idx + 1]?.focus();
    }
  } else {
    // Agar input clear kar raha hai
    newOtp[idx] = "";

    // Uske aage ke sab bhi clear
    for (let i = idx + 1; i < newOtp.length; i++) {
      newOtp[i] = "";
    }

    setOtp(newOtp);
  }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
  if (e.key === "Backspace") {
    e.preventDefault();
    const newOtp = [...otp];

    if (otp[idx]) {
      // Current clear + aage ke sab bhi clear
      newOtp[idx] = "";
      for (let i = idx + 1; i < newOtp.length; i++) {
        newOtp[i] = "";
      }
      setOtp(newOtp);
    } else if (idx > 0) {
      // Agar already empty hai to previous me jaye
      inputsRef.current[idx - 1]?.focus();
      newOtp[idx - 1] = "";
      for (let i = idx; i < newOtp.length; i++) {
        newOtp[i] = "";
      }
      setOtp(newOtp);
    }
  }
};


  const handleSubmit = () => {
    if (otp.some((d) => d === "")) {
      alert("Please enter complete OTP");
      return;
    }
    alert("OTP Verified: " + otp.join(""));
    toggle();
  };

  const handleResend = () => {
    alert("OTP resent to your mobile!");
    setOtp(Array(6).fill(""));
    setTimer(30);
    inputsRef.current[0]?.focus();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      title="Authenticate"
      onSubmit={handleSubmit}
      isSubmitDisabled={otp.some((d) => d === "")}
      submitLabel="Verify"
      cancelLabel="Cancel"
      size="md"
        headerVariant="darks"

      
    >
      <OtpModalForm
        otp={otp}
        timer={timer}
        inputsRef={inputsRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onResend={handleResend}
      />
    </BaseModal>
  );
};

export default OtpModal;
