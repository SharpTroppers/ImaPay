import styles from "./style.module.css";
import { Link } from "react-router-dom"


export function MainNavigation() {
  return(
    
    <div className={styles.navbar}>
    <ul className={styles.list}>

        <li className={styles.item}>
        <Link to="/">Home</Link>
        </li>

        <li className={styles.item}>
        <Link to="/LoginPage">Login</Link>
        </li>

        <li className={styles.item}>
        <Link to="/SignUpPage">Cadastre-se</Link>
        </li>
        
    </ul>
</div>

  )
}