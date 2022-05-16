import React from "react";
import { Modal } from "react-bootstrap";

export const InfoModal: React.FunctionComponent<InfoModalProps> = (props) => {
  const { modalTitle, modalBody, showModal, handleClose } = props;

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
    </Modal>
  );
};

interface InfoModalProps {
  modalTitle: string;
  modalBody: string;
  showModal: boolean;
  handleClose: () => void;
}
