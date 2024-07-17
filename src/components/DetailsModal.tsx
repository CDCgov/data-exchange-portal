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
} from "@us-gov-cdc/cdc-react";
import { format, parseISO } from "date-fns";

import { Icons } from "@us-gov-cdc/cdc-react-icons";
import {
  getStatusDisplayValuesByName,
  StatusDisplayValues,
} from "src/utils/helperFunctions/statusDisplayValues";
import { jsonPrettyPrint, downloadJson } from "src/utils/helperFunctions/json";
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
  const displayValues: StatusDisplayValues = getStatusDisplayValuesByName(
    submission.status
  );
  const auth = useAuth();
  const [details, setDetails] = useState<SubmissionDetails>({
    upload_id: submission.upload_id,
    data_stream_id: submission.metadata?.data_stream_id,
    data_stream_route: submission.metadata?.data_stream_route,
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
        setDetails(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    if (isModalOpen) {
      fetchCall();
    }
  }, [auth, submission, isModalOpen]);

  const getErrorMessages = (): string[] => {
    if (!submission.issues?.length) return [];

    return submission.issues;
  };

  const getContent = () => {
    const messages = getErrorMessages();
    if (messages.length > 0) {
      return (
        <Alert heading="Failed" type="error">
          {messages.length} Error(s) were detected
          {messages.map((issue: string) => (
            <p
              key={issue}
              className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
              {issue}
            </p>
          ))}
        </Alert>
      );
    }

    if (submission.status.toLowerCase().includes("complete")) {
      return (
        <Alert heading="Complete" type="success">
          File submission is complete
        </Alert>
      );
    }

    if (submission.status.toLowerCase().includes("uploading")) {
      return (
        <Alert heading="Processing" type="info">
          File submission is processing
        </Alert>
      );
    }
  };

  const handleDownloadJson = () => {
    downloadJson(details, `dex-${submission.upload_id}`);
  };

  const getAlertType = (level: string): "error" | "warning" | "info" => {
    switch (level) {
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
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
        <div>
          {details.reports.length === 0 ? (
            <p>No reports available</p>
          ) : (
            details.reports.map((report, index) => {
              const firstIssueLevel =
                report.issues.length > 0 ? report.issues[0].level : "default";
              const alertType = getAlertType(firstIssueLevel);
              return (
                <Alert
                  key={index}
                  heading={`${report.issues.length} error(s) returned in stage ${report.stage} - ${report.action}`}
                  type={alertType}>
                  <p>
                    {alertType === "error"
                      ? "Please review and address these errors."
                      : alertType === "warning"
                      ? "Please review these warnings"
                      : ""}
                  </p>
                </Alert>
              );
            })
          )}
        </div>
        {getContent()}
        <Divider className="margin-y-2" height={4} stroke="#E0E0E0" />
        <div className="grid-row margin-y-1">
          <div className="grid-col-4">
            <strong>Upload date</strong>
          </div>
          <div className="grid-col-8">{formatDate(submission?.timestamp)}</div>
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
                content: jsonPrettyPrint(details),
              },
            ]}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          ariaLabel="download submission details"
          onClick={handleDownloadJson}>
          Download Report JSON
        </Button>
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
