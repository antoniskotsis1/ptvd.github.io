import React from "react";
import { Modal } from "react-bootstrap";

export const OptionsModal: React.FunctionComponent<OptionsModalProps> = (
  props
) => {
  const { modalTitle, modalBody, showModal, handleClose } = props;

  const renderYearsRangeSelection = () => {
    return <div>Select a range of Years</div>;
  };
  const renderAggragattedResultsSelection = () => {
    return <div>Aggragate results?</div>;
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderYearsRangeSelection()}
        {renderAggragattedResultsSelection()}
      </Modal.Body>
      <Modal.Footer>{modalBody}</Modal.Footer>
    </Modal>
  );
};

interface OptionsModalProps {
  modalTitle: string;
  modalBody: string;
  showModal: boolean;
  handleClose: () => void;
}
