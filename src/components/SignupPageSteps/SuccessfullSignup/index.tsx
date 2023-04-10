import React, {ReactComponentElement} from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import SuccessIcon from '../../../assets/img/tropper_logo.png'

const SuccessfullSignup = () => {
  return (
    <main className={styles["main-container-style"]} id={styles["main-container-success-sign-up-style"]}>
        <header className={styles["forms-header-container"]} id={styles["success-welcome-message-style"]}>
            <h1 id={styles["header-title"]}>Seja Bem-Vindo à Familia, Trooper</h1>
        </header>
        <img id={styles['success-icon']} src={SuccessIcon}/>
        <Link id={styles["sign-up-go-to-login-page-style"]}  to='/'>
            <button 
                
                className={styles["no-button-style"]}
                >
                    Login
            </button>
        </Link>
    </main>
)
}

export default SuccessfullSignup