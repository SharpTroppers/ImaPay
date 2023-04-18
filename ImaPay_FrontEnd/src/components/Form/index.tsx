import { useRef, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

interface FormProps {
  labels: string[];
  ids: string[];
  placeholders: string[];
  title: string;
  clickHandler?: any;
  messageHandler?: any;
}

export function Form(props: FormProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const inputRefs = [firstInputRef, secondInputRef];

  async function sendEmail(e: any) {
    e.preventDefault();
    inputRefs[0].current?.focus();
    const data = { userEmail: inputRefs[0].current?.value };
    const headers = { "Content-Type": "application/json" };

    const response = await axios.post(
      "https://localhost:7274/users/recovery",
      JSON.stringify(data),
      { headers }
    );
    console.log(response);
    props.messageHandler();
  }

  let formContent;

  formContent = props.labels.map((label, i) => (
    <div key={i} className={styles["input-container"]}>
      <label htmlFor={props.ids[i]}>{label}</label>
      <input
        type={props.ids[i]}
        ref={inputRefs[i]}
        placeholder={props.placeholders[i]}
      />
    </div>
  ));

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>{props.title}</h2>
      <form
        onSubmit={props.ids[0] == "email" ? sendEmail : props.clickHandler}
        className={styles["forms"]}
      >
        {formContent}
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}
