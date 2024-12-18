// src/hooks/usePagination.ts
import { useState } from 'react';

export const usePagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    paginate,
    indexOfLastItem: currentPage * itemsPerPage,
    indexOfFirstItem: currentPage * itemsPerPage - itemsPerPage,
  };
};
