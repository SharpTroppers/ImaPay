import { useEffect, useState } from "react";
import SignupPageStepOne from "../../components/SignupPageSteps/SignupPageStepOne";
import SignupPageStepTwo from '../../components/SignupPageSteps/SignupPageStepTwo'
import SignupPageStepThree from '../../components/SignupPageSteps/SignupPageStepThree'
import styles from "./styles.module.css";

export function SignUpPage() {

  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log(step)
  }, [step])
  
  
//   const proceedToAddressStep = () => {
//     // event.preventDefault();
//     // create JSON file
//     window.location.href = "./signupStepTwo.html";
// }

// const proceedToHomePage = () => {
//     // event.preventDefault();
//     window.location.href = "../index.html";
// }

// const finishSignUp = () => {
//     // event.preventDefault();
//     // create JSON file
//     window.location.href = "./succesfullSignup.html";
// }

// const returnToUserData = () => {
//     // event.preventDefault();
//     window.location.href = "./signupStepOne.html";
// }
// const proceedToAccountData = () => {
//     // event.preventDefault();
//     // create JSON file
//     window.location.href = "./signupStepThree.html";
// }

// const toggleModal = () => {
//     // console.log('kk', modal.styles.display )
//     const modal = document.getElementById("modal-for-terms-of-service");
//     // if(modal.styles.display === "none") return modal.styles.display = "flex";
//     // return modal.styles.display = "flex";
// }

// const agreeToTermsAndService = (event) => {
//     const checkbox = document.getElementById("terms-and-services-checkbox");
//     // checkbox.checked = true;
//     // hideModal(event)
// }

// const showModal = (event) => {
//     const modal = document.getElementById("modal-for-terms-of-service");
//     // modal.styles.display = "flex";
// }

// const hideModal = () => {
//     const modal = document.getElementById("modal-for-terms-of-service");
//     // modal.styles.display = "none";
// }

// const toggleSubmitButton = () => {
//     const submitButton = document.getElementById("submit-button");
//     // const isDisabled = submitButton.disabled;
    
//     // if(isDisabled) return submitButton.disabled = false;
//     // submitButton.disabled = true;
// }

const stepForward = () => {
  if(step + 1 < 2) setStep(step + 1)
  console.log('lol', step)
}

const stepBackward = () => {
  if(step - 1 >= 0) setStep(step - 1)
  console.log('lol', step)
}

const stepsArray = [<SignupPageStepOne stepForward={stepForward}/>, <SignupPageStepTwo stepForward={stepForward}/>, <SignupPageStepThree stepForward={stepForward}/>]

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
