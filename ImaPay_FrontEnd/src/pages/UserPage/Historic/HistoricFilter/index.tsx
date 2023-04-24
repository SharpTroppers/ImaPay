import styles from "./style.module.css";


interface TransactionFilterProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

export const HistoricFilter: React.FC<TransactionFilterProps> = ({
  currentType,
  onTypeChange,
}) => {
  const types = ["Todos", "Deposito", "Transferência", "Saque"];

  return (
    <div  className={styles["container-select"]}  >
      {types.map((type) => (
        <div key={type}>
        <input
          type="checkbox"
          id={type}
          name="type"
          value={type}
          checked={currentType === type}
          onChange={(e) => onTypeChange(e.target.value)}
          className={styles[""]}
        />
        <label htmlFor={type}>{type}</label>
      </div>
      ))}
          </div>
        );
      };

