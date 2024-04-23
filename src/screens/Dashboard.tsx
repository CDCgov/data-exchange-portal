import { useAuth } from "react-oidc-context";

import PieChart from "src/components/PieChart";
import StatusBoxes from "src/components/StatusBoxes";

import { useEffect, useState } from "react";

import getReportCounts, {
  defaultReportCounts,
  ReportCounts,
} from "src/utils/api/reportCounts";

import convertDate from "src/utils/helperFunctions/date";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] =
    useState<ReportCounts>(defaultReportCounts);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getReportCounts(
        auth.user?.access_token || "",
        "temp_data_stream_id",
        "temp_data_stream_route",
        "",
        convertDate(new Date())
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
    fetchCall();
  }, [auth]);

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">Dashboard</h1>
      <StatusBoxes data={countsData} />
      <PieChart data={countsData} />
    </section>
  );
}

export default Dashboard;
