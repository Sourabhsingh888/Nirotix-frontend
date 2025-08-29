
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface BaseModalProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  size?: "sm" | "md" | "lg";
  headerVariant?: "default" | "dark";
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  toggle,
  title,
  onSubmit,
  isSubmitDisabled = false,
  children,
  submitLabel,
  cancelLabel,
  size = "md",
  headerVariant = "default",
}) => {
  const handleCancelClick = () => {
    toggle();
  };

  // Header classes
  const headerClass =
    headerVariant === "darks" ? "custom-modal-header bg-dark" : "bg-white text-dark";

  // Close button class based on variant
  const closeBtnClass = headerVariant === "darks" ? "btn-close btn-close-white" : "btn-close";

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={`modal-dialog-centered modal-${size}`}
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        className={headerClass}
        
        close={
          <button
            type="button"
            className={closeBtnClass}
            aria-label="Close"
            onClick={handleCancelClick}
          />
        }
      >
        <h5 className="modal-title">{title}</h5>
      </ModalHeader>

      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={onSubmit} disabled={isSubmitDisabled}>
          {submitLabel || "Submit"}
        </Button>
        <Button color="secondary" onClick={handleCancelClick}>
          {cancelLabel || "Cancel"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BaseModal;
