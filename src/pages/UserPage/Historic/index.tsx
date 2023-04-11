import React from "react";
import styles from "./style.module.css";

export interface User {
  id: number;
  date: string;
  type: string;
  valor: number;
}

interface UserTableProps {
  users: User[];
}
const Historic: React.FC<UserTableProps> = ({ users }) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return (
    <section className={styles["historic-container"]}>
      <h2 className={styles["historic-subtitle"]}>Histórico </h2>
      <table>
        <thead>
          <tr>
            <th>ID </th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Valor R$</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* <td>{today.toDateString()}</td> */}
              <td>{user.date}</td>
              <td>{user.type}</td>
              <td>R$ {user.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Historic;
