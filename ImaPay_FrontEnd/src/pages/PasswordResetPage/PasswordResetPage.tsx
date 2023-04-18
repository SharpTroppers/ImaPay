import { useState } from "react";
import { Form } from "../../components/Form";
import { Message } from "../../components/Message";
import { useNavigate } from "react-router";
import axios from "axios";

export function PasswordResetPage() {
  const [isMessageShown, setIsMessageShown] = useState(false);

  function messageHandler() {
    setIsMessageShown(true);
  }

  return (
    <>
      {isMessageShown && (
        <Message message='Sua senha foi alterada com sucesso!' />
      )}
      {!isMessageShown && (
        <Form
          labels={["Digite sua nova senha", "Confirme a senha"]}
          ids={["password", "password"]}
          placeholders={["********", "********"]}
          title={"Cadastro de nova senha"}
          messageHandler={messageHandler}
        />
      )}
    </>
  );
}
