import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import Pagination from "src/components/table/Pagination";

describe("Pagination component", () => {
  const testPages = 24;
  const testThreePages = 3;
  const testSevenPages = 7;
  const testSetCurrentPage = vi.fn();

  it("renders pagination for a list of pages", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={10}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 9")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 10")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 10")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 11")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 24")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("only renders the maximum number of slots", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={10}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(9);
  });

  it("renders pagination when the first page is current", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={1}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.queryByLabelText("Previous page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 1")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("renders pagination when the last page is current", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={24}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.queryByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.queryByLabelText("Next page")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Page 24")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("renders overflow at the beginning and end when current page is in the middle", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={10}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 9")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 10")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 10")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 11")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 24")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("renders overflow at the end when at the beginning of the pages", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={3}
        setCurrentPage={testSetCurrentPage}
      />
    );

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 4")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 24")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(1);
  });

  it("renders overflow at the beginning when at the end of the pages", () => {
    render(
      <Pagination
        totalPages={testPages}
        currentPage={21}
        setCurrentPage={testSetCurrentPage}
      />
    );

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 20")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 21")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 21")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 22")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 23")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 24")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(1);
  });

  it("doesn't render last page when unbounded", () => {
    const randomPage = 1234;
    render(
      <Pagination
        currentPage={randomPage}
        setCurrentPage={testSetCurrentPage}
      />
    );
    expect(screen.getByLabelText(`Page ${randomPage + 1}`)).toBeInTheDocument();
  });

  it("can click", () => {
    const { getByTestId, getAllByTestId } = render(
      <Pagination
        totalPages={testPages}
        currentPage={21}
        setCurrentPage={testSetCurrentPage}
      />
    );

    fireEvent.click(getByTestId("pagination-next"));
    expect(testSetCurrentPage).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTestId("pagination-previous"));
    expect(testSetCurrentPage).toHaveBeenCalledTimes(2);

    const allPageNumbers = getAllByTestId("pagination-page-number");
    fireEvent.click(allPageNumbers[0]);
    expect(testSetCurrentPage).toHaveBeenCalledTimes(3);
  });

  describe("for fewer pages than the max slots", () => {
    it("renders pagination with no overflow 1", () => {
      render(
        <Pagination
          totalPages={testThreePages}
          currentPage={2}
          setCurrentPage={testSetCurrentPage}
        />
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
      expect(screen.queryAllByText("…")).toHaveLength(0);
    });

    it("renders pagination with no overflow 2", () => {
      render(
        <Pagination
          totalPages={testSevenPages}
          currentPage={4}
          setCurrentPage={testSetCurrentPage}
        />
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(9);
      expect(screen.queryAllByText("…")).toHaveLength(0);
    });
  });

  describe("with a custom slot number passed in", () => {
    it("only renders the maximum number of slots", () => {
      render(
        <Pagination
          totalPages={testPages}
          currentPage={10}
          setCurrentPage={testSetCurrentPage}
          maxSlots={10}
        />
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(10);
    });
  });
});
