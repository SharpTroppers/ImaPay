import React from "react";
import styles from "./style.module.css";
import { Balance } from "../balance";



export function Transfer()  {


    return(
        
        <form className = "form-transfer">
        <label>Digite o número da conta ou documento do destinatário: </label>
        <input type="number" id="account-num-or-doc-num"></input>
        <label>Valor a ser transferido: </label>
        <input type="number" id="currency-value" min="0.1" step={"any"}>R$ </input>
        <label>Mensagem (Opcional): </label>
        <input type="text" id="optional-message"></input>
        <button type="button" ref="#"></button>
        </form>
    )
}

