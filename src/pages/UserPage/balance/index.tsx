import { useState } from "react";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-thin.svg";
import EyeOpen from "../../../assets/img/eye-thin.svg";
import EyeClose from "../../../assets/img/eye-slash-thin.svg";
import Clockwise from "../../../assets/img/clock-counter-clockwise-thin.svg";
import Saque from "../../../assets/img/hand-coins-thin.svg";
import Historic from "../historic";

interface Props {
  balance: number;
  balanceAvailable: number;
}
export function Balance({ balance, balanceAvailable }: Props) {
  const [eye, setEye] = useState(EyeOpen);

  const ChanceClick = () => {
    if (eye === EyeOpen) setEye(EyeClose);
    if (eye === EyeClose) setEye(EyeOpen);
  };

  return (
    <section className={styles["home-container"]}>
      <section className={styles["balance"]}>
        <figure className={styles["balance-title"]}>
          <h2 className={styles["balance-title-h2"]}>Meu Saldo</h2>
          <img
            src={eye}
            alt="simbolo de um olho aberto que após o click muda para um olho fechado"
            onClick={ChanceClick}
            className={styles["balance-title-imagem"]}
          />
        </figure>
        <div className={styles["balance-container"]}>
          <div className={styles["balance-container-box"]}>
            <div className={styles["balance-container-total"]}>
              <figure className={styles["balance-container-img"]}>
                <img src={Money} alt="money" />
              </figure>
              <div className={styles["balance-value"]}>
                <h2 className={styles["balance-value-title"]}>Saldo total</h2>
                <p className={styles["balance-value-number"]}>
                  {eye === EyeOpen ? `R$ ${balance.toFixed(2)}` : "...."}
                </p>
                <div>última transação: 01-02-2023 &sdot; 08:15</div>
              </div>
            </div>

            <div className={styles["balance-container-available"]}>
              <figure className={styles["balance-container-img"]}>
                <img src={Saque} alt="money" />
              </figure>
              <div className={styles["balance-value"]}>
                <h2 className={styles["balance-value-title"]}>
                  Saldo disponível para saque
                </h2>
                <p className={styles["balance-value-number"]}>
                  {eye === EyeOpen
                    ? `R$ ${balanceAvailable.toFixed(2)}`
                    : "...."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    
  );
}
