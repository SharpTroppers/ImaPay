import { NavLink } from "react-router-dom";

import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles["home-container"]}>
      <div className={`${styles["card-container"]} ${styles["primary-box"]}`}>
        <h1>Inovando para simplificar a sua vida financeira.</h1>
      </div>
      <div className={`${styles["card-container"]} ${styles["secondary-box"]}`}>
        <p className={styles.paragraph}>
          Bem-vindo(a) à imaPay, a fintech que está revolucionando a forma como
          as pessoas lidam com suas finanças. Com a nossa plataforma inovadora,
          você poderá gerenciar suas finanças pessoais e realizar transações de
          forma rápida, segura e fácil.
        </p>
        <div className={styles.button}>
          <NavLink className={styles["button-account"]} to='/signup'>
            Abra sua conta.
          </NavLink>
        </div>
      </div>
    </div>
  );
}
