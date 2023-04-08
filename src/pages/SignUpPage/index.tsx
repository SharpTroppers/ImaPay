import { useEffect, useState } from "react";
import SignupPageStepOne from "../../components/SignupPageSteps/SignupPageStepOne";
import SignupPageStepTwo from '../../components/SignupPageSteps/SignupPageStepTwo'
import SignupPageStepThree from '../../components/SignupPageSteps/SignupPageStepThree'
import styles from "./styles.module.css";

export function SignUpPage() {

const [step, setStep] = useState(0);
const [formData, setFormData] = useState({
  userName:'',
  email:'',
  cpf:'',
  cellphone:'',
  birthday:''
})

const stepForward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  if(step + 1 < 2) setStep(step + 1)
}

const stepBackward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  if(step - 1 >= 0) setStep(step - 1)
}

const stepsArray = [
  <SignupPageStepOne stepForward={stepForward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepTwo stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepThree stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>
]

const stepRender = (stepNumber: number) => {
  return stepsArray[stepNumber]
}

  return (
    <div id={styles["signup-main-container"]}>
  <section id={styles["modal-for-terms-of-service"]}>
    <main id={styles["modal-text-container"]}>
      <header id={styles["modal-header-container"]}>
        <h1>Termos de Serviço</h1>
      </header>
      <article id={styles["modal-content-container"]}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem debitis at est facere culpa praesentium
          quos
          necessitatibus distinctio cumque consectetur beatae quas, laborum delectus eligendi illum, magnam maxime
          quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolores ipsum, sapiente reprehenderit
          inventore modi eum.
        </p>
      </article>

      <footer id={styles["modal-footer-container"]}>
        <button className={styles["modal-buttons-style"]} id={styles["agree-button"]} onClick={() => agreeToTermsAndService()}>
          CONCORDO
        </button>
        <button className={styles["modal-buttons-style"]} id={styles["disagree-button"]} onClick={() => hideModal()}>
          CANCELAR
        </button>
      </footer>
    </main>
  </section>

  <aside id={styles["side-image"]}>
  </aside>
  {stepRender(step)}
</div>
  );
}
