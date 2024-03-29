import { useState } from "react";
import { Form } from "../../components/Form";
import { Message } from "../../components/Message";

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
          labels={[
            "Digite seu cpf",
            "Digite sua nova senha",
            "Confirme a senha",
          ]}
          ids={["cpf", "password", "password"]}
          placeholders={["000", "********", "********"]}
          title={"Cadastro de nova senha"}
          messageHandler={messageHandler}
        />
      )}
    </>
  );
}
