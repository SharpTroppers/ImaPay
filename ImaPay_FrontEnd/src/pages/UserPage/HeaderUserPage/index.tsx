import styles from "./style.module.css";
import { useState, useEffect } from "react";

import Exit from "../../../assets/img/exit.svg";
import { Link } from "react-router-dom";
import { Modal } from "../MenuModal";
import User from "../../../assets/img/user-circle-thin (1).svg";

interface Props {
  name: string;
}
function HeaderUserPage({ name }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={styles["header-container"]}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <h1>Olá, {name} </h1>
      <figure className={styles["header-imagem"]}>
        <img
          src={User}
          alt=""
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && <Modal />}
      </figure>
    </header>
  );
}

export default HeaderUserPage;
