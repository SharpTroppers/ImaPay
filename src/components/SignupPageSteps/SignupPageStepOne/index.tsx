import React, {FormEvent, useEffect, useState} from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import {string, object, date} from 'yup'
import {cpf} from 'cpf-cnpj-validator'
import { ErrorMessage } from '@hookform/error-message';
import TermsAndServiceModal from '../../TermsAndServiceModal';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { format, parse, subYears } from 'date-fns';


const SignupPageStepOne = ({stepForward, formData, setFormData} : any) => {
  const [modalController, setModalController] = useState(false);
  const [termsAndServiceCheckbox, setTermsAndServiceCheckbox] = useState(false);
  const minDate = subYears(new Date(), 18);
  const maxDate = subYears(new Date(), 100);


  useEffect(() => {
    for (const [keyName, propertyValue] of Object.entries(formData)) {
        setValue(keyName, propertyValue);
    }
  }, [])
  

  const requiredMessage = "Campo obrigatório"
  
  const schema = object({
    userName: string()
      .required(requiredMessage)
      .min(3, 'Insira um nome válido')
      .test('has-invalid-character', 'Não utilize caracteres especiais', (value: string) => /^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$/.test(value)),
    email: string()
      .email('Digite um email válido')
      .required(requiredMessage),
    cpf: string()
      .required(requiredMessage)
      .test('cpf-valido', 'CPF inválido', (value: any) => cpf.isValid(value)),
    cellphone: string()
      .required(requiredMessage)
      .min(16, 'Digite um telefone válido'),
    birthday: date()
      .required()
      .nullable()
      .transform((dateValue: Date) => dateValue instanceof Date ? dateValue : null)
      .min(new Date(), 'Você precisa ter pelo menos 18 anos.')
      .typeError('Insira uma data valida')
  })

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
    mode: 'onBlur',
    resetOptions: {keepValues: true},
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data: any, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, ...data})
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
    return event.target.value = formattedValue
  };

  const agreeToTermsAndService = () =>{
    setModalController(false)
    setTermsAndServiceCheckbox(true)
  }
  const hideModal = () =>{
    setModalController(false)
  }

  const showModal = () =>{
    setModalController(true)
  }

  const toggleTermsAndServicesCheckbox = () => {
    setTermsAndServiceCheckbox(!termsAndServiceCheckbox)
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
    return event.target.value = formattedValue
  }

  return (
    <>
    {modalController && <TermsAndServiceModal hideModal={hideModal} agreeToTermsAndService={agreeToTermsAndService}/>}
    <main className={styles["main-container-style"]}>
      <header className={styles["forms-header-container"]}>
        <h1 id={styles["header-title"]}>Registro Pessoa Física</h1>
      </header>
    <SignupFormCloseUp/>
    <form id={styles["form-container-style"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["forms-sections-containers"]}>
        <label className={styles["labels-styling"]} >Nome</label>
        <input 
        {...register('userName')
          //, pattern:/^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$/ 
        }
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
        <input {...register('email')} className={styles["inputs-style"]} placeholder="exemplo@bankmail.com" />
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
            className={styles["inputs-style"]} id={styles["data-de-nascimento"]}            
            options={{ 
              dateFormat: 'd/m/Y', 
              minDate: minDate,
              mode: 'single'
            }}
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
        <input type="checkbox" id={styles["terms-and-services-checkbox"]} checked={termsAndServiceCheckbox}  onChange={toggleTermsAndServicesCheckbox}/>
        <p id={styles["terms-and-services-text"]}>Li e concordo com os{ ' ' }  
          <a 
          onClick={showModal}
          >Termos de
            Serviço</a>
        </p>
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