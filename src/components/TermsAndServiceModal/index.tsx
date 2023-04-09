import React from 'react'
import styles from './styles.module.css'
import { termsAndServicesModel } from '../../models/signupForm'

const TermsAndServiceModal = ({agreeToTermsAndService, toogleModal} : termsAndServicesModel) => {
  return (
    <section id={styles["modal-for-terms-of-service"]}>
    <main id={styles["modal-text-container"]}>
      <header id={styles["modal-header-container"]}>
        <h1>Termos de Serviço</h1>
      </header>
      <article id={styles["modal-content-container"]}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem debitis at est facere culpa praesentium
          quos
          necessitatibus distinctio cumque consectetur beatae quas, laborum delectus eligendi illum, magnam maxime
          quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolores ipsum, sapiente reprehenderit
          inventore modi eum.
        </p>
      </article>

      <footer id={styles["modal-footer-container"]}>
        <button className={styles["modal-buttons-style"]} id={styles["agree-button"]} onClick={agreeToTermsAndService}>
          CONCORDO
        </button>
        <button className={styles["modal-buttons-style"]} id={styles["disagree-button"]} onClick={() => toogleModal(false)}>
          CANCELAR
        </button>
      </footer>
    </main>
  </section>
  )
}

export default TermsAndServiceModal