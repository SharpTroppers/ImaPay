import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.css";
import X from "../../../assets/img/x-thin.svg";
import jwt_decode from "jwt-decode";

//import { string } from "yup";
interface UserProfile {
  userName: string;
  email: string;
}

interface Account {
  accountNumber: number;
  agency: number;
}
export function MinhaConta() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/user/");
  };
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

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

  const payload = jwt_decode(token) as { Id: string };
  console.log(payload);
  useEffect(() => {
    instance
      .get(`/users/${payload.Id}`)
      .then((response) => {
        setUserProfile(response.data.userProfile);
        setAccount(response.data.account);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!userProfile || !account) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles["container"]}>
      <figure className={styles["container-figure"]}>
        <img src={X} onClick={handleHome} alt="um X indicando retorno" />
      </figure>
      <form className={styles["form-container"]}>
        <fieldset className={styles["form-container-set"]}>
          <legend>Dados pessoais</legend>
          <label>
            Nome:
            <input value={userProfile.userName} disabled />
          </label>
          <label>
            Email:
            <input value={userProfile.email} disabled />
          </label>

          <label>
            Conta:
            <input value={account.accountNumber} disabled />
          </label>
          <label>
            Agencia:
            <input value={account.agency} disabled />
          </label>
        </fieldset>
      </form>
    </div>
  );
}
