import { useState } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const loginDto = {
        Cpf: cpf,
        Password: password,
      };
      const response = await axios.post(
        "https://localhost:7274/users/login",
        JSON.stringify(loginDto),
        { headers }
      );
      const token = response.data.token;

      localStorage.setItem("Token", token);

      setCpf("");
      setPassword("");
      navigate("/user");
    } catch (err: any) {
      console.log(err.response.data.message);
      setError(true);
    }
  }

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
                maxLength={11}
                value={cpf}
                placeholder='CPF'
                onChange={(e) => setCpf(e.target.value)}
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
