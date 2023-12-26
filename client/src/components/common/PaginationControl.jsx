import React from 'react';

const PaginationControl = ({ label, onClick, disabled, active, className }) => (
  <button
    className={`px-2 py-1 mx-1 border ${
      active ? "bg-purple-200 text-[#66279a]" : disabled ? "bg-gray-200 text-gray-500" : ""
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default PaginationControl;
