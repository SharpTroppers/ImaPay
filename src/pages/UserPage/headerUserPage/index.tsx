import styles from "./style.module.css";
import Exit from "../../../assets/img/exit.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
}
export default function HeaderUserPage({ name }: Props) {
  return (
    <header className={styles["header-container"]}>
      <h1>Olá, {name} </h1>
      <figure className={styles["header-imagem"]}>
        <Link to="/" className={styles["link"]}>
          <img src={Exit} alt="simbolo de saída da conta" />
          Sair
        </Link>
      </figure>
    </header>
  );
}
