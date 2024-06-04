import { Table as TanStackTable, flexRender } from "@tanstack/react-table";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePaginationServerSide,
} from "@us-gov-cdc/cdc-react";

export interface PortalTableProps<TData> {
  table: TanStackTable<TData>;
}

function PortalTable<TData>({ table }: PortalTableProps<TData>) {
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

  return (
    <>
      <Table className="padding-y-3">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeader
                    key={header.id}
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
                          <>
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
                          </>
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
                  className={cell.column.id == "details" ? "details-row" : ""}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableDataCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePaginationServerSide
        currentPage={table.getState().pagination.pageIndex}
        numberOfPages={table.getPageCount()}
        setCurrentPage={table.setPageIndex}
      />
    </>
  );
}

export default PortalTable;
