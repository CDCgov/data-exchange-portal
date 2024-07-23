import { Accordion, AccordionItemProps, Divider } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import {
  Issue,
  IssueLevel,
  Report,
  SubmissionDetails,
} from "src/utils/api/submissionDetails";

interface DetailsModalIssueSummaryProps {
  details: SubmissionDetails;
}

interface IssueSummary {
  service: string;
  action: string;
  level: string;
  message: string;
}

function DetailsModalIssueSummary({ details }: DetailsModalIssueSummaryProps) {
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
    <>
      <Divider className="margin-top-2" height={4} stroke="#E0E0E0" />
      <span className="font-sans-md padding-y-2">Submission Issue Summary</span>
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
    </>
  );
}

export default DetailsModalIssueSummary;
