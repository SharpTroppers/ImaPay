import { useState } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { cpfMask } from "./CpfMask";

export function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (cpf === "admin" && password === "admin") {
      navigate("/user");
    } else {
      setError(true);
    }

    setCpf("");
    setPassword("");
  };

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.loginPage}>
          <div className={styles.formPage}>
            <h2>Faça seu login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor='cpf'>CPF</label>
              
              <input
                type='string'
                id='cpf'
                maxLength={14}
                value={cpf}
                placeholder='000.000.000-00'
                onChange={(e) => setCpf(cpfMask(e.target.value))}
                className={error ? "error" : ""}
              />

              <label htmlFor='password'>Senha</label>
              <input
                type='password'
                id='password'
                value={password}
                placeholder='Insira sua senha'
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p>Usuário ou senha incorretos.</p>}

              <div className='forgot-password'>
                <NavLink to='/password-recovery'>Esqueceu a senha?</NavLink>
              </div>
              <button type='submit'>Entrar</button>
              <div className={styles.signupLink}>
                <span>Nao possui uma conta?</span>
                <NavLink to='/signup'>Cadastre-se</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
