import styles from "./style.module.css";
import { FormGroup } from "./index2";
interface FormProps {
  firstLabel?: string;
  firstField?: string;
  secondLabel?: string;
  secondField?: string;
  placeholder?: string;
}

export function Form(props: FormProps) {
  return (
    <div className={styles["container"]}>
    <form className={styles["forms"]}>
    <FormGroup
          label={props.firstLabel}
          field={props.firstField}
          placeholder={props.placeholder}
        />
      <div className={styles["div-group"]}>
        <label >{props.secondLabel}</label>
        <input type={props.secondField}/>
      </div >
      <button type='submit'>Enviar</button>
    </form>
    </div>
  );
}
