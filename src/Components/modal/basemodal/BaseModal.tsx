import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface BaseModalProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
  children: React.ReactNode;
  submitLabel?: string; // NEW
  cancelLabel?: string; // NEW
  size?: "sm" | "md" | "lg"; // Bootstrap supported sizes
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
  size,
}) => {
  const handleCancelClick = () => {
    toggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={`modal-dialog-centered modal-${size || "md"}`}
      backdrop="static"
    >
      <ModalHeader toggle={handleCancelClick}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit} disabled={isSubmitDisabled}>
          {submitLabel || "Submit"}
        </Button>
        <Button color="danger" onClick={handleCancelClick}>
          {cancelLabel || "Cancel"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BaseModal;