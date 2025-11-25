import { memo, useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = memo(({ page, lastPage, onPageChange }: PaginationProps) => {
  const [activeIndex, setActiveIndex] = useState(page - 1);
  const maxVisiblePages = 5;

  useEffect(() => {
    setActiveIndex(page - 1);
  }, [page]);

  const handleClick = useCallback(
    (newPage: number) => {
      setActiveIndex(newPage - 1);
      onPageChange(newPage);
    },
    [onPageChange]
  );

  const handleNext = useCallback(() => {
    if (page < lastPage) {
      handleClick(page + 1);
    }
  }, [page, lastPage, handleClick]);

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      handleClick(page - 1);
    }
  }, [page, handleClick]);

  const getVisiblePages = useCallback(() => {
    const start = Math.max(
      0,
      Math.min(
        page - Math.ceil(maxVisiblePages / 2),
        lastPage - maxVisiblePages
      )
    );
    const end = Math.min(lastPage, start + maxVisiblePages);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }, [page, lastPage]);

  return (
    <div className="flex items-center gap-3">
      <span
        onClick={handlePrevious}
        className={`h-[50px] w-[50px] flex items-center justify-center rounded-full bg-amber-400 cursor-pointer ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleLeft />
      </span>
      {getVisiblePages().map((pageNum) => (
        <span
          key={pageNum}
          onClick={() => handleClick(pageNum + 1)}
          className={`h-[50px] w-[50px] flex items-center justify-center rounded-full cursor-pointer ${
            activeIndex === pageNum ? "bg-amber-400" : "bg-gray-200 text-black"
          } ${activeIndex !== pageNum && "hidden md:flex"}`}
        >
          {pageNum + 1}
        </span>
      ))}
      <span
        onClick={handleNext}
        className={`h-[50px] w-[50px] flex items-center justify-center rounded-full bg-amber-400 cursor-pointer ${
          page === lastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleRight />
      </span>
    </div>
  );
});

export default Pagination;
