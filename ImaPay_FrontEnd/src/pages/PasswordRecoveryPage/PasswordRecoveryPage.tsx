import { useState } from "react";
import { Form } from "../../components/Form";
import { Message } from "../../components/Message";
import { useNavigate } from "react-router";
import axios from "axios";

export function PasswordRecoveryPage() {
  const [isMessageShown, setIsMessageShown] = useState(false);

  function messageHandler() {
    setIsMessageShown(true);
  }

  return (
    <>
      {isMessageShown && (
        <Message message='Email enviado com sucesso, por favor confira sua caixa de entrada' />
      )}
      {!isMessageShown && (
        <Form
          labels={["Digite seu email"]}
          ids={["email"]}
          placeholders={["example@gmail.com"]}
          title={"Recuperação de senha"}
          messageHandler={messageHandler}
        />
      )}
    </>
  );
}
