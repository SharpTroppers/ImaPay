import React, { useCallback, useState } from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message';
import { subYears } from 'date-fns';
import axios from 'axios';


const SignupPageStepOne = ({formData, setFormData, stepForward, stepBackward} : any) => {
  const [isLoading, setIsLoading] = useState(false);
  const requiredMessage = "Campo obrigatório"

  const schema = Yup.object({
    postalCode: Yup.string().required(requiredMessage),
    baseAddress: Yup.string().required(requiredMessage),
    baseAddressNumber: Yup.string().required(requiredMessage),
    neighborhood:Yup.string().required(requiredMessage),
    cityName:Yup.string().required(requiredMessage),
    stateName:Yup.string().required(requiredMessage)
  })

  const errorTagRender = (message: string) =>  (<p className={styles['error-message']}>{message}</p>)

  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = 
    useForm({
      mode: 'onChange',
      resetOptions: {keepValues: true},
      resolver: yupResolver(schema),
    }
  );

  const onSubmit = (data: any, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, ...data})
    console.log(data)
    stepForward(event);
  };

  const postalCodeFormatter = (postalCodeCleanedValue: string) => {
    const postalCodeBlocksArray = [postalCodeCleanedValue.slice(0,2), postalCodeCleanedValue.slice(2,5), postalCodeCleanedValue.slice(5)]
    
      if(postalCodeBlocksArray[1].length >= 1) postalCodeBlocksArray[1] = '.' + postalCodeBlocksArray[1] 
      if(postalCodeBlocksArray[2].length >= 1) postalCodeBlocksArray[2] = '-' + postalCodeBlocksArray[2]
    return postalCodeBlocksArray.join('');
 }

  const postalCodeNumber = watch('postalCode')
  const getPostalCodeAddressData =async (postalCodeCleanValue: string) => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${postalCodeCleanValue}/json/`);
      setTimeout(() => {
        console.log('data', data)
        const {
          logradouro, bairro, localidade, uf,
        } = data;
        setValue('baseAddress', logradouro || '', {shouldValidate: false})
        setValue('neighborhood', bairro || '', {shouldValidate: false}),
        setValue('cityName', localidade || ''), {shouldValidate: false},
        setValue('stateName', uf || '', {shouldValidate: false});
        setIsLoading(false)
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  
 const postalCodeOnChangeHandler = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('lol3')
    const { value } = event.target;
    const postalCodeCleanValue = value.replace(/[^\d]/g, '');
    const formattedValue = postalCodeFormatter(postalCodeCleanValue);
    event.target.value = formattedValue

    if (postalCodeCleanValue.length !== 8) {
      return;
    }

    setIsLoading(true);
    await getPostalCodeAddressData(postalCodeCleanValue)
  },[postalCodeNumber])

  return (
    <>
    <main className={styles["main-container-style"]}>
      <header className={styles["forms-header-container"]}>
        <h1 id={styles["header-title"]}>Registro Pessoa Física</h1>
      </header>
    <SignupFormCloseUp/>
    <form 
      id={styles["form-container-style"]} 
      onSubmit={handleSubmit(onSubmit)}
    >
            <div className={styles["forms-sections-containers"]}>
              <label className={styles["labels-styling"]} htmlFor="postalCode">CEP</label>
              <input
              {...register('postalCode')}
                className={styles["inputs-style"]} 
                placeholder="00.000-000"
                onChange={postalCodeOnChangeHandler}
                maxLength={10}
              />
              <div className={styles['error-message-container']}>
                <ErrorMessage
                  errors={errors}
                  name='postalCode'
                  render={({ message }) => errorTagRender(message)}
                />
              </div>
            </div>
            <div className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="baseAddress">Endereço</label>
                {isLoading && <div className={styles["loading-spinner"]}/>}
                <input
                  disabled={isLoading}
                  {...register('baseAddress')}
                  className={styles["inputs-style"]}
                  placeholder={`Endereço base${isLoading ? '...' : ''}`}
                />
                <div className={styles['error-message-container']}>
                  <ErrorMessage
                    errors={errors}
                    name='baseAddress'
                    render={({ message }) => errorTagRender(message)}
                  />
                </div>
            </div>
            <div className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="baseAddressNumber">Número</label>
                <input 
                  {...register('baseAddressNumber')}
                  className={styles["inputs-style"]} 
                  placeholder={"Número"}
                />
                <div className={styles['error-message-container']}>
                  <ErrorMessage
                    errors={errors}
                    name='baseAddressNumber'
                    render={({ message }) => errorTagRender(message)}
                  />
                </div>
            </div>
            <div className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="neighborhood">Bairro</label>
                {isLoading && <div className={styles["loading-spinner"]}/>}
                <input 
                  {...register('neighborhood')} 
                  className={styles["inputs-style"]}
                  placeholder={`Bairro${isLoading ? '...' : ''}`}
                  disabled={isLoading}
                />
                <div className={styles['error-message-container']}>
                  <ErrorMessage
                    errors={errors}
                    name='neighborhood'
                    render={({ message }) => errorTagRender(message)}
                  />
                </div>
            </div>
            <div className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="cityName">Cidade</label>
                  <input 
                    {...register('cityName')} 
                    className={styles["inputs-style"]}
                    placeholder={`Cidade${isLoading ? '...' : ''}`}
                    disabled={isLoading}
                  />
                  {isLoading && <div className={styles["loading-spinner"]}/>}
                <div className={styles['error-message-container']}>
                  <ErrorMessage
                    errors={errors}
                    name='cityName'
                    render={({ message }) => errorTagRender(message)}
                  />
                </div>
            </div>
            <div className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="stateName">Estado</label>
                {isLoading && <div className={styles["loading-spinner"]}/>}
                <input 
                  {...register('stateName')} 
                  className={styles["inputs-style"]}
                  placeholder={`Estado${isLoading ? '...' : ''}`}
                  disabled={isLoading}
                />
                <div className={styles['error-message-container']}>
                  <ErrorMessage
                    errors={errors}
                    name='stateName'
                    render={({ message }) => errorTagRender(message)}
                  />
                </div>
            </div>
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
                disabled= {Object.keys(errors).length !== 0} 
                className={`${styles["submit-button-style"]} ${styles["no-button-style"]}`}
                type="submit" 
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