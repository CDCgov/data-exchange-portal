import { IFileSubmission } from "@types";

import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
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
  FileSubmissions,
  getFileSubmissions,
} from "src/utils/api/fileSubmissions";
import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

import DetailsModal from "src/components/DetailsModal";

import { useAuth } from "react-oidc-context";
import { getPastDate } from "src/utils/helperFunctions/date";
import timeframes, { Timeframe } from "src/types/timeframes";
import getDataStreams, { DataStream } from "src/utils/api/dataStreams";
import {
  getDataRoutes,
  getDataStreamIds,
} from "src/utils/helperFunctions/dataStreams";

function Submissions() {
  const auth = useAuth();
  const pageLimit = 10;
  const [currentPageData, setCurrentPageData] = useState<IFileSubmission[]>([]);

  const [dataStream, setDataStream] = useState("");
  const [dataRoute, setDataRoute] = useState("");
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.All);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<IFileSubmission>(
    {
      upload_id: "",
      filename: "",
      status: "",
      timestamp: "",
    }
  );

  // TODO: Replace with global state
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  useEffect(() => {
    const fetchCall = async () => {
      const res = await getDataStreams(auth.user?.access_token || "");

      try {
        const data = await res.json();
        const streams = data?.dataStreams as DataStream[];
        const dataStreamId = streams[0].dataStreamId;
        setDataStreams(streams);
        setDataStream(dataStreamId);
        const route = getDataRoutes(streams, dataStreamId)[0];
        setDataRoute(route);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, [auth]);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getFileSubmissions(
        auth.user?.access_token || "",
        dataStream,
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
        setCurrentPageData(data.items.slice(0, pageLimit));
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (dataStream) fetchCall();
  }, [auth, dataStream, dataRoute, timeframe]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDataStream = (dataStreamId: string) => {
    setDataStream(dataStreamId);
    const route = getDataRoutes(dataStreams, dataStreamId)[0];
    setDataRoute(route);
  };

  const handleTimeframe = (time: string) => {
    const timeframe = time as Timeframe;
    setTimeframe(timeframe);
  };

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">
        Track Submissions
      </h1>
      <div className="padding-bottom-2 display-flex flex-row flex-justify">
        <div className="display-flex flex-row cdc-submissions-page--filters">
          <Dropdown
            className="padding-right-2"
            items={getDataStreamIds(dataStreams)}
            label="Data Stream"
            onSelect={handleDataStream}
            srText="Data Stream"
            defaultValue={dataStream}
          />
          <Dropdown
            className="padding-right-2"
            items={getDataRoutes(dataStreams, dataStream)}
            label="Route"
            onSelect={setDataRoute}
            srText="Data Route"
            defaultValue={dataRoute}
          />
          <Dropdown
            items={timeframes}
            label="Timeframe"
            labelIcon={<Icons.Calendar />}
            onSelect={handleTimeframe}
            srText="Timeframe"
            defaultValue={timeframe}
          />
        </div>
      </div>
      {currentPageData.length === 0 ? (
        <p className="text-base font-sans-sm padding-top-3">
          No items found. Try expanding the timeframe or modifying the filters.
        </p>
      ) : (
        <>
          <div className="text-base font-sans-sm">
            Showing {currentPageData.length} items{" "}
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
              {currentPageData.map((item: IFileSubmission) => (
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
