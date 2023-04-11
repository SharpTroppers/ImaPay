import React, { useState } from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message';
import { accountDataSchema } from '../../../controller/signupControllers/YupController';
import { errorTagRender } from '../../../controller/signupControllers/ErrorMessageController';
import SignupHeader from '../../SignupHeader';

const SignupPageStepThree = ({formData, setFormData, stepForward, stepBackward} : any) => {
  const errorListObjDefaultValues = {
    capitalLetterError: false,
    lowercaseLetterError: false,
    simbolError: false,
    numberError: false,
  }
  const [errorListObj, setErrorListObj] = useState ({...errorListObjDefaultValues})

  const { register, handleSubmit, formState: { errors } } = 
    useForm({
      mode: 'onChange',
      resetOptions: {keepValues: true},
      resolver: yupResolver(accountDataSchema())
    }
  );

  const onSubmit = (data: any) => {
    setFormData({...formData, ...data})
    stepForward();
  };

  const passwordOnchangeVerificationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    if(value === '') return setErrorListObj(errorListObjDefaultValues)
    let errorListObjCopy = {...errorListObj}
    errorListObjCopy.capitalLetterError = /^[^A-Z]*$/.test(value)
    errorListObjCopy.lowercaseLetterError = /^[^a-z]*$/.test(value)
    errorListObjCopy.simbolError = /^[a-zA-Z0-9]*$/.test(value)
    errorListObjCopy.numberError = /^[^\d]*$/.test(value)

    setErrorListObj(errorListObjCopy)
  }

  return (
    <>
    <main className={styles["main-container-style"]}>
      <SignupFormCloseUp/>
      <SignupHeader/>
      <form 
      id={styles["form-container-style"]} 
      onSubmit={handleSubmit(onSubmit)}
      >
          <section className={styles["forms-sections-containers"]}>
              <label className={styles["labels-styling"]} htmlFor="accountName">Nome da Conta</label>
              <input 
                {...register('accountName')} 
                className={styles["inputs-style"]}
                id={styles["account-name"]}
                placeholder="Nome da Conta"
              />
              <div className={styles['error-message-container']}>
                <ErrorMessage
                  errors={errors}
                  name='accountName'
                  render={({ message }) => errorTagRender(message, styles)}
                />
              </div>
          </section>
          <section className={styles["forms-sections-containers"]}>
              <label className={styles["labels-styling"]} htmlFor="password">Senha</label>
              <input 
                {...register('password')} 
                type="password"
                className={styles["inputs-style"]}
                onChange={passwordOnchangeVerificationHandler}
                id={styles["password"]}
              />
              <div className={styles['error-message-container']}>
                <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({ message }) => errorTagRender(message, styles)}
                />
              </div>
          </section>
          <section className={styles["forms-sections-containers"]}>
              <label className={styles["labels-styling"]} htmlFor="passwordConfirmation">Confirmação de senha</label>
              <input 
                {...register('passwordConfirmation')} 
                type="password"
                className={styles["inputs-style"]}
                id={styles["password-confirmation"]}
              />
              <div className={styles['error-message-container']}>
                <ErrorMessage
                    errors={errors}
                    name='passwordConfirmation'
                    render={({ message }) => errorTagRender(message, styles)}
                  />
              </div>
          </section>
          <section 
            className={styles["forms-sections-containers"]}
            id={styles["forms-sections-container-for-password-checkup"]}
          >
              <p className={errorListObj.capitalLetterError ? styles["error-message-style"] : ''}>* Uma letra maiuscula.</p>
              <p className={errorListObj.lowercaseLetterError ? styles["error-message-style"] : ''}>* Uma letra minuscula.</p>
              <p className={errorListObj.simbolError ? styles["error-message-style"] : ''}>* Um simbolo.</p>
              <p className={errorListObj.numberError ? styles["error-message-style"] : ''}>* Um número.</p>
          </section>
          <nav id={styles["nav-button-container"]}>
          <button 
                  className={`${styles["submit-button-style"]} ${styles["no-button-style"]}`}
                  id={styles["submit-button-style-back"]}
                  onClick={stepBackward}
                  type='button'
                  >
                  VOLTAR
                </button>
              <button 
                className={`${styles["submit-button-style"]} ${styles["no-button-style"]}`}
                id={styles["finalizing-form-button"]}
              >
                FINALIZAR CADASTRO
              </button>
          </nav>
      </form>
    </main>
  </>
)
}

export default SignupPageStepThree