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
  birthday:'',
  baseAddress:'',
  baseAddressNumber:'',
  neighborhood:'',
  cityName:'',
  stateName:'',
})

const stepForward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  console.log('foward', step, step + 1 < 2)
  if(step + 1 <= 2) setStep(step + 1)
}

const stepBackward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  console.log('back')
  if(step - 1 >= 0) setStep(step - 1)
}

const stepsArray = [
  <SignupPageStepOne stepForward={stepForward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepTwo stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepThree stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>
]

const stepRender = (stepNumber: number) => {
  return stepsArray[2] 
}

  return (
    <div id={styles["signup-main-container"]}>
      <aside id={styles["side-image"]}/>
      {stepRender(step)}
    </div>
  );
}
