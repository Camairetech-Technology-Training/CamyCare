// src/components/PaginationControls/PaginationControls.tsx
import React from 'react';

type PaginationControlsProps = {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  paginate,
  totalPages,
}) => {
  return (
    <div className="flex justify-between items-center mt-4 mb-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-400"
      >
        Previous
      </button>
      <div className="text-center">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
