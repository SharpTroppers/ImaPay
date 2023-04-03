import { useState } from "react";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-thin.svg";
import Eyeclose from "../../../assets/img/eye-slash-thin.svg";
import EyeOpen from "../../../assets/img/eye-thin.svg";

interface Props {
  balance: number;
}
export function Balance({ balance }: Props) {
  const [eye, setEye] = useState(EyeOpen);

  const OnChange = () => {
    if (eye === EyeOpen) setEye(Eyeclose);
    if (eye === Eyeclose) setEye(EyeOpen);
  };

  return (
    <section className={styles["home-container"]}>
      <section className={styles["balance"]}>
        <figure>
          <h2 className={styles["balance-title"]}>Meu Saldo</h2>
          <img src={eye} alt="" onClick={OnChange} />
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
                  R$: {balance.toFixed(2)}
                </p>
              </div>
            </div>
            <div className={styles["balance-container-available"]}>
              <figure className={styles["balance-container-img"]}>
                <img src={Money} alt="money" />
              </figure>
              <div className={styles["balance-value"]}>
                <h2 className={styles["balance-value-title"]}>
                  Saldo disponível para saque
                </h2>
                <p className={styles["balance-value-number"]}>
                  R$: {balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
