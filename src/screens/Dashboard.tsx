import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";

import PieChart from "src/components/PieChart";
import SearchOptions from "src/components/SearchOptions";
import StatusBoxes from "src/components/StatusBoxes";

import getReportCounts, {
  defaultReportCounts,
  ReportCounts,
} from "src/utils/api/reportCounts";

import { getPastDate } from "src/utils/helperFunctions/date";
import getDataStreams, { DataStream } from "src/utils/api/dataStreams";
import { getDataRoutes } from "src/utils/helperFunctions/dataStreams";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] =
    useState<ReportCounts>(defaultReportCounts);

  const [dataStream, setDataStream] = useRecoilState(dataStreamIdAtom);
  const [dataRoute, setDataRoute] = useRecoilState(dataRouteAtom);
  const timeframe = useRecoilValue(timeFrameAtom);

  // TODO: Replace with global state
  const setDataStreams = useSetRecoilState(dataStreamsAtom);
  useEffect(() => {
    const fetchCall = async () => {
      const res = await getDataStreams(auth.user?.access_token || "");

      try {
        const data = await res.json();
        const streams = data?.dataStreams as DataStream[];
        const dataStreamId = streams[0].dataStreamId;
        setDataStreams(streams);
        setDataStream(dataStreamId);
        const route = getDataRoutes(streams, dataStreamId)[0];
        setDataRoute(route);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, [auth]);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getReportCounts(
        auth.user?.access_token || "",
        dataStream,
        dataRoute != "All" ? dataRoute : "",
        getPastDate(timeframe),
        new Date().toISOString()
      );

      // TODO: add UI feedback for failed report counts retrieval
      if (res.status != 200) return;

      try {
        const data: ReportCounts = (await res.json()) as ReportCounts;
        setCountsData(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (dataStream) fetchCall();
  }, [auth, dataStream, dataRoute, timeframe]);

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">Dashboard</h1>
      <SearchOptions />
      <StatusBoxes data={countsData} />
      <PieChart data={countsData} />
    </section>
  );
}

export default Dashboard;
