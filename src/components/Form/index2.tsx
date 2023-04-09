import styles from "./style.module.css";
interface FormGroupProps {
    label?: string;
    field?: string;
    placeholder?: string;
  }
  export function FormGroup(props: FormGroupProps) {
    return (
      <div className={styles["div-group"]}>
         <form className={styles["forms"]}>
        <label htmlFor={props.field}>{props.label}</label>
        <input type={props.field} placeholder={props.placeholder} />
        </form>
      </div>
    );
  }