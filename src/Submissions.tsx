import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Dropdown,
  Pill,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import getFileSubmissions from "./utils/api/fileSubmissions";

function Submissions() {
  const pageLimit = 10;
  const [currentPageData, setCurrentPageData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getFileSubmissions();

      if (res.status != 200) return;

      try {
        const data = await res.json();
        // This needs to be set for initial data to be displayed in table
        setCurrentPageData(data.slice(0, pageLimit));
        setAllData(data);
        console.log("data:", data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, []);

  const uploadStatusColor = (status: string) => {
    if (status === "Uploading") return "busy";
    if (status === "Uploaded") return "success";
    if (status === "Failed") return "error";
  };

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h3 className="padding-y-3">File Submissions</h3>
      <div className="padding-bottom-2 display-flex flex-row flex-justify">
        <div className="display-flex flex-row cdc-submissions-page--filters">
          <div className="padding-right-2">
            <Dropdown
              items={["aims-celr"]}
              label="Destination: aims-celr"
              onSelect={() => {}}
              srText="Destination"
            />
          </div>
          <Dropdown
            items={["Last 60 Days"]}
            label="Last 30 Days"
            labelIcon={<Icons.Calendar />}
            onSelect={() => {}}
            srText="Last 30 Days"
          />
        </div>
        <div className="flex-align-end">
          <Dropdown
            items={["event"]}
            label="Event"
            labelIcon={<Icons.Filter />}
            onSelect={() => {}}
            srText="Event"
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
            Showing {allData.length} items
          </div>
          <Table className="padding-y-3">
            <TableHead>
              <TableRow>
                <TableHeader size="md">
                  <Checkbox label="" onChange={() => {}} />
                </TableHeader>
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
                <TableHeader size="sm">
                  <span className="text-center">Details</span>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((item, index) => (
                <TableRow key={`table-row-${index}`}>
                  <TableDataCell size="md" className="flex-justify-center">
                    <Checkbox />
                  </TableDataCell>
                  <TableDataCell className="text-left">
                    {item.file_name}
                  </TableDataCell>
                  <TableDataCell size="sm">
                    <Pill
                      label={item.status}
                      shape="slot"
                      outline={false}
                      inverse={false}
                      color={uploadStatusColor(item.status)}
                    />
                  </TableDataCell>
                  <TableDataCell size="md">{item.timestamp}</TableDataCell>
                  <TableDataCell size="sm">
                    <Icons.Dots />
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            pageLimit={pageLimit}
            data={allData}
            setPageData={setCurrentPageData}
          />
        </>
      )}
    </section>
  );
}

export default Submissions;
