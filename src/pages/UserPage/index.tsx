import { useState } from "react";
import { Horse, Heart, Cube } from "@phosphor-icons/react";
import styles from "./style.module.css";
import Money from "../../assets/img/Money.png";

export function UserPage() {
  const [userName, setUserName] = useState("Usuário");
  const [balance, setBalance] = useState(0);
  return (
    <section className={styles["home-container"]}>
      <h1>Bem vindo {userName}</h1>
      <div className={styles["balance-container"]}>
        <img src={Money} alt="money" />
        <h2>Meu Saldo</h2>
        <p>Saldo disponível: R$: {balance.toFixed(2)}</p>
      </div>
    </section>
  );
}
