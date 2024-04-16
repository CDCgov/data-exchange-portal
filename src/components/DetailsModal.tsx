import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import {
  Accordion,
  Alert,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalFooter,
  Pill,
  ProgressTracker,
} from "@us-gov-cdc/cdc-react";

import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { IFileSubmission } from "@types";
import getStatusDisplayValuesById, {
  StatusDisplayValues,
} from "src/utils/helperFunctions/statusDisplayValues";
import jsonPrettyPrint from "src/utils/helperFunctions/jsonPrettyPrint";
import getSubmissionDetails from "src/utils/api/submissionDetails";

interface PropTypes {
  submission: IFileSubmission;
  isModalOpen: boolean;
  handleModalClose: () => void;
}

function DetailsModal({
  submission,
  isModalOpen,
  handleModalClose,
}: PropTypes) {
  const displayValues: StatusDisplayValues = getStatusDisplayValuesById(
    submission.status
  );
  const auth = useAuth();
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getSubmissionDetails(
        auth.user?.access_token || "",
        submission.upload_id
      );

      if (res.status != 200) return;

      try {
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, [auth, submission]);

  const getContent = () => {
    if (submission.status == "failed") {
      // TODO: parse file details from useEffect for failed alert data
      return (
        <Alert heading="Failed Metadata" type="error">
          2 Errors were detected
          <p className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
            Missing required metadata field, meta_field1.
          </p>
          <p className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
            Metadata field, meta_field2, is set to value3 and does not contain
            one of the allowed values: [value1, value2]
          </p>
        </Alert>
      );
    }

    if (submission.status == "completed") {
      return <ProgressTracker isComplete />;
    }

    if (submission.status == "processing") {
      // TODO: parse file details for stage, current upload amount, total upload amount, etc. from useEffect
      return (
        <ProgressTracker
          label="Stage: Uploading"
          currentAmount={55}
          totalAmount={256}
        />
      );
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      modalTitle="Submission Details"
      onClose={handleModalClose}>
      <ModalBody>
        <span className="padding-bottom-3">
          {/* TODO: update cdc-react to allow className on <Pill> so we can avoid this extra span */}
          <Pill
            variation="info"
            altText={displayValues.label}
            label={displayValues.label}
            color={displayValues.pillColor}
            icon={displayValues.pillIcon}
          />
        </span>
        <div className="grid-row flex-row flex-align-center padding-bottom-3">
          <Icons.PaperLines />
          <h2 className="font-sans-md text-bold padding-left-1">
            {submission.filename}
          </h2>
        </div>
        {getContent()}
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
          <div className="grid-col-8">{submission.upload_id}</div>
        </div>
        <div className="grid-row margin-top-3">
          {/* TODO: replace with real data from useEffect submissionDetails calls */}
          <Accordion
            items={[
              {
                id: "1",
                title: "Submitted details",
                content: jsonPrettyPrint(details),
              },
            ]}
          />
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
