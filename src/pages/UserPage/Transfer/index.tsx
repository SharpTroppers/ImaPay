import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ModalProps{
    isOpen: boolean,
    onClose:()=> void;
}

interface FormData{
    account: number,
    value: number;
    message: string;
}


const Transfer = ({isOpen,onClose}: ModalProps)=> {
    
    const {
         register,
         handleSubmit,
         formState: { errors },
         } = useForm<FormData>();

    const showToastMessage = () =>{
        toast.success("Teste", {
            position: toast.POSITION.TOP_CENTER,
            className: styles["toast-message"],
        });
        setTimeout(() =>{
            onClose();
        }, 5500) 
        
        
    }
    const onSubmit = (data: FormData) =>{
        // alert(JSON.stringify(data));
        showToastMessage();
        
       
    };
    if(!isOpen) return null;
    return(
        <div className={styles["modal-transfer"]} is-hidden="true" >
            
            <div className={styles["modal-transfer-content"]}>
                <div >
                <span
                 className={styles["Close"]}
                 onClick={onClose}
                 >&times;
                 </span>
                </div >
                <label>Conta de destino</label>
                <input 
                className={styles["input-account"]}
                type ="number"
                placeholder="Número da conta ou documento"
                {...register("account", {required: true, minLength: 5})}
                />
                {errors?.account?.type ==="required" &&
                (<p className={styles["error-message"]}>É necessário os dados da conta</p>)}
                {errors?.account?.type ==="minLength" && 
                (<p className={styles["error-message"]}>A conta precisa ter mais de 4 dígitos</p>)}
                <div>
                <label>Valor a ser transferido</label>
                <input
                className={styles["input-value"]}
                type="number"
                min="0.1"
                step={"any"}
                placeholder="Conta ou documento"
                {...register("value", {required: true})}
                />
                {errors?.value?.type ==="required" &&
                (<p className={styles["error-message"]}>É necessário informar um valor</p>)}
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
                 >Fazer transferência</button>
                 <ToastContainer />
                </div>
                
            </div>
            

        </div>
       
    )
//className={errors.account && "input-error"}

//{errors?.account?.type === 'required' && <p className="error-message">Campo obrigatório</p>}
    /*return(
        
        <form className = "form-transfer">
        <label>Digite o número da conta ou documento do destinatário: </label>
        <input type="number" id="account-num-or-doc-num"/>
        <label>Valor a ser transferido: </label>
        <input type="number"  id="currency-value" min="0.1" step={"any"}/>
        <input type="text"  id="optional-message"/>
        <button type="button"></button>
        </form>
    )*/
     // <div className ={styles["modal-success"]}>
        //     <h1>Transferência feita com sucesso!</h1>
        //     <p>Detalhes da transferência:</p>
        //     <p>`Destinatário: ${data.account}`</p>
        //     <p>`Quantia transferida: ${data.value}`</p>
            
        // </div>  
        // if(data.message !== null)
        // <p>`Mensagem: ${data.message}`</p>
}

export default Transfer