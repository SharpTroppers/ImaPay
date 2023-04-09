import React, {useEffect, useState} from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {cpf} from 'cpf-cnpj-validator'
import { ErrorMessage } from '@hookform/error-message';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { format, subYears } from 'date-fns';


const SignupPageStepOne = ({stepForward, formData, setFormData} : any) => {
  const TermsAndServiceModal = React.lazy(() => import('../../TermsAndServiceModal'));
  const [modalController, setModalController] = useState(false);
  const [checkboxStatusController, setCheckboxStatusController] = useState(false)

  useEffect(()=>{
    setValue('termsAndServices', checkboxStatusController)
  },[checkboxStatusController])
  

  const requiredMessage = "Campo obrigatório"
  const maxDate = subYears(new Date(), 18);
  const minDate = subYears(new Date(), 100);

  const schema = Yup.object({
    userName: Yup.string()
      .required(requiredMessage)
      .min(3, 'Insira um nome válido')
      .test('has-invalid-character', 'Não utilize caracteres especiais', (value: string) => /^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$/.test(value))
      .default(formData.userName),
    email: Yup.string()
      .email('Digite um email válido')
      .required(requiredMessage)
      .default(formData.email),
    cpf: Yup.string()
      .required(requiredMessage)
      .test('cpf-valido', 'CPF inválido', (value: any) => cpf.isValid(value))
      .default(formData.cpf),
    cellphone: Yup.string()
      .required(requiredMessage)
      .min(16, 'Digite um telefone válido')
      .default(formData.cellphone),
    birthday: Yup.date()
      .required()
      .nullable()
      .transform((dateValue: Date) => dateValue instanceof Date ? dateValue : null)
      .min(minDate, 'Insira uma data válida')
      .max(maxDate, 'Você precisa ter pelo menos 18 anos.')
      .typeError('Insira uma data válida'),
      termsAndServices: Yup.boolean()
      .oneOf([true], 'Você precisa ler e aceitar os termos de serviços.')
      .default(formData.birthday)
  })

  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm({
    mode: 'all',
    resetOptions: {keepValues: true},
    resolver: yupResolver(schema),
    defaultValues: {...formData}
  });

  
  const onSubmit = (data: any, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, ...data})
    console.log(data)
    stepForward(event);
  };

  const cpfFormatter = (cpfNumber: string) => {
     const cleanedValue = cpfNumber.replace(/[^\d]/g, '');
     const cpfBlocksArray = [cleanedValue.slice(0,3), cleanedValue.slice(3,6), cleanedValue.slice(6,9), cleanedValue.slice(9)]
     
     for(let i = 1; i < 3; i++){
       if(cpfBlocksArray[i].length >= 1) cpfBlocksArray[i] = '.' + cpfBlocksArray[i] 
      }
      if(cpfBlocksArray[3].length >= 1) cpfBlocksArray[3] = '-' + cpfBlocksArray[3]
     return cpfBlocksArray.join('');
  }

  const cpfOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = cpfFormatter(value);
    event.target.value = formattedValue
  };

  const agreeToTermsAndService = () =>{
    toogleModal(false)
    setCheckboxStatusController(true)
  }
  const toogleModal = (booleanValue: boolean) =>{
    setModalController(booleanValue)
  }

  const cellphoneFormatter = (cellphoneNumber: string) => {
    const cleanedValue = cellphoneNumber.replace(/[^\d]/g, '');
    const cellphoneBlocksArray = [cleanedValue.slice(0,2), cleanedValue.slice(2,3), cleanedValue.slice(3,7), cleanedValue.slice(7)]

    if(cellphoneBlocksArray[0].length >= 1) cellphoneBlocksArray[0] = '(' + cellphoneBlocksArray[0]
    if(cellphoneBlocksArray[1].length >= 1) cellphoneBlocksArray[1] =  ') ' + cellphoneBlocksArray[1]
    if(cellphoneBlocksArray[2].length >= 1) cellphoneBlocksArray[2] =  ' ' + cellphoneBlocksArray[2]
    if(cellphoneBlocksArray[3].length >= 1) cellphoneBlocksArray[3] =  '-' + cellphoneBlocksArray[3]

    return cellphoneBlocksArray.join('');
 }

  const cellphoneOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const { value } = event.target;
    const formattedValue = cellphoneFormatter(value);
    event.target.value = formattedValue
  }

  return (
    <>
    {modalController && (
      <React.Suspense fallback={<div>Loading...</div>}>
        <TermsAndServiceModal toogleModal={toogleModal} agreeToTermsAndService={agreeToTermsAndService}/>
      </React.Suspense>
    )}
    <main className={styles["main-container-style"]}>
      <header className={styles["forms-header-container"]}>
        <h1 id={styles["header-title"]}>Registro Pessoa Física</h1>
      </header>
    <SignupFormCloseUp/>
    <form id={styles["form-container-style"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]} >Nome</label>
        <input 
        {...register('userName')}
        className={styles["inputs-style"]} 
        placeholder="Nome Completo"
        />
        <div className={styles['error-message-container']}>
            <ErrorMessage
          errors={errors}
          name='userName'
          render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>
      </div>
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]} >Email</label>
        <input {...register('email')} className={styles["inputs-style"]} placeholder="exemplo@banco.email.com" />
        <div className={styles['error-message-container']}>
            <ErrorMessage
          errors={errors}
          name='email'
          render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>
      </div>
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]} >CPF</label>
        <input 
          {...register('cpf')} 
          maxLength={14}
          onChange={cpfOnChangeHandler} 
          className={styles["inputs-style"]}  
          placeholder="000.000.000-00" 
        />
        <div className={styles['error-message-container']}>
            <ErrorMessage
          errors={errors}
          name='cpf'
          render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>
      </div>
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]}>Celular</label>
        <input {...register('cellphone')} 
        className={styles["inputs-style"]}  
        placeholder="(99) 9 9999-9999" 
        onChange={cellphoneOnChangeHandler}
        maxLength={16}
        />
        <div className={styles['error-message-container']}>
            <ErrorMessage
          errors={errors}
          name='cellphone'
          render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>
      </div>
      
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]}>
          Data de nascimento
        </label>
       <Controller
        control={control}
        name='birthday'
        render={({ field:{onChange, ...fieldProps} }) => (
          <Flatpickr
            {...fieldProps}
            className={styles["inputs-style"]} id={styles["birthday-container"]}            
            options={{ 
              dateFormat: 'd/m/Y', 
              mode: 'single',
            }}
            placeholder='Escolha uma data'
            onChange={(date, dateString ) => {
              onChange(date)
            }}
            
          />
          )}
          />
        <div className={styles['error-message-container']}>
            <ErrorMessage
          errors={errors}
          name='birthday'
          render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>
      </div>
      <div id={styles["terms-and-services-container"]}>
        <input 
        type="checkbox" 
        id={styles["terms-and-services-checkbox"]}
        {...register("termsAndServices")}
        onChange={() => setCheckboxStatusController(!checkboxStatusController)}
        />
        <p id={styles["terms-and-services-text"]}>Li e concordo com os{ ' ' }  
          <a 
          onClick={() => toogleModal(true)}
          >Termos de Serviço</a>
        </p>
      </div>
        <div 
          className={styles['error-message-container']}
          id={styles['terms-and-services-error-container']}
        >
          <ErrorMessage
            errors={errors}
            name='termsAndServices'
            render={({message}) => <p className={styles['error-message']}>{message}</p>}
          />
        </div>

      <nav id={styles["nav-button-container"]}>
        <button 
          disabled= {Object.keys(errors).length !== 0} 
          title="Preencha todos os campos"
          className={`${styles["submit-button-style"]} ${styles["no-button-style"]}`} 
          >
            PRÓXIMO
        </button>
      </nav>
    </form>
  </main>
  </>
)
}

export default SignupPageStepOne