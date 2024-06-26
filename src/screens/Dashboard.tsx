import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  endDateAtom,
  startDateAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { Timeframe } from "src/types/timeframes";

import PieChart from "src/components/PieChart";
import SearchOptions from "src/components/SearchOptions";
import StatusBoxes from "src/components/StatusBoxes";

import getReportCounts, {
  defaultReportCounts,
  ReportCounts,
} from "src/utils/api/reportCounts";
import { getPastDate } from "src/utils/helperFunctions/date";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] =
    useState<ReportCounts>(defaultReportCounts);

  const dataStreamId = useRecoilValue(dataStreamIdAtom);
  const dataRoute = useRecoilValue(dataRouteAtom);
  const endDate = useRecoilValue(endDateAtom);
  const startDate = useRecoilValue(startDateAtom);
  const timeframe = useRecoilValue(timeFrameAtom);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getReportCounts(
        auth.user?.access_token || "",
        dataStreamId,
        dataRoute != "All" ? dataRoute : "",
        timeframe == Timeframe.Custom ? startDate : getPastDate(timeframe),
        timeframe == Timeframe.Custom ? endDate : new Date().toISOString()
      );

      // TODO: add UI feedback for failed report counts retrieval
      if (res.status != 200) return;

      try {
        const data: ReportCounts = (await res.json()) as ReportCounts;
        if (data.status_counts) {
          setCountsData(data);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    fetchCall();
  }, [auth, dataStreamId, dataRoute, endDate, startDate, timeframe]);

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
