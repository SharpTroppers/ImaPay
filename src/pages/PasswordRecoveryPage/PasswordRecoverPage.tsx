import { useState } from "react";
import { Form } from "../../components/Form";
import { Message } from "../../components/Message";
import { useNavigate } from "react-router";
// import styles from "./PasswordRecoverPage.module.css";

export function PasswordRecoverPage() {
  const [isSecondPage, setisSecondPage] = useState(false);
  const [isEmailMessageActive, setIsEmailMessageActive] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const navigate = useNavigate();

  let form;

  function emailMessageHandler() {
    setIsEmailMessageActive(false);
  }

  function passwordChangeHandler() {
    setIsPasswordChanged(false);
    navigate("/login");
  }

  function sendEmail(e: any) {
    e.preventDefault();
    setisSecondPage(true);
    setIsEmailMessageActive(true);
  }

  function changePassword(e: any) {
    e.preventDefault();
    setIsPasswordChanged(true);
  }
  if (isSecondPage) {
    form = (
      <Form
        firstLabel='Digite sua senha'
        firstField='Password'
        placeholder='********'
        secondLabel='Confirme a senha'
        secondField='password'
        title='Cadastre Nova senha'
        numberofinputs={2}
        clickHandler={changePassword}
      />
    );
  } else {
    form = (
      <Form
        firstLabel='Digite seu email'
        firstField='email'
        placeholder='example@gmail.com'
        title='Recuperação de Senha'
        numberofinputs={1}
        clickHandler={sendEmail}
      />
    );
  }
  return (
    <>
      {!isEmailMessageActive && !isPasswordChanged && form}
      {isEmailMessageActive && (
        <Message
          message='Email enviado com sucesso!, por favor confira a sua caixa de entrada'
          handler={emailMessageHandler}
          buttonText='Proximo'
        />
      )}
      {isPasswordChanged && (
        <Message
          message='Senha alterada com sucesso!'
          handler={passwordChangeHandler}
          buttonText='Login'
        />
      )}
    </>
  );
}
