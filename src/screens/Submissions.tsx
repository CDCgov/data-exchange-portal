import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  timeFrameAtom,
} from "src/state/searchParams";

import {
  Button,
  Pill,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  // TablePagination,
  TableRow,
} from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import {
  FileSubmission,
  FileSubmissions,
  FileSubmissionsSummary,
  defaultSubmissionItem,
  defaultSubmissionSummary,
  getFileSubmissions,
} from "src/utils/api/fileSubmissions";
import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

import DetailsModal from "src/components/DetailsModal";
import SearchOptions from "src/components/SearchOptions";

import { useAuth } from "react-oidc-context";
import { getPastDate } from "src/utils/helperFunctions/date";

function Submissions() {
  const auth = useAuth();
  const pageLimit = 10;
  const [currentPageData, setCurrentPageData] = useState<FileSubmission[]>([]);
  const [dataSummary, setDataSummary] = useState<FileSubmissionsSummary>(
    defaultSubmissionSummary
  );

  const dataStreamId = useRecoilValue(dataStreamIdAtom);
  const dataRoute = useRecoilValue(dataRouteAtom);
  const timeframe = useRecoilValue(timeFrameAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<FileSubmission>(
    defaultSubmissionItem
  );

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getFileSubmissions(
        auth.user?.access_token || "",
        dataStreamId,
        dataRoute != "All" ? dataRoute : "",
        getPastDate(timeframe),
        new Date().toISOString(),
        "descending", // TODO: Map to sort_order
        "date", // TODO: Map to sort_by
        1, // TODO: Map to onClick of page number from pagination, this represent page_number
        10 // TODO: Map to page_size
      );

      // TODO: add UI feedback for failed fileSubmission retrieval
      if (res.status != 200) return;

      try {
        const data = (await res.json()) as FileSubmissions;
        // TODO: Pagination should handle this logic
        setDataSummary(data.summary);
        setCurrentPageData(data.items.slice(0, pageLimit));
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (dataStreamId) fetchCall();
  }, [auth, dataStreamId, dataRoute, timeframe]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">
        Track Submissions
      </h1>
      <SearchOptions />
      {currentPageData.length === 0 ? (
        <p className="text-base font-sans-sm padding-top-3">
          No items found. Try expanding the timeframe or modifying the filters.
        </p>
      ) : (
        <>
          <div className="text-base font-sans-sm">
            Showing {currentPageData.length} items of {dataSummary.total_items}
          </div>
          <Table className="padding-y-3">
            <TableHead>
              <TableRow>
                <TableHeader>
                  <React.Fragment key=".0">
                    <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                    <span className="text-left">File Name</span>
                  </React.Fragment>
                </TableHeader>
                <TableHeader size="sm">
                  <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                  <span className="text-left">Upload Status</span>
                </TableHeader>
                <TableHeader size="md">
                  <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                  <span className="text-left">Submitted</span>
                </TableHeader>
                <TableHeader size="sm" className="details-row">
                  <span className="text-center">Details</span>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((item: FileSubmission) => (
                <TableRow key={`table-row-${item.upload_id}`}>
                  {/* Todo: Update this to use a more appropriate id as key */}
                  <TableDataCell className="text-left">
                    {item.filename}
                  </TableDataCell>
                  <TableDataCell size="sm">
                    <Pill
                      label={getStatusDisplayValuesById(item.status).label}
                      color={getStatusDisplayValuesById(item.status).pillColor}
                    />
                  </TableDataCell>
                  <TableDataCell size="md">
                    {new Date(item.timestamp).toLocaleString()}
                  </TableDataCell>
                  <TableDataCell size="sm" className="details-row">
                    <Button
                      ariaLabel="Submission Details"
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedSubmission(item);
                      }}
                      variation="text"
                      icon={<Icons.Dots />}
                      iconOnly
                      size="default"
                    />
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TablePagination pageLimit={pageLimit} data={currentPageData} /> */}
          <>
            <DetailsModal
              submission={selectedSubmission}
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
            />
          </>
        </>
      )}
    </section>
  );
}

export default Submissions;
