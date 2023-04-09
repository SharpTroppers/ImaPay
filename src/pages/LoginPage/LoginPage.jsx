import { useState } from "react";
import styles from "./LoginPage.module.css";
export function LoginPage() {

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);




  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({cpf, password})

    if(cpf === "admin" && password === "admin") {
      location.href = "/"
    } else {
      setError(true);
    }


    setCpf("");
    setPassword("");
  }

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.loginPage}>
          <div className={styles.formPage}>
            <h2>Faça seu login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="cpf">CPF</label>
              <input 
                type="string" 
                id="cpf"
                maxLength={11}
                value={cpf}
                placeholder="CPF"
                onChange={(e) => setCpf(e.target.value)}
                className={error ? 'error' : ""}
              />
              
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                id="password"
                value={password}
                placeholder="Insira sua senha"
                onChange={(e)=> setPassword(e.target.value)}
                />
                {error && <p>Usuário ou senha incorretos.</p>}

              <div className='forgot-password'>  <a href='./recovery/passwordRecovery'>Esqueceu a senha?</a></div>
              <button type="submit">Entrar</button>
              <div className={styles.signupLink}><span>Nao possui uma conta?</span>  <a href="signup/signupStepOne">cadastre-se</a></div>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
