import styles from "./styles.module.css";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return <button className={styles.activePaginationItem}>{number}</button>;
  }

  return (
    <button
      className={styles.paginationItem}
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
}
