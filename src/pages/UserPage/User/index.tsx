import { useState } from "react";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-bold.svg";
import { Balance } from "../balance";
import HeaderUserPage from "../HeaderUserPage";

export function UserPage() {
  const [userName, setUserName] = useState("Usuário");
  const [balance, setBalance] = useState(50);
  return (
    <div>
      <HeaderUserPage name={userName} />
      <Balance balance={balance} />
    </div>
  );
}
