import React, { useCallback, useEffect, useState } from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message';

interface stepperHandler {
    stepperHandler: () => void
}

const SignupPageStepOne = ({formData, setFormData, stepForward, stepBackward, proceedToHomePage} : any) => {
  const errorListObjDefaultValues = {
    capitalLetterError: false,
    lowercaseLetterError: false,
    simbolError: false,
    numberError: false,
  }

  const [errorListObj, setErrorListObj] = useState ({...errorListObjDefaultValues})

  const schema = Yup.object({
    accountName: Yup
    .string()
    .min(3,'Digite um usuário válido'),
    password: Yup
    .string()
    .required("Digite uma senha")
    .min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    passwordConfirmation: Yup
    .string()
    .oneOf([Yup.ref("password")], "A senha e confirmação precisam ser identicas")
    .required("Repita a senha digitada acima"),
  })

  const errorTagRender = (message: string) =>  (<p className={styles['error-message']}>{message}</p>)

  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = 
    useForm({
      mode: 'onChange',
      resetOptions: {keepValues: true},
      resolver: yupResolver(schema, { abortEarly: false })
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
      <header className={styles["forms-header-container"]}>
          <h1 id={styles["header-title"]}>Registro Pessoa Física</h1>
      </header>
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
                  render={({ message }) => errorTagRender(message)}
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
                    render={({ message }) => errorTagRender(message)}
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
                    render={({ message }) => errorTagRender(message)}
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

export default SignupPageStepOne