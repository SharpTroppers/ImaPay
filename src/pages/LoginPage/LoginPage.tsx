import styles from "./LoginPage.module.css";
export function LoginPage() {
  return <div>
    <main>
      <div className={styles.page}>
        <div className={styles.loginPage}>
          <div className={styles.formPage}>
            <h2>Faça seu login</h2>
            <form action="">
              <label for="cpf">CPF</label>
              <input type="text" id="name" name="cpf" />

              <label for="password">Senha</label>
              <input type="password" id="password" name="senha" />
              <div className='forgot-password'>  <a href='./recovery/passwordRecovery.html'>Esqueceu a senha?</a></div>
              <button type="submit">Entrar</button>
              <div className={styles.signupLink}><span>Nao possui uma conta?</span>  <a href="signup/signupStepOne.html">cadastre-se</a></div>
            
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>;
}
