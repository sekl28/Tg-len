'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Previous button
    if (currentPage > 1) {
      pageNumbers.push(
        <Link
          key="prev"
          href={createPageURL(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-300 hover:bg-gray-50 transition-colors"
        >
          ‹
        </Link>
      );
    }

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <Link
          key={1}
          href={createPageURL(1)}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-300 hover:bg-gray-50 transition-colors"
        >
          1
        </Link>
      );
      
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis1" className="w-10 h-10 flex items-center justify-center text-gray-300">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href={createPageURL(i)}
          className={`w-10 h-10 flex items-center justify-center border rounded transition-colors ${
            i === currentPage
              ? 'border-firebrick-200 bg-firebrick-200 text-white'
              : 'border-gray-300 text-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </Link>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2" className="w-10 h-10 flex items-center justify-center text-gray-300">
            ...
          </span>
        );
      }
      
      pageNumbers.push(
        <Link
          key={totalPages}
          href={createPageURL(totalPages)}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-300 hover:bg-gray-50 transition-colors"
        >
          {totalPages}
        </Link>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pageNumbers.push(
        <Link
          key="next"
          href={createPageURL(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-300 hover:bg-gray-50 transition-colors"
        >
          ›
        </Link>
      );
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
