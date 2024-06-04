import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  timeFrameAtom,
} from "src/state/searchParams";

import { Button, Pill } from "@us-gov-cdc/cdc-react";

import {
  createColumnHelper,
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
import PortalTable from "src/components/Table";
import SearchOptions from "src/components/SearchOptions";

import { useAuth } from "react-oidc-context";
import { getPastDate } from "src/utils/helperFunctions/date";

function Submissions() {
  const auth = useAuth();
  const pageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
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
      const res = await getFileSubmissions(
        auth.user?.access_token || "",
        dataStreamId,
        dataRoute != "All" ? dataRoute : "",
        getPastDate(timeframe),
        new Date().toISOString(),
        sorting.length > 0 ? sorting[0].id : "date",
        sorting.length > 0 && sorting[0].desc ? "descending" : "ascending",
        currentPage,
        pageLimit
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
  }, [auth, dataStreamId, dataRoute, sorting, timeframe, currentPage]);

  const handleSetSorting = (action: React.SetStateAction<SortingState>) => {
    setSorting(action);
    setCurrentPage(1);
  };

  const table = useReactTable({
    data: currentPageData,
    state: {
      sorting,
    },
    onSortingChange: handleSetSorting,
    manualSorting: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
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
          <PortalTable
            currentPage={currentPage}
            numberOfPages={dataSummary.number_of_pages}
            table={table}
            setCurrentPage={handleSetCurrentPage}
          />
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
