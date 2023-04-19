import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { MinhaConta } from "../MinhaConta";
// interface Props {
//   id: any;
// }
export const Modal = () => {
  // const hendaleOutsideClick = (e: any) => {
  //   if (e.target.id === id) onClose();
  //   console.log("ola");
  // };
  const navigate = useNavigate();
  const handleHome = () => {
    return navigate("/");
  };

  return (
    <div className={styles["navigation-user"]}>
      <ul>
        <li>
          <Link to={"/user/minhaconta"}>Minha conta</Link>
        </li>
        <li onClick={handleHome}>Sair</li>
      </ul>
    </div>
  );
};
