import styles from "./style.module.css";

interface MessageProps {
  message: string;
}

export function Message(props: MessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{props.message}</div>
      {/* <button className={styles["confirm-button"]} onClick={props.handler}>
        {props.buttonText}
      </button> */}
    </div>
  );
}
