import { useEffect, useState } from "react";
import SignupPageStepOne from "../../components/SignupPageSteps/SignupPageStepOne";
import SignupPageStepTwo from '../../components/SignupPageSteps/SignupPageStepTwo'
import SignupPageStepThree from '../../components/SignupPageSteps/SignupPageStepThree'
import styles from "./styles.module.css";
import SuccessfullSignup from "../../components/SignupPageSteps/SuccessfullSignup";

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
  accountName: '',
  password: ''
})

const stepForward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  console.log('foward', step, step + 1 < 2)
  if(step + 1 <= 3) setStep(step + 1)
}

const stepBackward = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  console.log('back')
  if(step - 1 >= 0) setStep(step - 1)
}

const stepsArray = [
  <SignupPageStepOne stepForward={stepForward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepTwo stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>, 
  <SignupPageStepThree stepForward={stepForward} stepBackward={stepBackward} formData={formData} setFormData={setFormData}/>,
  <SuccessfullSignup/>
]

const stepRender = (stepNumber: number) => {
  return stepsArray[stepNumber] 
}

  return (
    <div id={styles["signup-main-container"]}>
      <aside id={styles["side-image"]}/>
      {stepRender(step)}
    </div>
  );
}
