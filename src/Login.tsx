import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { Logo } from "./components/Logo";
import styles from "./styles/Login.module.css";
import { Button, Divider } from "@us-gov-cdc/cdc-react";
import { useAuth } from "react-oidc-context";
import { getEnv } from "./utils";

export function Login() {
  const auth = useAuth();
  const buildNumber = getEnv("VITE_APP_BUILD_NUMBER");

  return (
    <div className={styles.wrapper}>
      <section className={styles["leftside-section"]}>
        <div className={styles.logos}>
          <Logo name="main" className={styles["main-logo"]} />
          <Divider
            width="118"
            height="2"
            stroke="#C0E9FF"
            className={styles["logo-section-divider"]}
          />
          <Logo name="cdc" className={styles["cdc-logo"]} />
        </div>
        {buildNumber && (
          <small className={styles["build-number"]}>Build {buildNumber}</small>
        )}
      </section>
      <section className={styles["rightside-section"]}>
        <div className={styles["login-content"]}>
          <div className={styles["login-with-dex"]}>
            <h2>
              Welcome to
              <Logo name="mainSmall" className={styles["welcome-logo"]} />
            </h2>
            <span className={styles["welcome-bottom-text"]}>
              The Data Exchange (DEX) Portal
            </span>
            <Divider
              width="374"
              height="2"
              stroke="#BDBDBD"
              className={styles["rightside-divider"]}
            />
            <h4 className={styles["already-sams-user-header"]}>
              Already have a SAMS login?
            </h4>
            <Button
              ariaLabel="Login with SAMS"
              iconPosition="right"
              icon={<Icons.SquareArrowUpRight />}
              className={styles["login-btn"]}
              onClick={() => auth.signinRedirect()}>
              Login With SAMS
            </Button>
            <Divider
              width="374"
              height="2"
              stroke="#BDBDBD"
              className={styles["rightside-divider"]}
            />
          </div>
          <div className={styles["new-to-dex"]}>
            <h4 className={styles["new-to-dex-header"]}>New to DEX?</h4>
            <Button
              ariaLabel="request access"
              variation="outline"
              className={styles["request-access-btn"]}>
              Request access
            </Button>
            <Button ariaLabel="learn more" variation="text">
              Learn more
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
