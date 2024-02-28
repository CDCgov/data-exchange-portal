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
  const [tableData, setTableData] = useState();

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getFileSubmissions();

      if (res.status != 200) return;

      try {
        const data = await res.json();
        setTableData(data.default); // TODO: Find out why the data is wrapped in a default key/top-level object
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, []);

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
      <div className="text-base font-sans-sm">Showing 1-10 of 21 items</div>
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
            <TableHeader>
              <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
              <span className="text-left">Source</span>
            </TableHeader>
            <TableHeader size="sm">
              <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
              <span className="text-left">Entity</span>
            </TableHeader>
            <TableHeader size="sm">
              <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
              <span className="text-left">Event</span>
            </TableHeader>
            <TableHeader>
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
          {tableData &&
            tableData.map((item, index) => (
              <TableRow key={`table-row-${index}`}>
                <TableDataCell size="md" className="flex-justify-center">
                  <Checkbox />
                </TableDataCell>
                <TableDataCell className="text-left">
                  {item.fileName}
                </TableDataCell>
                <TableDataCell>{item.source}</TableDataCell>
                <TableDataCell size="sm">{item.entity}</TableDataCell>
                <TableDataCell size="sm" className="text-left">
                  {item.event}
                </TableDataCell>
                <TableDataCell>
                  <Pill
                    label={item.uploadStatus}
                    shape="slot"
                    outline={false}
                    inverse={false}
                  />
                </TableDataCell>
                <TableDataCell size="md" className="flex-justify-center">
                  {item.submitted}
                </TableDataCell>
                <TableDataCell size="sm">
                  <Icons.Dots />
                </TableDataCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {tableData && (
        <TablePagination
          data={tableData}
          pageLimit={10}
          setPageData={() => {}}
        />
      )}
    </section>
  );
}

export default Submissions;
