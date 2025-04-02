const Pagination = ({ totalPages, currentPage, goToPage }) => {
    const maxVisibleButtons = 5; // Show only 5 page numbers at a time
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
  
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
  
    return (
      <div className="flex space-x-2 mt-4">
        {/* First Page Button */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {"<<"}
        </button>
  
        {/* Previous Page Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {"<"}
        </button>
  
        {/* Page Numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
  
        {/* Next Page Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {">"}
        </button>
  
        {/* Last Page Button */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {">>"}
        </button>
      </div>
    );
  };
  export default Pagination;