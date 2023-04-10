import { useState } from "react";
import { Form } from "../../components/Form";
import { Modal } from "../../components/Modal";
// import styles from "./PasswordRecoverPage.module.css";

export function PasswordRecoverPage() {
  let page;
  const [isSecondPage, setisSecondPage]=useState(false)
  const [isemailSend, setisEmailSend]=useState(false)
  function clickHandler(e:any){
    e.preventDefault()
    setisSecondPage(true)
    setisEmailSend(true)
  }
  if(isSecondPage){
    page= <Form
    firstLabel="Digite sua senha"
    firstField="Password"
    placeholder="********"
    secondLabel="Confirme a senha"
    secondField="password"
    title="Cadastre Nova senha"
    numberofinputs={2}
    clickHandler={clickHandler}
  />
  }
  else {
    page=<Form
    firstLabel="Digite seu email"
    firstField="email"
    placeholder="example@gmail.com"
    title="Recuperação de Senha"
    numberofinputs={1}
    clickHandler={clickHandler}
  />
  }
  return (
      page
  );
}
