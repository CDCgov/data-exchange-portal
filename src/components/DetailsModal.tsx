import {
  Alert,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalFooter,
  Pill,
} from "@us-gov-cdc/cdc-react";

interface PropTypes {
  uploadId: string;
  isModalOpen: boolean;
  handleModalClose: () => void;
}

function DetailsModal({ uploadId, isModalOpen, handleModalClose }: PropTypes) {
  console.log(uploadId);
  return (
    <Modal
      isOpen={isModalOpen}
      modalTitle="Submission Details"
      onClose={handleModalClose}>
      <ModalBody>
        <h2 className="font-sans-md text-normal">MonthlyReport_MD-12345.hl7</h2>
        {/* Todo: update cdc-react to allow className on <Pill> so we can avoid this extra span */}
        <span className="padding-top-1 padding-bottom-2">
          <Pill label="FailedMetadata" color="error"></Pill>
        </span>
        <Alert heading="FailedMetadata" type="error">
          2 Errors were detected
          {/* Todo: rework this since the alert body is a <p> and you can't have a <div> nested inside a <p> */}
          <div className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
            Missing required metadata field, 'meta_field1.'
          </div>
          <div className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
            Metadata field, 'meta_field2,' is set to 'value3' and does not
            contain one of the allowed values: ['value1', 'value2']
          </div>
        </Alert>
        <Divider className="margin-y-2" height={4} stroke="#E0E0E0" />
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Uploaded by</strong>
          </div>
          <div className="grid-col-8">
            MarylandStateSender123 Jurisdiction Parter
          </div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Upload date</strong>
          </div>
          <div className="grid-col-8">Tuesday, March 5, 2024 | 3:45 pm</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Upload ID</strong>
          </div>
          <div className="grid-col-8">{uploadId}</div>
        </div>
      </ModalBody>
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
