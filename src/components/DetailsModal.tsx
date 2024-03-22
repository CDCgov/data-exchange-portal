import { Button, Modal, ModalBody, ModalFooter } from "@us-gov-cdc/cdc-react";

interface PropTypes {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

function DetailsModal({ isModalOpen, handleModalClose }: PropTypes) {
  return (
    <Modal
      isOpen={isModalOpen}
      modalTitle="Submission Details"
      onClose={handleModalClose}>
      <ModalBody>MonthlyReport_MD-12345.hl7</ModalBody>
      <ModalFooter>
        <Button
          ariaLabel="close submissions details"
          onClick={handleModalClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default DetailsModal;
