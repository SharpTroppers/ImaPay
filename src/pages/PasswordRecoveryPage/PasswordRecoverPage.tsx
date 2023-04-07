import { Form } from "../../components/Form";
import styles from "./PasswordRecoverPage.module.css";

export function PasswordRecoverPage() {
  return (
    <div>
      <Form
        firstLabel='Digite seu email'
        secondLabel='Digite sua senha'
        placeholder='example@gmail.com'
        firstField='email'
      />
    </div>
  );
}
