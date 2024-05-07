import { useAuth } from "react-oidc-context";

import { Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import PieChart from "src/components/PieChart";
import StatusBoxes from "src/components/StatusBoxes";

import { useEffect, useState } from "react";

import getReportCounts, {
  defaultReportCounts,
  ReportCounts,
} from "src/utils/api/reportCounts";

import convertDate, { getPastDate } from "src/utils/helperFunctions/date";
import timeframes, { Timeframe } from "src/types/timeframes";
import { useFeatureFlag } from "src/utils/hooks/useFeatureFlag";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] =
    useState<ReportCounts>(defaultReportCounts);

  const { enabled: enableSuperUser } = useFeatureFlag("EnableSuperUser");

  const [dataStream, setDataStream] = useState("aims-celr");
  const [dataRoute, setDataRoute] = useState("csv");
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Last30Days);

  useEffect(() => {
    console.log(
      enableSuperUser ? "Super User is enabled" : "Super User is disabled"
    );
  }, [enableSuperUser]);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getReportCounts(
        auth.user?.access_token || "",
        dataStream,
        dataRoute,
        getPastDate(timeframe),
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
  }, [auth, dataStream, dataRoute, timeframe]);

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
            items={["aims-celr", "daart"]}
            label="Data Stream"
            onSelect={setDataStream}
            srText="Data Stream"
          />
          <Dropdown
            className="padding-right-2"
            items={["csv", "hl7"]}
            label="Route"
            onSelect={setDataRoute}
            srText="Data Route"
          />
          <Dropdown
            items={timeframes}
            label="Timeframe"
            labelIcon={<Icons.Calendar />}
            onSelect={handleTimeframe}
            srText="Timeframe"
          />
        </div>
      </div>
      <StatusBoxes data={countsData} />
      <PieChart data={countsData} />
    </section>
  );
}

export default Dashboard;
