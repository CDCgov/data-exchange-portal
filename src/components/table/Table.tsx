import { Table as TanStackTable, flexRender } from "@tanstack/react-table";

import { Icons } from "@us-gov-cdc/cdc-react-icons";
import Pagination from "src/components/table/Pagination";

export interface PortalTableProps<TData> {
  table: TanStackTable<TData>;
}

function PortalTable<TData>({ table }: PortalTableProps<TData>) {
  return (
    <>
      <div className="usa-table-container--scrollable">
        <table className="padding-y-3 usa-table width-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="cdc-sort-columnheader"
                      key={header.id}
                      id={`column-${header.id}`}>
                      {header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}>
                          {header.column.getCanSort() && (
                            <>
                              {{
                                asc: (
                                  <Icons.SortArrowUp className="sort-icon"></Icons.SortArrowUp>
                                ),
                                desc: (
                                  <Icons.SortArrowDown className="sort-icon"></Icons.SortArrowDown>
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                              )}
                            </>
                          )}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </button>
                      ) : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={`table-row-${row.id}`}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      cell.column.id == "details" ? "details-row" : ""
                    }>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        setCurrentPage={table.setPageIndex}
      />
    </>
  );
}

export default PortalTable;
