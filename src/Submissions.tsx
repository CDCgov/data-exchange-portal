import React, { useEffect, useState } from "react";

import { useAuth } from "react-oidc-context";

import {
  Checkbox,
  Pill,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import { getEnv } from "./utils.ts";

interface ISubmissionItem {
  readonly filename: string;
  readonly metadata: Array<{
    readonly [key: string]: string;
  }>;
  readonly status: string;
  readonly timestamp: string;
  readonly upload_id: string;
  checked: boolean;
}

interface ISubmissionsData {
  summary: {
    number_of_pages: number;
    page_number: number;
    page_size: number;
    total_items: number;
  };
  items: Array<ISubmissionItem>;
}

function Submissions() {
  const auth = useAuth();

  const [submissionsData, setSubmissionsData] = useState<ISubmissionsData>();
  const [pageNumber, setPageNumber] = useState(1);
  const [dateStart, setDateStart] = useState(new Date().toISOString());
  const [destination, setDestination] = useState("dextesting");
  const [intialLoad, setIntialLoad] = useState(false);

  const submissionsDataEndpoint: string = getEnv("VITE_UPLOAD_STATUS_URL");

  const retrieveSubmissions = async (
    date_start: string,
    destination: string,
    page_number?: number
  ) => {
    const response = await fetch(
      `${submissionsDataEndpoint}?destination=${destination}&date_start=${date_start}&page_number=${page_number}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          Authorization: auth.user?.access_token || "",
        },
      }
    );

    const json: ISubmissionsData = await response.json();

    const items = [];

    for (let index = 0; index < json.items.length; index++) {
      let item = json?.items[index];
      item.checked = false;
      items.push(item);
    }

    setSubmissionsData({
      summary: json.summary,
      items: items,
    });
    // setPageNumber(submissionsData?.summary.page_number || 1);
    setIntialLoad(true);
  };

  useEffect(() => {
    if (!intialLoad) {
      retrieveSubmissions(dateStart, destination, pageNumber);
      setIntialLoad(true);
    }
  }, [submissionsData]);

  return (
    <>
      <section className="submissions_page bg-grey padding-x-2">
        <h4 className="padding-y-3">File Submissions</h4>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader size="md">
                <Checkbox label="Select all" onChange={() => {}}></Checkbox>
              </TableHeader>
              <TableHeader size="md">
                <React.Fragment key=".0">
                  <Icons.SortArrow className="sort-icon"></Icons.SortArrow>
                  <span className="text-left">File Name</span>
                </React.Fragment>
              </TableHeader>
              {/* <TableHeader size="md">
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
              </TableHeader> */}
              <TableHeader size="md">
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
          <TableBody>
            {submissionsData?.items.map((info, index) => (
              <TableRow key={`table-row-${index}`}>
                <TableDataCell size="md" className="flex-justify-center">
                  <Checkbox
                    srOnly={true}
                    label={info.filename}
                    isChecked={info.checked}
                    onChange={() => {}}
                    onKeyDown={(e: {
                      code: string;
                      target: { checked: boolean };
                    }) => {
                      // if (e?.code === "Enter") {
                      //   const arr: ISubmissionItem[] = [];
                      //   for (let i = 0; i < transformedData.length; i++) {
                      //     let element = transformedData[i];
                      //     if (element.upload_id === info.upload_id) {
                      //       element.checked = !element.checked;
                      //     }
                      //     arr.push(element);
                      //   }
                      //   setData(arr);
                      // }
                    }}></Checkbox>
                </TableDataCell>
                <TableDataCell className="text-left" size="md">
                  {info.filename}
                </TableDataCell>
                <TableDataCell size="md">
                  <Pill
                    label={info.status}
                    shape="slot"
                    color={"info"}
                    outline={false}
                    inverse={false}
                  />
                </TableDataCell>
                <TableDataCell size="md" className="flex-justify-center">
                  {info.timestamp}
                </TableDataCell>
                {/* <TableDataCell
                size="md"
                className="flex-justify-center"></TableDataCell> */}
                <TableDataCell size="sm">
                  <Icons.Dots />
                </TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          pageLimit={submissionsData?.summary.number_of_pages || 1}
          setPageData={(page_number: number) =>
            retrieveSubmissions(dateStart, destination, page_number)
          }
        /> */}
      </section>
    </>
  );
}

export default Submissions;
