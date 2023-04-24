
import styles from "./style.module.css";


      interface TransactionPaginationProps {
      currentPage: number;
      totalPages: number;
      onPageChange: (pageNumber: number) => void;
      }
      
      
      const HistoricoPagination: React.FC<TransactionPaginationProps> = ({
      currentPage,
      totalPages,
      onPageChange,
      }) => {
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
      
      return (
        <div className={styles["pagination"]}>
      <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      >
      Anterior
      </button>
      {pageNumbers.map((pageNumber) => (
      <button
      key={pageNumber}
      disabled={currentPage === pageNumber}
      onClick={() => onPageChange(pageNumber)}
      >
      {pageNumber}
      </button>
      ))}
      <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      >
      Próxima
      </button>
      </div>
      );
      };
      export default HistoricoPagination;