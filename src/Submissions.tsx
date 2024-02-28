import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Pill,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@us-gov-cdc/cdc-react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Icons } from "@us-gov-cdc/cdc-react-icons";
import getFileSubmissions from "./utils/api/fileSubmissions";

type FileSubmission = {
  fileName: string;
  source: string;
  entity: string;
  event: string;
  uploadStatus: string;
  submitted: string;
};

const defaultData: FileSubmission[] = [
  {
    fileName: "",
    source: "",
    entity: "",
    event: "",
    uploadStatus: "",
    submitted: "",
  },
];

const columnHelper = createColumnHelper<FileSubmission>();

const columns = [
  columnHelper.display({
    id: "actions",
    header: "Select all",
    cell: (props) => <Checkbox />,
  }),
  columnHelper.accessor("fileName", {
    header: "File Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("entity", {
    header: "Entity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("event", {
    header: "Event",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("uploadStatus", {
    header: "Upload Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("submitted", {
    header: "Submitted",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "details",
    header: "Details",
    cell: (props) => "...",
  }),
];

function Submissions() {
  const [tableData, setTableData] = useState(defaultData);

  const [sorting, setSorting] = useState<SortingState>([]);

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

  const table = useReactTable({
    data: tableData,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h3 className="padding-y-3">File Submissions</h3>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
          {/* <TableRow>
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
          </TableRow> */}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={`table-row-${row.id}`}>
              {row.getVisibleCells().map((cell) => (
                <TableDataCell key={cell.id} className="text-left">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableDataCell>
              ))}
            </TableRow>
          ))}
          {/* <TableRow key={`table-row-${index}`}>
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
          </TableRow> */}
        </TableBody>
      </Table>
    </section>
  );
}

export default Submissions;
