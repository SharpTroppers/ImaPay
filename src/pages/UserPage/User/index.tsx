import { useState } from "react";
import styles from "./style.module.css";
import Money from "../../../assets/img/money-bold.svg";
import { Balance } from "../balance";
import { HeaderUserPage } from "../headerUserPage";

export function UserPage() {
  return (
    <div>
      <HeaderUserPage />
      <Balance />
    </div>
  );
}
