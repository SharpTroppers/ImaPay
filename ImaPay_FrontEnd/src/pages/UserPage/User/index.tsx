import { useState, useEffect } from "react";
import { Balance } from "../Balance";
import HeaderUserPage from "../HeaderUserPage";

import Historic from "../Historic";
import { Modal } from "../MenuModal";
import transferData from "../../../helpers/transferData.json";
import axios from "axios";
import jwt_Decode from "jwt-decode";

export function UserPage() {
  const [userName, setUserName] = useState("Usuário");
  // const [userList, setUserList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [balanceAvailable, setBalanceAvailable] = useState(25);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const instance = axios.create({
    baseURL: "https://localhost:7274",
    headers: {
      "Content-Type": "application",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("Token")!;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  // instance
  //   .get("/endpoint")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  const token = localStorage.getItem("Token")!;

  const payload = jwt_Decode(token) as { Id: string };
  useEffect(() => {
    instance
      .get(`/users/${payload.Id}`)
      .then((response) => {
        setUserName(response.data.userProfile.name);
        setBalance(response.data.account.balance);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <HeaderUserPage name={userName} />
      <Balance balance={balance} balanceAvailable={balance} />
      <Historic users={transferData} />
    </div>
  );
}
