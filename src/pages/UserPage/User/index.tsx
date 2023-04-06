import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-bold.svg";
import { Balance } from "../balance";
import HeaderUserPage from "../HeaderUserPage";
import Historic from "../historic";

export function UserPage() {
  const [userName, setUserName] = useState("Usuário");
  const [userList, setUserList] = useState([]);
  const [balance, setBalance] = useState(50);
  const [balanceAvailable, setBalanceAvailable] = useState(25);

  useEffect(() => {
    axios
      .get("http://localhost:3333/users")
      .then(({ data }) => setUserList(data));
  }, []);

  return (
    <div>
      <HeaderUserPage name={userName} />
      <Balance balance={balance} balanceAvailable={balanceAvailable} />
      <Historic users={userList} />
    </div>
  );
}
