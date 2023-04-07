import styles from "./style.module.css";

import trooper_img from "../../assets/img/trooper_logo.png";

export function HomeFooter() {
  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-box"]}>
        <div className={styles["box-content_1"]}>10M +</div>
        <div className={styles["box-content_2"]}>Total Customers</div>
      </div>
      <div className={styles["footer-box"]}>
        <div className={styles["box-content_1"]}>08 +</div>
        <div className={styles["box-content_2"]}>Years Of Experience</div>
      </div>
      <div className={styles["footer-box"]}>
        <div className={styles["box-content_1"]}>No. 1</div>
        <div className={styles["box-content_2"]}>Best Finance Company</div>
      </div>
      <div className={styles["footer-logo"]}>
        <img src={trooper_img} alt='trooper' />
      </div>
    </footer>
  );
}
