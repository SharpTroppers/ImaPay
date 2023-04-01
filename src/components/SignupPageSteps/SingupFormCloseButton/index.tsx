import React from 'react'
import styles from './styles.module.css'

const SignupFormCloseUp = () => {
  return (
    <div id={styles["close-container"]} onClick={() => proceedToHomePage()}>
        <div id={styles["left-right"]}/>
        <div id={styles["right-left"]}/>
        <label id={styles["close"]} className={styles["close-label-style"]}>FECHAR</label>
    </div>
  )
}

export default SignupFormCloseUp