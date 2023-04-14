import styles from "./style.module.css";

interface FormProps {
  firstLabel: string;
  firstField: string;
  secondLabel?: string;
  secondField?: string;
  placeholder?: string;
  title: string;
  numberofinputs: number;
  clickHandler?: any;
}

export function Form(props: FormProps) {
  let inputBox;
  if (props.numberofinputs == 1) {
    inputBox = (
      <div className={styles["input-container"]}>
        <label htmlFor={props.firstField}>{props.firstLabel}</label>
        <input type={props.firstField} placeholder={props.placeholder} />
      </div>
    );
  } else if (props.numberofinputs == 2) {
    inputBox = (
      <>
        <div className={styles["input-container"]}>
          <label htmlFor={props.firstField}>{props.firstLabel}</label>
          <input type={props.firstField} placeholder={props.placeholder} />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor={props.secondField}>{props.secondLabel}</label>
          <input type={props.secondField} placeholder={props.placeholder} />
        </div>
      </>
    );
  }
  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>{props.title}</h2>
      <form className={styles["forms"]}>
        {inputBox}
        <button type='submit' onClick={props.clickHandler}>
          Enviar
        </button>
      </form>
    </div>
  );
}
