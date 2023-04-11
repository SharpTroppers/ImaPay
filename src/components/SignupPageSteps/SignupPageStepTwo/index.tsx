import React, { useCallback, useEffect, useState } from 'react'
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { postalCodeFormatter } from '../../../controller/signupControllers/TextFormatterController';
import SignupHeader from '../../SignupHeader';
import { errorTagRender } from '../../../controller/signupControllers/ErrorMessageController';
import { addressDataSchema } from '../../../controller/signupControllers/YupController';


const SignupPageStepTwo = ({formData, setFormData, stepForward, stepBackward} : any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stateNamesArray, setStateNamesArray] = useState([]);

  const getStateNames = async () => {
    try {
    const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    setStateNamesArray(data)
    } catch (erro: any) {
      console.log('Erro na obtenção dos nomes dos estados: ', erro)
      setStateNamesArray([])
    }
  }

  useEffect(() => {
    getStateNames()
  }, [])

  const { register, handleSubmit, formState: { errors }, setValue, watch } = 
    useForm({
      mode: 'onChange',
      resetOptions: {keepValues: true},
      resolver: yupResolver(addressDataSchema(formData)),
    }
  );

  const onSubmit = (data: any) => {
    setFormData({...formData, ...data})
    stepForward();
  };

  const postalCodeNumber = watch('postalCode')
  const getPostalCodeAddressData = async (postalCodeCleanValue: string) => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${postalCodeCleanValue}/json/`);
      setTimeout(() => {
        const {
          logradouro, bairro, localidade, uf,
        } = data;
        setValue('baseAddress', logradouro || '', {shouldValidate: false})
        setValue('neighborhood', bairro || '', {shouldValidate: false})
        setValue('cityName', localidade || ''), {shouldValidate: false}
        const stateName: any = stateNamesArray.find((state: any) =>  state.sigla === uf)

        setValue('stateName', stateName?.nome || 'Error', {shouldValidate: false});
        setIsLoading(false)
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

 const postalCodeOnChangeHandler: any = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <SignupHeader/>
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
                  render={({ message }) => errorTagRender(message, styles)}
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
                    render={({ message }) => errorTagRender(message, styles)}
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
                    render={({ message }) => errorTagRender(message, styles)}
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
                    render={({ message }) => errorTagRender(message, styles)}
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
                    render={({ message }) => errorTagRender(message, styles)}
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
                    render={({ message }) => errorTagRender(message, styles)}
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

export default SignupPageStepTwo