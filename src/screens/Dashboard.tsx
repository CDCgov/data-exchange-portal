import styles from "src/styles/Dashboard.module.css";

import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import PieChart from "src/components/PieChart";

function Dashboard() {
  const auth = useAuth();

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
      <PieChart
        data={[
          {
            id: "hack",
            label: "hack",
            value: 274,
            color: "hsl(88, 70%, 50%)",
          },
          {
            id: "make",
            label: "make",
            value: 483,
            color: "hsl(158, 70%, 50%)",
          },
          {
            id: "elixir",
            label: "elixir",
            value: 127,
            color: "hsl(51, 70%, 50%)",
          },
          {
            id: "go",
            label: "go",
            value: 458,
            color: "hsl(71, 70%, 50%)",
          },
          {
            id: "sass",
            label: "sass",
            value: 78,
            color: "hsl(94, 70%, 50%)",
          },
        ]}
      />
    </section>
  );
}

export default Dashboard;
