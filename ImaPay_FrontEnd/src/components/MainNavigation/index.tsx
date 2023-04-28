import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import Icon from "phosphor-react";
import tropperLogo from "../../assets/img/trooper_logo.png";
import loginImg from "../../assets/img/sign-in-thin.svg";

export function MainNavigation() {
  return (
    <header className={styles["header-container"]}>
      <figure className={styles["header-logo"]}>
        <NavLink className={styles["homepage-link"]} to="/">
          <img className={styles["logo-img"]} id="logo" src={tropperLogo} />
        </NavLink>
        <span>Imã Pay</span>
      </figure>
      <nav className={styles["nav-container"]}>
        <ul className={styles["nav-options"]}>
          <li className={styles["nav-option"]}>
            <a className={styles["nav-link"]} href="#">
              Sobre nós
            </a>
          </li>
          <li className={styles["nav-option"]}>
            <a className={styles["nav-link"]} href="#">
              Serviços
            </a>
          </li>
          <li className={styles["nav-option"]}>
            <a className={styles["nav-link"]} href="#">
              Perguntas
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles["login-signup-box"]}>
        <NavLink className={styles["signup-btn"]} to="/signup">
          Cadastrar-se
        </NavLink>
        <figure className={styles["login-box"]}>
          <NavLink className={styles["login-btn"]} to="/login">
            <span className={styles["login-text"]}>Login</span>
            <img className={styles["login-img"]} src={loginImg} />
          </NavLink>
        </figure>
      </div>
    </header>
  );
}
