import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
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
        console.log(data);
        setTableData(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, []);

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h3 className="padding-y-3">File Submissions</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader size="md">
              <Checkbox label="Select all" onChange={() => {}} />
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
        <TableBody>{/* map over the table data */}</TableBody>
      </Table>
      <TablePagination data={[]} pageLimit={10} setPageData={() => {}} />
    </section>
  );
}

export default Submissions;
