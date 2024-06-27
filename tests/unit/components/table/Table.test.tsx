import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";
import {
  createColumnHelper,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FileSubmission } from "src/utils/api/fileSubmissions";
import PortalTable from "src/components/table/Table";
import { describe, it, expect, vi } from "vitest";

vi.mock("recoil", () => ({
  useRecoilValue: vi.fn(),
}));

describe("PortalTable component", () => {
  const submission: FileSubmission = {
    upload_id: "1234",
    filename: "file1.txt",
    jurisdiction: "State",
    sender: "Sender1",
    status: "Uploaded",
    timestamp: "2024-06-27T12:00:00Z",
  };

  const currentPageData = [submission];
  const dataSummary = { number_of_pages: 1 };

  const columnHelper = createColumnHelper<FileSubmission>();

  const columns = [
    columnHelper.accessor("filename", {
      header: () => <span className="text-left">File Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: () => <span className="text-left">Upload Status</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("timestamp", {
      header: () => <span className="text-left">Submitted</span>,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
  ];

  const TableWrapper = () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const tableInstance = useReactTable({
      data: currentPageData,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      manualSorting: true,
      pageCount: dataSummary.number_of_pages,
      manualPagination: true,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    });

    return <PortalTable table={tableInstance} />;
  };

  it("renders table headers and rows correctly", () => {
    render(<TableWrapper />);

    expect(screen.getByText("File Name")).toBeInTheDocument();
    expect(screen.getByText("Upload Status")).toBeInTheDocument();
    expect(screen.getByText("Submitted")).toBeInTheDocument();

    expect(screen.getByText("file1.txt")).toBeInTheDocument();
    expect(screen.getByText("Uploaded")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2024-06-27T12:00:00Z").toLocaleString())
    ).toBeInTheDocument();
  });

  it("toggles sort icons correctly", () => {
    render(<TableWrapper />);

    const nameHeader = screen.getByText("File Name").closest("button");

    if (!nameHeader) {
      throw new Error("Sort header not found");
    }

    expect(nameHeader.querySelector(".sort-icon")).toBeInTheDocument();

    fireEvent.click(nameHeader);
    const sortArrowUp = nameHeader.querySelector(".sort-icon");
    expect(sortArrowUp).toBeInTheDocument();

    fireEvent.click(nameHeader);
    const sortArrowDown = nameHeader.querySelector(".sort-icon");
    expect(sortArrowDown).toBeInTheDocument();

    fireEvent.click(nameHeader);
    expect(nameHeader.querySelector(".sort-icon")).toBeInTheDocument();
  });
});
