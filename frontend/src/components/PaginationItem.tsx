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
    return (
      <button className="pointer w-8 text-base bg-gray-200 p-1 rounded-md text-green-500">
        {number}
      </button>
    );
  }

  return (
    <button
      className="pointer hover:bg-gray-300 w-8 text-base bg-gray-200 transition-colors p-1 rounded-md text-gray-700"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
}
