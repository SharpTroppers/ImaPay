import { Form } from "../../components/Form";
// import styles from "./LoginPage.module.css";

export function LoginPage() {
  return <div>      
    <Form
    firstLabel='Digite seu email'
    secondLabel='Digite sua senha'
    placeholder='example@gmail.com'
    firstField='email'
    />
</div>;
}
