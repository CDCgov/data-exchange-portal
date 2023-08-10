import { Logo } from "./components/Logo";
import styles from "./styles/Landing.module.css";
import { Button } from "@us-gov-cdc/cdc-react";

export function Landing() {
  return (
    <div className={styles.wrapper}>
      <section className={styles["logo-section"]}>
        <Logo name="main" />
        <Logo name="cdc" />
      </section>
      <section>
        <h2>
          Welcome to <Logo name="mainSmall" />
        </h2>
        <span>The Data Exchange (DEX) Portal</span>
        <h4>Already have a SAMS login?</h4>
        <Button ariaLabel="Login with SAMS">Login With SAMS</Button>
      </section>
    </div>
  );
}
