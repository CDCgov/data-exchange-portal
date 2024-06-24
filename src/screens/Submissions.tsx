import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  endDateAtom,
  jurisdictionAtom,
  senderIdAtom,
  startDateAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { Timeframe } from "src/types/timeframes";

import { Button, Pill } from "@us-gov-cdc/cdc-react";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
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
import PortalTable from "src/components/table/Table";
import SearchOptions from "src/components/SearchOptions";

import { useAuth } from "react-oidc-context";
import { getPastDate } from "src/utils/helperFunctions/date";

function Submissions() {
  const auth = useAuth();

  const [currentPageData, setCurrentPageData] = useState<FileSubmission[]>([]);
  const [dataSummary, setDataSummary] = useState<FileSubmissionsSummary>(
    defaultSubmissionSummary
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const dataStreamId = useRecoilValue(dataStreamIdAtom);
  const dataRoute = useRecoilValue(dataRouteAtom);
  const endDate = useRecoilValue(endDateAtom);
  const jurisdiction = useRecoilValue(jurisdictionAtom);
  const senderId = useRecoilValue(senderIdAtom);
  const startDate = useRecoilValue(startDateAtom);
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
    columnHelper.accessor("jurisdiction", {
      header: () => <span className="text-left">Jurisdiction</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sender", {
      header: () => <span className="text-left">Sent By</span>,
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
      cell: (info) => new Date(info.getValue()).toLocaleString(),
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
      const sortDirection = () => {
        if (sorting.length == 0) return "descending";
        return sorting[0].desc ? "descending" : "ascending";
      };

      const res = await getFileSubmissions(
        auth.user?.access_token || "",
        dataStreamId,
        dataRoute != "All" ? dataRoute : "",
        timeframe == Timeframe.Custom ? startDate : getPastDate(timeframe),
        timeframe == Timeframe.Custom ? endDate : new Date().toISOString(),
        sorting.length > 0 ? sorting[0].id : "timestamp",
        sortDirection(),
        pagination.pageIndex + 1,
        pagination.pageSize,
        jurisdiction,
        senderId
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
          setCurrentPageData(data.items);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (dataStreamId) fetchCall();
  }, [
    auth,
    dataStreamId,
    dataRoute,
    jurisdiction,
    senderId,
    sorting,
    timeframe,
    pagination,
  ]);

  const handleSetSorting = (action: React.SetStateAction<SortingState>) => {
    setSorting(action);
    table.setPageIndex(0);
  };

  const table = useReactTable({
    data: currentPageData,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: handleSetSorting,
    manualSorting: true,
    onPaginationChange: setPagination,
    pageCount: dataSummary.number_of_pages,
    manualPagination: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleFilter = useCallback(() => {
    table.setPageIndex(0);
  }, [table]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="submissions_page bg-grey padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">
        Track Submissions
      </h1>
      <SearchOptions forSubmissions handleFilter={handleFilter} />
      {currentPageData.length === 0 ? (
        <p className="text-base font-sans-sm padding-top-3">
          No items found. Try expanding the timeframe or modifying the filters.
        </p>
      ) : (
        <>
          <div className="text-base font-sans-sm">
            Showing {currentPageData.length} items of {dataSummary.total_items}
          </div>
          <PortalTable table={table} />
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
