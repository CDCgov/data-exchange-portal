import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useRecoilState } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";

import { Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import PieChart from "src/components/PieChart";
import StatusBoxes from "src/components/StatusBoxes";

import getReportCounts, {
  defaultReportCounts,
  ReportCounts,
} from "src/utils/api/reportCounts";

import { getPastDate } from "src/utils/helperFunctions/date";
import timeframes, { Timeframe } from "src/types/timeframes";
import getDataStreams, { DataStream } from "src/utils/api/dataStreams";
import {
  getDataRoutes,
  getDataStreamIds,
} from "src/utils/helperFunctions/dataStreams";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] =
    useState<ReportCounts>(defaultReportCounts);

  const [dataStream, setDataStream] = useRecoilState(dataStreamIdAtom);
  const [dataRoute, setDataRoute] = useRecoilState(dataRouteAtom);
  const [timeframe, setTimeframe] = useRecoilState(timeFrameAtom);

  // TODO: Replace with global state
  const [dataStreams, setDataStreams] = useRecoilState(dataStreamsAtom);
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

  const handleDataStream = (dataStreamId: string) => {
    setDataStream(dataStreamId);
    const route = getDataRoutes(dataStreams, dataStreamId)[0];
    setDataRoute(route);
  };

  const handleTimeframe = (time: string) => {
    const timeframe = time as Timeframe;
    setTimeframe(timeframe);
  };

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">Dashboard</h1>
      <div className="padding-bottom-2 display-flex flex-row flex-justify">
        <div className="display-flex flex-row cdc-submissions-page--filters">
          <Dropdown
            className="padding-right-2"
            items={getDataStreamIds(dataStreams)}
            label="Data Stream"
            onSelect={handleDataStream}
            srText="Data Stream"
            defaultValue={dataStream}
          />
          <Dropdown
            className="padding-right-2"
            items={getDataRoutes(dataStreams, dataStream)}
            label="Route"
            onSelect={setDataRoute}
            srText="Data Route"
            defaultValue={dataRoute}
          />
          <Dropdown
            items={timeframes}
            label="Timeframe"
            labelIcon={<Icons.Calendar />}
            onSelect={handleTimeframe}
            srText="Timeframe"
            defaultValue={timeframe}
          />
        </div>
      </div>
      <StatusBoxes data={countsData} />
      <PieChart data={countsData} />
    </section>
  );
}

export default Dashboard;
