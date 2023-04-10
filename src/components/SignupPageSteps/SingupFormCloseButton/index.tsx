import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const SignupFormCloseUp = () => {
  return (
      <Link to='/'>
      <div id={styles["close-container"]}>
          <div id={styles["left-right"]}/>
          <div id={styles["right-left"]}/>
          <label id={styles["close"]}>FECHAR</label>
      </div>
      </Link>
  )
}

export default SignupFormCloseUp