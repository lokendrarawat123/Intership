import React from "react";

export const Pagignation = ({ page, totalPages, onPagesChange }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-2 mr-6 p-2">
      <button
        disabled={page === 1}
        onClick={() => onPagesChange(page - 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      <span className="font-semibold">
        {page}/{totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPagesChange(page + 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
