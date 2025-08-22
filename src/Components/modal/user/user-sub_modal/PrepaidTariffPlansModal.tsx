import React, { useState } from "react";
import BaseModal from "../../basemodal/BaseModal";
import PrepaidTariffPlansForm from "../../../../pages/users/services/telecomIntelligence/prepaid-tariff-plan-form/PrepaidTariffPlans";
import { toast} from "react-toastify";

interface PrepaidTariffPlansModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (formData: any) => void;
}

const PrepaidTariffPlansModal: React.FC<PrepaidTariffPlansModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleChange = (valid: boolean, data: any) => {
    setIsValid(valid);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    toast.success("Tariff Plan Requested Successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    toggle();
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title="Prepaid Tariff Plans"
        submitLabel="Verify"
        cancelLabel="Cancel"
        size="md"
        isSubmitDisabled={!isValid}
        onSubmit={handleSubmit}
      >
        <PrepaidTariffPlansForm onChange={handleChange} />
      </BaseModal>
    </>
  );
};

export default PrepaidTariffPlansModal;
