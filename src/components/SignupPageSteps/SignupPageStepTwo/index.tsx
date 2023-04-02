import React from 'react'
import { signupFormStepHandler } from '../../../models/signupForm';
import SignupFormCloseUp from '../SingupFormCloseButton';
import styles from "./styles.module.css";


const SignupPageStepOne = ({stepForward, stepBackward} : signupFormStepHandler) => {
  return (
    <>
    <main className={styles["main-container-style"]}>
      <header className={styles["forms-header-container"]}>
        <h1 id={styles["header-title"]}>Registro Pessoa Física</h1>
      </header>
    <SignupFormCloseUp/>
    <form id={styles["form-container-style"]} 
    onSubmit={stepForward}
    >
            <section className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="address">Endereço</label>
                <input required className={styles["inputs-style"]} id="address" placeholder="Endereço"/>
            </section>
            <section className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="number">Número</label>
                <input required className={styles["inputs-style"]} id="number" placeholder="Número"/>
            </section>
            <section className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="neighborhood">Bairro</label>
                <input required className={styles["inputs-style"]} id="neighborhood" placeholder="Bairro"/>
            </section>
            <section className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="city-or-province-name">Cidade</label>
                <input required className="inputs-style" id="city-or-province-name" placeholder="Cidade"/>
            </section>
            <section className={styles["forms-sections-containers"]}>
                <label className={styles["labels-styling"]} htmlFor="country">
                    País
                </label>
                <input required className=" inputs-style" id="country" placeholder="País"/>
            </section>
            <nav id="nav-button-container">
                <button className={styles["submit-button-style-back submit-button-style no-button-style"]}
                    onClick={stepBackward}>
                    VOLTAR
                </button>
                <input className="submit-button-style no-button-style" type="submit" value="PRÓXIMO" />
            </nav>
        </form>
  </main>
  </>
)
}

export default SignupPageStepOne