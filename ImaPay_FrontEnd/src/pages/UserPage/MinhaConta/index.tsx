import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import X from "../../../assets/img/x-thin.svg";

export function MinhaConta() {
  const navigate = useNavigate();
  const handleHome = () => {
    return navigate("/user/");
  };
  return (
    <div className={styles["container"]}>
      <figure>
        <img src={X} onClick={handleHome} alt="um X indicando retorno" />
      </figure>
      <form className={styles["form-container"]}>
        <fieldset className={styles["form-container-set"]}>
          <legend>Dados pessoais</legend>
          <label>
            Conta:
            <input type="text" id="name" value="222" name="name" disabled />
          </label>
          <label>
            Name:
            <input type="text" id="name" value="Usuario" name="name" disabled />
          </label>
          <label>
            Agencia:
            <input type="text" id="name" value="4444-5" name="name" disabled />
          </label>
        </fieldset>
      </form>
    </div>
  );
}
