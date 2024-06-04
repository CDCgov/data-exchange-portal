import React, { useEffect, useState, Fragment } from "react";
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

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

import {
  FileSubmission,
  FileSubmissions,
  FileSubmissionsSummary,
  defaultSubmissionItem,
  defaultSubmissionSummary,
  getFileSubmissions,
} from "src/utils/api/fileSubmissions";
import { getStatusDisplayValuesByName } from "src/utils/helperFunctions/statusDisplayValues";

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
  const [sorting, setSorting] = useState<SortingState>([]);

  const dataStreamId = useRecoilValue(dataStreamIdAtom);
  const dataRoute = useRecoilValue(dataRouteAtom);
  const timeframe = useRecoilValue(timeFrameAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<FileSubmission>(
    defaultSubmissionItem
  );

  const columnHelper = createColumnHelper<FileSubmission>();

  const columns = [
    columnHelper.accessor("filename", {
      header: () => <span className="text-left">File Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: () => <span className="text-left">Upload Status</span>,
      cell: (info) => (
        <Pill
          label={getStatusDisplayValuesByName(info.getValue()).label}
          color={getStatusDisplayValuesByName(info.getValue()).pillColor}
        />
      ),
    }),
    columnHelper.accessor("timestamp", {
      header: () => <span className="text-left">Submitted</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "details",
      header: () => <span className="text-center">Details</span>,
      cell: ({ row, cell }) => {
        return (
          <Button
            id={cell.id}
            ariaLabel="Submission Details"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedSubmission(row.original);
            }}
            variation="text"
            icon={<Icons.Dots />}
            iconOnly
            size="default"
          />
        );
      },
    }),
  ];

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
        if (data?.summary) {
          setDataSummary(data.summary);
        }

        if (data?.items) {
          setCurrentPageData(data.items.slice(0, pageLimit));
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (dataStreamId) fetchCall();
  }, [auth, dataStreamId, dataRoute, timeframe]);

  const table = useReactTable({
    data: currentPageData,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // useEffect(() => {
  //   console.log("tablestate:", table.getState());
  // }, [table.getState()]);

  const getColSize = (field: string) => {
    switch (field) {
      case "filename":
        break;
      case "status":
        return "sm";
      case "timestamp":
        return "md";
      case "details":
        return "sm";
      default:
        return "md";
    }
  };

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
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHeader
                        size={getColSize(header.id)}
                        className={header.id == "details" ? "details-row" : ""}>
                        {header.isPlaceholder ? null : (
                          <span
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer display-flex flex-align-center"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}>
                            {header.column.getCanSort() && (
                              <Fragment>
                                {{
                                  asc: (
                                    <Icons.ArrowUp className="sort-arrows"></Icons.ArrowUp>
                                  ),
                                  desc: (
                                    <Icons.ArrowDown className="sort-arrows"></Icons.ArrowDown>
                                  ),
                                }[header.column.getIsSorted() as string] ?? (
                                  <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                                )}
                              </Fragment>
                            )}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        )}
                      </TableHeader>
                    );
                  })}
                </tr>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={`table-row-${row.id}`}>
                  {row.getVisibleCells().map((cell) => (
                    <TableDataCell
                      key={cell.id}
                      size={getColSize(cell.column.id)}
                      className={
                        cell.column.id == "details" ? "details-row" : ""
                      }>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableDataCell>
                  ))}
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
