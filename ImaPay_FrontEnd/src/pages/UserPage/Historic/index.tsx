import { HistoricFilter } from "./HistoricFilter";
import HistoricoPagination from "./HistoricoPagination/intex";
import styles from "./style.module.css";
import { useState } from "react";

export interface User {
  id: number;
  date: string;
  type: string;
  valor: number;
}

interface UserTableProps {
  users: User[];
}

const PAGE_SIZE = 5;

const Historic: React.FC<UserTableProps> = ({ users }) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [showHistoric, setShowHistoric] = useState(false);
  const [transactions, setTransactions] = useState<User[]>([]);
  const [filterType, setFilterType] = useState("");

  const handleShowHistoric = () => {
    setShowHistoric(true);
  };
  const handleHideHistoric = () => {
    setShowHistoric(false);
  };
  const getTransfersForPage = (): User[] => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return users.slice(startIndex, endIndex);
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [currentType, setCurrentType] = useState("Todos");

  const filteredTransactions = users.filter(
    (transaction) => currentType === "Todos" || transaction.type === currentType
  );

  const visibleTransactions = filteredTransactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTypeChange = (type: string) => {
    setCurrentType(type);
    setCurrentPage(1);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/transactions")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTransactions(data.transactions);
  //       setFilteredTransactions(data.transactions);
  //     });
  // }, []);
  return (
    <div className={styles["historic-container"]}>
      <span className={styles["historic-subtitle"]} onClick={handleShowHistoric}>Ver Historico</span>

      <div className={styles["show-historic"]}>
        {showHistoric && (
          <section className={styles["historic-container-items"]}>
            <div>
              <div className={styles["historic-subtitle-conateiner"]}>
                <div>
                <h2>Histórico </h2>
                </div>
               <div className={styles["divfiter"]} >
               <HistoricFilter
                  currentType={currentType}
                  onTypeChange={handleTypeChange}
                />
               </div>
                
              </div>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTransactions.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.date}</td>
                      <td>{user.type}</td>
                      <td>R$ {user.valor.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
<div className={styles["footer-pagination"]} >
<span  className={styles["historic-subtitle"]} onClick={handleHideHistoric}>Ocultar historico</span>
              <HistoricoPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
</div>
           
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Historic;
