import styles from "./style.module.css";
import Exit from "../../../assets/img/exit.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export function HeaderUserPage() {
  const [userName, setUserName] = useState("Usuário");

  return (
    <header>
      <h1>Olá, {userName}</h1>
      <figure className={styles["header-imagem"]}>
        <Link to="/" className={styles["link"]}>
          <img src={Exit} alt="simbolo de saída da conta" />
          Sair
        </Link>
      </figure>
    </header>
  );
}
