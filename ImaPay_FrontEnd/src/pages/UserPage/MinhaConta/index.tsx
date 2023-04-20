import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.css";
import X from "../../../assets/img/x-thin.svg";
import { string } from "yup";
interface UserProfile {
  name: string;
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

  useEffect(() => {
    axios
      .get("https://localhost:7274/users/1")
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
            <input value={userProfile.name} disabled />
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
