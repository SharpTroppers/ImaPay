import { Form } from "../../components/Form";
// import styles from "./LoginPage.module.css";

export function LoginPage() {
  return <div>   
    <Form       
    firstLabel='Digite seu Email'
    secondLabel='Digite sua Senha'
    placeholder='example@gmail.com'
    firstField='email'
    title="teste"
    numberofinputs={2}
    />
</div>;
}
