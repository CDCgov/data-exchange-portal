import React from "react";
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

function Submissions() {
  return (
    <section className="bg-grey padding-x-2">
      <h3 className="padding-y-3">File Submissions</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader size="md">
              <Checkbox label="Select all" onChange={() => {}} />
            </TableHeader>
            <TableHeader size="lg">
              <React.Fragment key=".0">
                <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                <span className="text-left">File Name</span>
              </React.Fragment>
            </TableHeader>
            <TableHeader>
              <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
              <span className="text-left">Source</span>
            </TableHeader>
            <TableHeader>
              <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
              <span className="text-left">Entity</span>
            </TableHeader>
            <TableHeader>
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
        <TableBody />
      </Table>
      <TablePagination
        data={[
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 1",
            fileName: "Test File Name 1",
            id: "0-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 2",
            fileName: "Test File Name 2",
            id: "1-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 3",
            fileName: "Test File Name 3",
            id: "2-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 1",
            fileName: "Test File Name 1",
            id: "0-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 2",
            fileName: "Test File Name 2",
            id: "1-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 3",
            fileName: "Test File Name 3",
            id: "2-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 1",
            fileName: "Test File Name 1",
            id: "0-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 2",
            fileName: "Test File Name 2",
            id: "1-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 3",
            fileName: "Test File Name 3",
            id: "2-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 1",
            fileName: "Test File Name 1",
            id: "0-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 2",
            fileName: "Test File Name 2",
            id: "1-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 3",
            fileName: "Test File Name 3",
            id: "2-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 1",
            fileName: "Test File Name 1",
            id: "0-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 2",
            fileName: "Test File Name 2",
            id: "1-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
          {
            checked: false,
            details: "detailed info",
            event: "Test Event Name 3",
            fileName: "Test File Name 3",
            id: "2-id",
            submitted: {
              timestamp: "3:45pm 11/17/2023",
              when: "Just Now",
            },
            uploadStatus: {
              color: "busy",
              label: "Uploading",
            },
          },
        ]}
        pageLimit={10}
        setPageData={() => {}}
      />
    </section>
  );
}

export default Submissions;
