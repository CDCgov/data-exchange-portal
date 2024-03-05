import styles from "src/styles/Dashboard.module.css";

import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

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
    </section>
  );
}

export default Dashboard;
