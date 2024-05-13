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
import { format, parseISO } from "date-fns";

import { Icons } from "@us-gov-cdc/cdc-react-icons";
import getStatusDisplayValuesById, {
  StatusDisplayValues,
} from "src/utils/helperFunctions/statusDisplayValues";
import jsonPrettyPrint from "src/utils/helperFunctions/jsonPrettyPrint";
import getSubmissionDetails, {
  SubmissionDetails,
} from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";

interface PropTypes {
  submission: FileSubmission;
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
  const [details, setDetails] = useState<SubmissionDetails>({
    info: {
      status: submission.status,
      stage_name: "",
      file_name: submission.filename,
      file_size_bytes: 0,
      bytes_uploaded: 0,
      upload_id: submission.upload_id,
      uploaded_by: "",
      timestamp: submission.timestamp,
      data_stream_id: submission.data_stream_id,
      data_stream_route: submission.data_stream_route,
    },
    issues: [],
    reports: [],
  });

  const formatDate = (date?: string) => {
    if (!date) return "";
    return format(parseISO(date), "EEEE, MMMM d, yyyy ' | ' h:mm a");
  };

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getSubmissionDetails(
        auth.user?.access_token || "",
        submission.upload_id
      );

      if (res.status != 200) return;

      try {
        const data = (await res.json()) as SubmissionDetails;
        console.log(data);
        setDetails(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    if (isModalOpen) {
      fetchCall();
    }
  }, [auth, submission, isModalOpen]);

  const getContent = () => {
    if (submission.status == "failed") {
      return (
        <Alert heading="Failed" type="error">
          {details.issues.length} Error(s) were detected
          {details.issues.map((issue: string) => (
            <p
              key={issue}
              className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
              {issue}
            </p>
          ))}
        </Alert>
      );
    }

    if (submission.status == "completed") {
      return <ProgressTracker isComplete />;
    }

    if (submission.status == "processing") {
      const total = Math.floor(details.info.file_size_bytes / (1024 * 1024));
      const currentAmount = Math.floor(
        details.info.bytes_uploaded / (1024 * 1024)
      );
      return (
        <ProgressTracker
          label="Stage: Uploading"
          currentAmount={currentAmount}
          totalAmount={total}
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
        <div className="grid-row flex-row flex-align-center padding-bottom-3">
          <Icons.PaperLines />
          <h2 className="font-sans-md text-bold padding-left-1">
            {submission.filename}
          </h2>
        </div>
        <span className="padding-bottom-3">
          <Pill
            variation="info"
            altText={displayValues.label}
            label={displayValues.label}
            color={displayValues.pillColor}
            icon={displayValues.pillIcon}
          />
        </span>
        {getContent()}
        <Divider className="margin-y-2" height={4} stroke="#E0E0E0" />
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Uploaded by</strong>
          </div>
          <div className="grid-col-8">{details.info.uploaded_by}</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Upload date</strong>
          </div>
          <div className="grid-col-8">{formatDate(submission.timestamp)}</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Upload ID</strong>
          </div>
          <div className="grid-col-8">{submission.upload_id}</div>
        </div>
        <div className="grid-row margin-top-3">
          <Accordion
            items={[
              {
                id: "1",
                title: "Submitted details",
                content: jsonPrettyPrint(details.info),
              },
            ]}
          />
          {submission.status === "failed" && details.reports.length > 0 && (
            <Accordion
              items={[
                {
                  id: "2",
                  title: "Validation report",
                  content: jsonPrettyPrint(details.reports),
                },
              ]}
            />
          )}
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
