import React from "react";

interface SuccessToastProps {
  message: string;
}

export const SuccessToast = ({ message }: SuccessToastProps) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg shadow">
      <div className="flex-1">
        <p className="text-green-800 font-medium">{message}</p>
      </div>
      <button 
        onClick={() => {}}
        className="text-gray-500 hover:text-gray-700 "
      >
        ✕
      </button>
    </div>
  );
};
 