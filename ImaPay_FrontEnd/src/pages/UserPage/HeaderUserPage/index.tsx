import styles from "./style.module.css";
import { useState, useEffect } from "react";

import Exit from "../../../assets/img/exit.svg";
import { Link } from "react-router-dom";
import { Modal } from "../MenuModal";
import User from "../../../assets/img/user-circle-thin (1).svg";

interface Props {
  userName: string;
}
function HeaderUserPage({ userName }: Props) {
  const [open, setOpen] = useState(false);
  const Modals = "Modals";

  const handleModal = (e: any) => {
    if (e.target.id === Modals) setOpen(!open);
    if (e.target.id !== Modals) setOpen(false);
  };

  return (
    <header className={styles["header-container"]} onClick={handleModal}>
      <h1>Olá, {userName} </h1>
      <figure className={styles["header-imagem"]}>
        <img src={User} alt="" onClick={handleModal} id={Modals} />
        {open && <Modal />}
      </figure>
    </header>
  );
}

export default HeaderUserPage;
