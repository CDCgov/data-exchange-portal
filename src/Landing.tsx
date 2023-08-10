import { Logo } from "./components/Logo";
import styles from "./styles/Landing.module.css";
import { Button, Divider } from "@us-gov-cdc/cdc-react";

export function Landing() {
  return (
    <div className={styles.wrapper}>
      <section className={styles["logo-section"]}>
        <Logo name="main" />
        <Divider
          height="2"
          stroke="#C0E9FF"
          width="11.8rem"
          className={styles["logo-section-divider"]}
        />
        <Logo name="cdc" />
      </section>
      <section>
        <h2>
          Welcome to <Logo name="mainSmall" />
        </h2>
        <span>The Data Exchange (DEX) Portal</span>
        <Divider
          height="2"
          stroke="#BDBDBD"
          className={styles["rightside-divider"]}
        />
        <h4>Already have a SAMS login?</h4>
        <Button
          ariaLabel="Login with SAMS"
          iconPosition="right"
          iconName="squareArrowUpRight"
          className={styles["btn-padding-lr"]}
        >
          Login With SAMS
        </Button>
        <Divider
          height="2"
          stroke="#BDBDBD"
          className={styles["rightside-divider"]}
        />
        <h4>New to DEX?</h4>
        <Button
          ariaLabel="request access"
          variation="outline"
          className={styles["btn-padding-lr"]}
        >
          Request access
        </Button>
        <Button ariaLabel="learn more" variation="text">
          Learn more
        </Button>
      </section>
    </div>
  );
}
