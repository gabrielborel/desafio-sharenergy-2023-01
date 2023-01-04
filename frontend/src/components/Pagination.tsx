import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPages?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
};

export function Pagination({
  registersPerPages = 6,
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPages);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <div className="ml-auto w-fit flex flex-col-reverse sm:flex-row mt-8 justify-between items-center md:gap-6">
      <div className="mr-auto">
        <strong>
          {currentPage === 1 ? 0 : (currentPage - 1) * registersPerPages + 1}
        </strong>{" "}
        -{" "}
        <strong>
          {currentPage === 1
            ? currentPage * registersPerPages
            : (currentPage - 1) * registersPerPages + 6}
        </strong>{" "}
        de <strong>{totalCountOfRegisters}</strong>
      </div>

      <div className="flex gap-2">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <span className="text-gray-300 w-8 text-center">...</span>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <span className="text-gray-300 w-8 text-center">...</span>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  );
}
