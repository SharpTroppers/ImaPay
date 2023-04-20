import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./style.module.css";
// import Money from "../../../assets/img/money-bold.svg";
import { Balance } from "../Balance";
import HeaderUserPage from "../HeaderUserPage";
import Historic from "../Historic";

import transferData from "../../../helpers/transferData.json";

export function UserPage() {
  const [userName, setUserName] = useState("Usuário");
  // const [userList, setUserList] = useState([]);
  const [balance, setBalance] = useState(50);
  const [balanceAvailable, setBalanceAvailable] = useState(25);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3333/users")
  //     .then(({ data }) => setUserList(data));
  // }, []);

  return (
    <div onClick={handleClick}>
      <HeaderUserPage name={userName} />
      <Balance balance={balance} balanceAvailable={balanceAvailable} />
      <Historic users={transferData} />
    </div>
  );
}
