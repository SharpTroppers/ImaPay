import { useRef, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { BASE_URL } from "../../helpers/config";

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
  const thirdInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = [firstInputRef, secondInputRef, thirdInputRef];

  async function sendEmail(e: any) {
    e.preventDefault();
    inputRefs[0].current?.focus();
    const data = { Email: inputRefs[0].current?.value };
    const headers = { "Content-Type": "application/json" };

    setIsLoading(true);

    const response = await axios.post(
      `${BASE_URL}/recovery`,
      JSON.stringify(data),
      { headers }
    );
    setIsLoading(false);
    props.messageHandler();
  }

  async function changePassword(e: any) {
    e.preventDefault();
    const resetPasswordDto = {
      Cpf: inputRefs[0].current?.value,
      NewPassword: inputRefs[1].current?.value,
      PasswordConfirm: inputRefs[2].current?.value,
    };
    const headers = { "Content-Type": "application/json" };
    setIsLoading(true);

    const response = await axios.post(
      `${BASE_URL}/reset-password`,
      JSON.stringify(resetPasswordDto),
      { headers }
    );
    setIsLoading(false);
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
        onSubmit={props.ids[0] == "email" ? sendEmail : changePassword}
        className={styles["forms"]}
      >
        {formContent}
        <button type='submit'>{isLoading ? "Carregando..." : "Enviar"}</button>
      </form>
    </div>
  );
}
