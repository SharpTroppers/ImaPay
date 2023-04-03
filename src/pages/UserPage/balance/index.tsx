import { useState } from "react";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-bold.svg";
import useUser from "../../../../hooks/useUser";
import Historic, { User } from '../historic';


export function Balance() {
  const [balance, setBalance] = useState(50);
  const { 
    userList,
  } = useUser()

  return (
    <section className={styles["home-container"]}>
      <section className={styles["balance"]}>
        <h2>Meu Saldo</h2>
        <div className={styles["balance-container"]}>
          <div className={styles["balance-container-total"]}>
            <div>
              <figure className={styles["balance-container-img"]}>
                <img src={Money} alt="money" />
                <h2 className={styles["balance-container-value"]}>
                  Saldo total
                </h2>
              </figure>
              <p>R$: {balance.toFixed(2)}</p>
            </div>
            <div className={styles["balance-container-available"]}>
              <figure className={styles["balance-container-img"]}>
                <img src={Money} alt="money" />
                <h2 className={styles["balance-container-value"]}>
                  Saldo disponível para saque
                </h2>
              </figure>
              <p>R$: {balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>
      <div>
      <Historic
        users={userList} 
      />
       
</div>
    </section>
  );
}
