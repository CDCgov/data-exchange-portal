import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import {
  Accordion,
  AccordionItemProps,
  Alert,
  Divider,
  Modal,
  ModalBody,
  ModalFooter,
  Pill,
} from "@us-gov-cdc/cdc-react";
import Button from "src/components/Button";

import { format, parseISO } from "date-fns";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import {
  getStatusDisplayValuesByName,
  StatusDisplayValues,
} from "src/utils/helperFunctions/statusDisplayValues";
import { fileSizeDisplay } from "src/utils/helperFunctions/fileSizeDisplay";
import { downloadJson } from "src/utils/helperFunctions/json";
import getSubmissionDetails, {
  Issue,
  IssueLevel,
  Report,
  ReportStatus,
  SubmissionDetails,
  SubmissionStatus,
} from "src/utils/api/submissionDetails";
import { FileSubmission } from "src/utils/api/fileSubmissions";

interface PropTypes {
  submission: FileSubmission;
  isModalOpen: boolean;
  handleModalClose: () => void;
}

interface IssueSummary {
  service: string;
  action: string;
  level: string;
  message: string;
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
    status: submission.status,
    lastService: "",
    lastAction: "",
    filename: submission.filename,
    uploadId: submission.upload_id,
    dexIngestTimestamp: submission.timestamp,
    dataStreamId: submission.metadata?.data_stream_id,
    dataStreamRoute: submission.metadata?.data_stream_route,
    jurisdiction: submission.jurisdiction,
    senderId: submission.sender_id,
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

  const getHeaderContent = () => {
    return (
      <>
        <div className="grid-row flex-row flex-align-center padding-bottom-2">
          <Icons.PaperLines />
          <h2 className="font-sans-md text-bold padding-left-1">
            {details.filename}
          </h2>
        </div>
        <span className="padding-bottom-2">
          <Pill
            variation="info"
            altText={displayValues.label}
            label={displayValues.label}
            color={displayValues.pillColor}
            icon={displayValues.pillIcon}
          />
        </span>
        <span className="font-sans-md padding-bottom-2">
          Stage: {details.lastService} - {details.lastAction}
        </span>
      </>
    );
  };

  const getFailedContent = () => {
    if (details.status != SubmissionStatus.FAILED) return null;

    const issues = details.reports[0]?.issues;

    if (!issues.length)
      return (
        <Alert
          className="margin-y-1"
          heading={`Error in stage ${details.lastService} - ${details.lastAction}`}
          type="error">
          No specifics were given, please see full attached report below.
        </Alert>
      );

    return (
      <Alert
        className="margin-y-1"
        heading={`${issues.length} error(s) returned in stage ${details.lastService} - ${details.lastAction}`}
        type="error">
        Please review and address these errors.
        {issues.map((issue: Issue) => (
          <p
            key={issue.message}
            className="border-1px radius-md border-secondary-light margin-y-2 padding-105">
            {issue.message}
          </p>
        ))}
      </Alert>
    );
  };

  const hasFailedReports = () => {
    const failedReports = details.reports.filter(
      (r: Report) => r.status == ReportStatus.FAILURE
    );
    return failedReports.length > 0;
  };

  const getIssues = () => {
    const issueSummary: IssueSummary[] = details.reports.flatMap(
      (report: Report) => {
        const internalIssues: IssueSummary[] = report.issues.map(
          (issue: Issue) => ({
            service: report.service,
            action: report.action,
            level: issue.level,
            message: issue.message,
          })
        );

        return internalIssues;
      }
    );

    return (
      <Accordion
        multiselectable
        items={issueSummary.map((issue: IssueSummary, i: number) => {
          const item: AccordionItemProps = {
            id: i.toString(),
            title: (
              <div
                key={issue.message}
                className="grid-row flex-row flex-align-center">
                {issue.level == IssueLevel.ERROR ? (
                  <Icons.ExclamationCircle className="text-secondary" />
                ) : (
                  <Icons.ExclamationTriangle className="text-accent-warm" />
                )}
                <span className="font-sans-sm padding-left-1">
                  {issue.service} - <strong>{issue.action}</strong>
                </span>
              </div>
            ),
            content: issue.message,
          };
          return item;
        })}
      />
    );
  };

  const getTopLevelDetails = () => {
    return (
      <>
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Started</div>
          <div className="grid-col-9">
            {formatDate(details.dexIngestTimestamp)}
          </div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Sent By</div>
          <div className="grid-col-9">{details.senderId}</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Data Stream</div>
          <div className="grid-col-9">{details.dataStreamId}</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Route</div>
          <div className="grid-col-9">{details.dataStreamRoute}</div>
        </div>
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Jurisdiction</div>
          <div className="grid-col-9">{details.jurisdiction}</div>
        </div>
        {submission.file_size_bytes && (
          <div className="grid-row margin-y-1">
            <div className="grid-col-3">File Size</div>
            <div className="grid-col-9">
              {fileSizeDisplay(submission.file_size_bytes)}
            </div>
          </div>
        )}
        <div className="grid-row margin-y-1">
          <div className="grid-col-3">Upload ID</div>
          <div className="grid-col-9">{details.uploadId}</div>
        </div>
      </>
    );
  };

  const handleDownloadJson = () => {
    downloadJson(details, `dex-${submission.upload_id}`);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      modalTitle="Submission Details"
      onClose={handleModalClose}>
      <ModalBody>
        {getHeaderContent()}
        {getFailedContent()}
        <Divider className="margin-y-2" height={4} stroke="#E0E0E0" />
        {getTopLevelDetails()}
        {hasFailedReports() && (
          <>
            <Divider className="margin-top-2" height={4} stroke="#E0E0E0" />
            <span className="font-sans-md padding-y-2">
              Submission Issue Summary
            </span>
            {getIssues()}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button outline type="button" onClick={handleDownloadJson}>
          Download Full Report
        </Button>
        <Button type="button" onClick={handleModalClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default DetailsModal;
