import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  id: number;
  valor: number;
  type: string;
  message: string;
}

const Transfer = ({ isOpen, onClose }: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors , isSubmitSuccessful },
  } = useForm<FormData>();

  const showToastMessage = () => {
    toast.success("Transferido com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
      className: styles["toast-message"],
      theme: "dark",
    });
    setTimeout(() => {
      onClose();
    }, 5500);
  };
  const onSubmit = (data: FormData) => {
    axios.post('https://localhost:7274/accounts/transfer', data)
    .then((response) => {
      //console.log(response.data);
    })
    .catch((error) =>{
      console.error(error);
    });
    //data.type = "Transferência";
    // alert(JSON.stringify(data));
    //showToastMessage();
  };

  React.useEffect(() => {
    if( formState.isSubmitSuccessful) {
        reset({
            id: 0,
            valor: 0,
            type:"",
            message:""
    });

    }
    },[formState, reset])

  if (!isOpen) return null;
  return (
    <div className={styles["modal-transfer"]} is-hidden="true">
      <div className={styles["modal-transfer-content"]}>
        <div>
          <span className={styles["Close"]} onClick={onClose}>
            &times;
          </span>
        </div>
        <label>Conta de destino</label>
        <input
          className={styles["input-value"]}
          type="string"
          placeholder="Número da conta ou documento"
          {...register("id", { required: true, minLength: 5 })}
        />
        {errors?.id?.type === "required" && (
          <p className={styles["error-message"]}>
            É necessário os dados da conta
          </p>
        )}
        {errors?.id?.type === "minLength" && (
          <p className={styles["error-message"]}>
            A conta precisa ter mais de 4 dígitos
          </p>
        )}
        <div>
          <label>Valor a ser transferido</label>
          <input
            className={styles["input-value"]}
            type="string"
            min="0.1"
            step={"any"}
            placeholder="Conta ou documento"
            {...register("valor", { required: true })}
          />
          {errors?.valor?.type === "required" && (
            <p className={styles["error-message"]}>
              É necessário informar um valor
            </p>
          )}
        </div>
        <div>
          <label>Mensagem (opcional)</label>
          <input
            className={styles["input-optMessage"]}
            type="text"
            {...register("message")}
          />
        </div>
        <div>
          <button
            className={styles["input-btn"]}
            onClick={() => handleSubmit(onSubmit)()}
          >
            Fazer transferência
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
  
};

export default Transfer;
