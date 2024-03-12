import styles from "src/styles/Dashboard.module.css";

import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import PieChart from "src/components/PieChart";
import { useEffect, useState } from "react";
import { getReportCounts } from "src/utils/api/reportCounts";

function Dashboard() {
  const auth = useAuth();
  const [countsData, setCountsData] = useState([]);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getReportCounts(
        auth.user?.access_token || "",
        "temp_data_stream_id",
        "temp_data_stream_route"
      );

      // TODO: add UI feedback for failed report counts retrieval
      if (res.status != 200) return;

      try {
        const data = await res.json();
        setCountsData(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
  }, [auth]);

  return (
    <section className="main_content">
      <div className="box">
        <p>Welcome {auth.user?.profile.email}</p>
      </div>
      <div className="box">
        <h2>New to DEX?</h2>
        <Button
          className={styles["request-access-btn"]}
          ariaLabel="take a tour"
          variation="outline">
          Take a tour
        </Button>
        <Button
          className={styles["learn-more-btn"]}
          ariaLabel="learn more"
          variation="outline">
          Learn more
        </Button>
      </div>
      <PieChart data={countsData} />
    </section>
  );
}

export default Dashboard;
