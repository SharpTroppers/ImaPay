import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export function HomeContent() {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["content-boxes"]}>
        <div className={styles["first-box"]}>
          <h1>Inovando para simplificar a sua vida financeira.</h1>
        </div>
        <div className={styles["second-box"]}>
          <p className={styles["publicity-text"]}>
            Bem-vindo(a) à imaPay, a fintech que está revolucionando a forma
            como as pessoas lidam com suas finanças. Com a nossa plataforma
            inovadora, você poderá gerenciar suas finanças pessoais e realizar
            transações de forma rápida, segura e fácil.
          </p>
        </div>
        <div className={styles["signup-box"]}>
          <div className={styles["light-saber"]}></div>
          <NavLink className={styles["signup-button"]} to='/signup'>
            Abra sua conta.
          </NavLink>
          <div className={styles["light-saber"]}></div>
        </div>
      </div>
      <div className={styles["image-container"]}></div>
    </div>
  );
}
