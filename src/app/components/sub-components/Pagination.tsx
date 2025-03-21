import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

type PageSwitchProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

export function PageSwitch({ currentPage, setCurrentPage, totalPages }: PageSwitchProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  function generatePageNumbers(currentPage: number, totalPages: number) {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  }
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
        </PaginationItem>

        {pageNumbers.map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "..." ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 rounded transition ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white"
                }`}
              >
                {page}
              </button>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}


