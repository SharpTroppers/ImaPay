import React, { useEffect, useState } from "react";
import SignupFormCloseUp from "../SingupFormCloseButton";
import styles from "./styles.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import {
  cellphoneFormatter,
  cpfFormatter,
} from "../../../controller/signupControllers/TextFormatterController";
import { userDataSchema } from "../../../controller/signupControllers/YupController";
import SignupHeader from "../../SignupHeader";
import { errorTagRender } from "../../../controller/signupControllers/ErrorMessageController";
import { stepProps } from "../../../models/signupForm";
import { cellphoneFormatter, cpfFormatter } from '../../../controller/signupControllers/TextFormatterController';
import { userDataSchema } from '../../../controller/signupControllers/YupController';
import SignupHeader from '../../SignupHeader';
import { errorTagRender } from '../../../controller/signupControllers/ErrorMessageController';

const SignupPageStepOne = ({
  stepForward,
  formData,
  setFormData,
}: stepProps) => {
  const TermsAndServiceModal = React.lazy(
    () => import("../../TermsAndServiceModal")
  );

const SignupPageStepOne = ({stepForward, formData, setFormData} : any) => {
  const TermsAndServiceModal = React.lazy(() => import('../../TermsAndServiceModal'));
  const [modalController, setModalController] = useState(false);
  const [checkboxStatusController, setCheckboxStatusController] =
    useState(false);

  useEffect(() => {
    setValue("termsAndServices", checkboxStatusController);
  }, [checkboxStatusController]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resetOptions: { keepValues: true },
    resolver: yupResolver(userDataSchema(formData)),
    defaultValues: { ...formData },
  });

  const onSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    stepForward();
  };

  const cpfOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = cpfFormatter(value);
    event.target.value = formattedValue;
  };

  const agreeToTermsAndService = () => {
    toogleModal(false);
    setCheckboxStatusController(true);
  };

  const toogleModal = (booleanValue: boolean) => {
    setModalController(booleanValue);
  };

  const cellphoneOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const formattedValue = cellphoneFormatter(value);
    event.target.value = formattedValue;
  };

  return (
    <>
      {modalController && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <TermsAndServiceModal
            toogleModal={toogleModal}
            agreeToTermsAndService={agreeToTermsAndService}
          />
        </React.Suspense>
      )}
      <main className={styles["main-container-style"]}>
        <SignupHeader />
        <SignupFormCloseUp />
        <form
          id={styles["form-container-style"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["forms-sections-containers"]}>
            <label className={styles["labels-styling"]}>Nome</label>
            <input
              {...register("userName")}
              className={styles["inputs-style"]}
              placeholder='Nome Completo'
            />
            <div className={styles["error-message-container"]}>
              <ErrorMessage
                errors={errors}
                name='userName'
                render={({ message }) => errorTagRender(message, styles)}
              />
            </div>
          </div>
          <div className={styles["forms-sections-containers"]}>
            <label className={styles["labels-styling"]}>Email</label>
            <input
              {...register("email")}
              className={styles["inputs-style"]}
              placeholder='exemplo@banco.email.com'
            />
            <div className={styles["error-message-container"]}>
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ message }) => errorTagRender(message, styles)}
              />
            </div>
          </div>
          <div className={styles["forms-sections-containers"]}>
            <label className={styles["labels-styling"]}>CPF</label>
            <input
              {...register("cpf")}
              maxLength={14}
              onChange={cpfOnChangeHandler}
              className={styles["inputs-style"]}
              placeholder='000.000.000-00'
            />
            <div className={styles["error-message-container"]}>
              <ErrorMessage
                errors={errors}
                name='cpf'
                render={({ message }) => errorTagRender(message, styles)}
              />
            </div>
          </div>
          <div className={styles["forms-sections-containers"]}>
            <label className={styles["labels-styling"]}>Celular</label>
            <input
              {...register("cellphone")}
              className={styles["inputs-style"]}
              placeholder='(99) 9 9999-9999'
              onChange={cellphoneOnChangeHandler}
              maxLength={16}
            />
            <div className={styles["error-message-container"]}>
              <ErrorMessage
                errors={errors}
                name='cellphone'
                render={({ message }) => errorTagRender(message, styles)}
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
              render={({ field: { onChange, ...fieldProps } }) => (
                <Flatpickr
                  {...fieldProps}
                  className={styles["inputs-style"]}
                  id={styles["birthday-container"]}
                  options={{
                    dateFormat: "d/m/Y",
                    mode: "single",
                  }}
                  placeholder='Escolha uma data'
                  onChange={(date, dateString) => {
                    onChange(date);
                  }}
                />
              )}
            />
            <div className={styles["error-message-container"]}>
              <ErrorMessage
                errors={errors}
                name='birthday'
                render={({ message }) => errorTagRender(message, styles)}
              />
            </div>
          </div>
          <div id={styles["terms-and-services-container"]}>
            <input
              type='checkbox'
              id={styles["terms-and-services-checkbox"]}
              {...register("termsAndServices")}
              onChange={() =>
                setCheckboxStatusController(!checkboxStatusController)
              }
            />
            <p id={styles["terms-and-services-text"]}>
              Li e concordo com os{" "}
              <a onClick={() => toogleModal(true)}>Termos de Serviço</a>
            </p>
          </div>
          <div
            className={styles["error-message-container"]}
            id={styles["terms-and-services-error-container"]}
          >
            <ErrorMessage
              errors={errors}
              name='termsAndServices'
              render={({ message }) => errorTagRender(message, styles)}
            />
          </div>

          <nav id={styles["nav-button-container"]}>
            <button
              disabled={Object.keys(errors).length !== 0}
              title='Preencha todos os campos'
              className={`${styles["submit-button-style"]} ${styles["no-button-style"]}`}
            >
              PRÓXIMO
            </button>
          </nav>
        </form>
      </main>
    </>
  );
};

export default SignupPageStepOne;
